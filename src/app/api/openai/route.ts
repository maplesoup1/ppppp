import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const RESUME_TEXT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "resume-context.txt"
);

type ChatRole = "user" | "assistant";

interface IncomingMessage {
  role: ChatRole;
  content: string;
}

let resumeCache: string | null = null;

async function loadResumeContext(): Promise<string> {
  if (resumeCache) {
    return resumeCache;
  }

  resumeCache = await fs.readFile(RESUME_TEXT_PATH, "utf-8");
  return resumeCache.trim();
}

function normaliseMessages(messages: unknown): IncomingMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .map((message): IncomingMessage => {
      const role: ChatRole =
        typeof message?.role === "string" && message.role === "assistant"
          ? "assistant"
          : "user";
      const content =
        typeof message?.content === "string" ? message.content.trim() : "";

      return {
        role,
        content,
      };
    })
    .filter((message) => message.content.length > 0)
    .slice(-8);
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: "Missing OPENAI_API_KEY on the server",
        hint: "Define OPENAI_API_KEY in .env.local (development) or the hosting platform secrets.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const history = normaliseMessages(body?.messages);

    if (history.length === 0) {
      return NextResponse.json(
        {
          error: "No user messages provided.",
          hint: "Send an array of { role, content } objects under the `messages` key.",
        },
        { status: 400 }
      );
    }

    let resumeContext: string;
    try {
      resumeContext = await loadResumeContext();
    } catch (readError) {
      const message =
        readError instanceof Error ? readError.message : String(readError);
      return NextResponse.json(
        {
          error: "Failed to load resume context.",
          details: message,
          hint: "Ensure public/static/resume-context.txt exists and is readable.",
        },
        { status: 500 }
      );
    }

    const systemPrompt = [
      "You are Xiaofeng Tang (Timmy), a full-stack developer. Respond in first-person as if chatting with a recruiter—warm, confident, concise.",
      "",
      "RULES:",
      "1. Answer ONLY from the resume below. If asked about something not listed, acknowledge it and redirect to related experience.",
      "2. When discussing projects or experience, cite the tech stack and one measurable outcome from the resume.",
      "3. Use 1-2 short paragraphs or a bullet list. Keep it concise.",
      "",
      "RESUME:",
      resumeContext,
    ].join("\n");

    const messages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...history.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ];

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      let errorBodyText = await response.text();
      let errorPayload: unknown;

      try {
        errorPayload = JSON.parse(errorBodyText);
        errorBodyText = JSON.stringify(errorPayload, null, 2);
      } catch {
        // keep original text
      }

      // Handle rate limit errors specifically
      if (status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: "OpenAI request failed.",
          status,
          details: errorBodyText,
          hint: "Verify the API key, model availability, and account balance.",
        },
        { status }
      );
    }

    const payload = await response.json();
    const text = payload?.choices?.[0]?.message?.content ?? null;

    if (!text) {
      return NextResponse.json(
        { error: "OpenAI response missing text content", payload },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: text });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json(
      {
        error: "Unexpected server error.",
        details: message,
      },
      { status: 500 }
    );
  }
}

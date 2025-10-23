import { useState, useCallback } from "react";
import { AI_ASSISTANT } from "./content";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const INITIAL_GREETING = AI_ASSISTANT.greeting;
const MAX_MESSAGE_LENGTH = 800;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: INITIAL_GREETING }]);
    }
  }, [messages.length]);

  const sendMessage = useCallback(
    async (input: string) => {
      if (!input.trim() || isLoading) {
        return;
      }

      // Check rate limiting
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
        setError(`Please wait ${waitTime} second(s) before sending another message.`);
        return;
      }

      const sanitized = input.trim().slice(0, MAX_MESSAGE_LENGTH);
      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: "user" as const, content: sanitized },
      ];
      setMessages(nextMessages);
      setIsLoading(true);
      setError(null);
      setLastRequestTime(now);

      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          const parts = [
            payload?.error ?? "Request failed.",
            payload?.details,
            payload?.hint,
          ]
            .filter(Boolean)
            .join(" ");
          throw new Error(parts || "Request failed. Please try again.");
        }

        const payload = await response.json();
        const assistantReply =
          typeof payload?.result === "string" ? payload.result.trim() : "";

        if (!assistantReply) {
          throw new Error(
            "The assistant did not return a usable answer. Please try again."
          );
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantReply },
        ]);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again shortly.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, lastRequestTime]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    initializeChat,
    clearError,
    maxMessageLength: MAX_MESSAGE_LENGTH,
  };
}

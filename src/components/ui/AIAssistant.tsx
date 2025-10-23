"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "./button";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useAiChat } from "@/lib/ai-chat";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    initializeChat,
    clearError,
    maxMessageLength,
  } = useAiChat();

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    initializeChat();
    requestAnimationFrame(() => {
      textAreaRef.current?.focus();
    });
  }, [isOpen, initializeChat]);

  useEffect(() => {
    if (!isOpen) return;
    const container = listRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    clearError();
  };

  const handleClose = () => {
    setIsOpen(false);
    clearError();
  };

  const handleSendMessage = async () => {
    if (!canSubmit) return;
    await sendMessage(input);
    setInput("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full px-6 py-4 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-300 hover:scale-105"
        >
          <Sparkles size={20} className="animate-pulse" />
          <span className="font-semibold">AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          <div className="relative z-10 flex w-full max-w-2xl max-h-[90vh] flex-col rounded-3xl border border-gray-200/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center justify-between border-b border-gray-700/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    AI Resume Assistant
                  </h2>
                  <p className="text-sm text-gray-400">
                    Ask me anything about Xiaofeng&apos;s experience & skills
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="rounded-full p-2 text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors"
                onClick={handleClose}
                type="button"
              >
                <X size={20} />
              </Button>
            </div>

            <div
              ref={listRef}
              className="mb-4 h-[500px] overflow-y-auto rounded-2xl bg-slate-950/50 p-5 shadow-inner backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {messages.length === 1 && messages[0].role === "assistant" && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-400 mb-2">Try asking:</p>
                  <button
                    onClick={() => setInput("What's your experience with full-stack development?")}
                    className="text-left px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 text-sm border border-gray-700/30 transition-all hover:border-blue-500/50"
                  >
                    💼 What&apos;s your experience with full-stack development?
                  </button>
                  <button
                    onClick={() => setInput("Tell me about your work at Cyberoo.ai")}
                    className="text-left px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 text-sm border border-gray-700/30 transition-all hover:border-blue-500/50"
                  >
                    🚀 Tell me about your work at Cyberoo.ai
                  </button>
                  <button
                    onClick={() => setInput("What AI technologies have you worked with?")}
                    className="text-left px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 text-sm border border-gray-700/30 transition-all hover:border-blue-500/50"
                  >
                    🤖 What AI technologies have you worked with?
                  </button>
                  <button
                    onClick={() => setInput("What's your tech stack expertise?")}
                    className="text-left px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 text-sm border border-gray-700/30 transition-all hover:border-blue-500/50"
                  >
                    ⚡ What&apos;s your tech stack expertise?
                  </button>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`mb-4 flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-lg ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                        : "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-100 border border-gray-600/30"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 px-5 py-3 text-sm text-gray-100 shadow-lg border border-gray-600/30 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <textarea
                  ref={textAreaRef}
                  className="min-h-[90px] w-full resize-none rounded-2xl border border-gray-600/50 bg-slate-800/80 p-4 pr-16 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                  placeholder="Ask about skills, projects, experience... (Press Enter to send, Shift+Enter for new line)"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={maxMessageLength}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {input.length}/{maxMessageLength}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Powered by OpenAI
                </span>
                <Button
                  type="submit"
                  className="rounded-xl px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!canSubmit}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
              {error && (
                <div className="rounded-xl border border-red-500/50 bg-red-950/50 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
                  ⚠️ {error}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;

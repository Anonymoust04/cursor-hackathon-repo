"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "How can I help you navigate ImpactHub?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Hide chatbot on login page
  if (pathname === "/login") {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare conversation history
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
        }),
      });

      const data = await response.json();
      const assistantMessage = data.response || "I apologize, but I couldn't process your request.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);

      // Extract route suggestions from the response
      const routePatterns = [
        { pattern: /\/login/g, route: "/login" },
        { pattern: /\/signup/g, route: "/signup" },
        { pattern: /\/dashboard/g, route: "/dashboard" },
        { pattern: /\/company-profile/g, route: "/company-profile" },
        { pattern: /\/volunteer-management/g, route: "/volunteer-management" },
        { pattern: /\/applicant-management/g, route: "/applicant-management" },
        { pattern: /\/networking-feed/g, route: "/networking-feed" },
        { pattern: /\/opportunity-marketplace/g, route: "/opportunity-marketplace" },
      ];

      // Check if response suggests navigation
      for (const { pattern, route } of routePatterns) {
        if (pattern.test(assistantMessage.toLowerCase())) {
          // Optionally auto-navigate or show a button
          break;
        }
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { iconId: "zZWdn0zBfMOR", route: "/dashboard", ariaLabel: "Dashboard" },
    { iconId: "xjvHMhcuwaFL", route: "/opportunity-marketplace", ariaLabel: "Opportunities" },
    { iconId: "WiJ2nr7vur3S", route: "/networking-feed", ariaLabel: "Networking" },
  ];

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <img
            alt="Close Chatbot Icon"
            className="h-6 w-6"
            src="https://img.icons8.com/?size=48&id=82771&format=png&color=000000"
          />
        ) : (
          <img
            alt="AI Chatbot Icon"
            className="h-6 w-6"
            src="https://img.icons8.com/?size=48&id=WmDgmNrDhz7f&format=png&color=000000"
          />
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="text-base font-medium text-gray-900">Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close chatbot"
            >
              <span className="material-icons-outlined text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-scrollbar flex-1 overflow-y-auto bg-white p-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === "user"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 rounded-2xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="border-t border-gray-100 px-4 py-3">
              <div className="flex gap-2 justify-center">
                {quickActions.map((action) => (
                  <button
                    key={action.route}
                    onClick={() => {
                      router.push(action.route);
                      setIsOpen(false);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    aria-label={action.ariaLabel}
                    title={action.ariaLabel}
                  >
                    <img
                      alt={action.ariaLabel}
                      className="h-5 w-5"
                      src={`https://img.icons8.com/?size=40&id=${action.iconId}&format=png&color=6B7280`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                className="flex-1 rounded-lg border-0 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-gray-100 focus:outline-none disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white transition-colors hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <img
                  className="h-5 w-5"
                  src={`https://img.icons8.com/?size=40&id=85940&format=png&color=6B7280`}
                />
            
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


"use client";

import React, { useState, useRef, useEffect } from "react";

const suggestions = [
  "Create a button component",
  "Create a pricing card component",
  "Generate a responsive navbar",
  "Build a data table",
];

export default function Chatbot({
  contextData = [],
  onMessagesChange,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const addMessages = (newMessages) => {
    setMessages((current) => {
      const next = [...current, ...newMessages];

      if (onMessagesChange) {
        onMessagesChange(next);
      }

      return next;
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const userInput = input.trim();

    if (!userInput || loading) return;

    const userMessage = {
      sender: "user",
      text: userInput,
    };

    addMessages([userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          contextData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();

      addMessages([
        {
          sender: "bot",
          text: data.output,
        },
      ]);
    } catch (error) {
      console.error(error);

      addMessages([
        {
          sender: "bot",
          text: "Something went wrong while generating the component.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-gray-300 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            AI Component Generator
          </h2>

          <p className="text-sm text-slate-500">
            Generate Storybook-ready React components using AI.
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="min-h-0 flex-1 overflow-y-auto px-1 py-2">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">
              Ask me to create a component. Example:
              <br />
              "Create a button component"
            </p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.sender === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      (msg.sender === "user"
                        ? "bg-cyan-100 text-slate-900"
                        : "bg-white text-slate-900 border border-slate-200") +
                      " max-w-[95%] rounded-2xl px-4 py-3 text-sm shadow-sm"
                    }
                  >
                    <pre className="whitespace-pre-wrap break-words font-mono text-xs">
                      {msg.text}
                    </pre>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                    Generating component...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-100"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Create a button component..."
              className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
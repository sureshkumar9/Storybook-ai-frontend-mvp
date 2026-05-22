"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Fuse from "fuse.js";

const suggestions = [
  "Create a pricing card component",
  "Generate a responsive navbar",
  "Build a data table",
];

export default function Chatbot({ contextData = [], onMessagesChange }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const fuse = useMemo(
    () =>
      new Fuse(contextData, {
        includeScore: true,
        threshold: 0.4,
      }),
    [contextData]
  );

  const findBestMatch = (userInput) => {
    if (!contextData || contextData.length === 0) {
      return "Sorry, I don't understand.";
    }
    const results = fuse.search(userInput);
    if (results.length > 0) {
      return results[0].item;
    }
    return "Sorry, I don't understand.";
  };

  const addMessages = (newMessages) => {
    setMessages((current) => {
      const next = [...current, ...newMessages];
      if (onMessagesChange) {
        onMessagesChange(next);
      }
      return next;
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };
    const botMessage = {
      sender: "bot",
      text: findBestMatch(input),
    };

    addMessages([userMessage, botMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-gray-300 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Chat Panel</h2>
          <p className="text-sm text-slate-500">Talk to the assistant and generate preview code.</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="overflow-y-auto px-1 py-2 min-h-0 flex-1">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">No messages yet. Start the conversation to see results.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.sender === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <span
                    className={
                      (msg.sender === "user" ? "bg-cyan-100 text-slate-900" : "bg-lime-100 text-slate-900") +
                      " max-w-[90%] rounded-2xl px-4 py-3 text-sm"
                    }
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-100"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="submit"
              className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

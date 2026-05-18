"use client";


import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";

export default function Chatbot({ contextData = [] }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Only use contextData for Fuse.js
  const fuse = useMemo(() => new Fuse(contextData, {
    includeScore: true,
    threshold: 0.4,
  }), [contextData]);

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

    setMessages((msgs) => [...msgs, userMessage, botMessage]);

    setInput("");
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-md w-full">
      <div className="min-h-[120px] mb-3 flex flex-col gap-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <span
              className={
                (msg.sender === "user"
                  ? "bg-cyan-100"
                  : "bg-lime-100") +
                " rounded px-2 py-1 inline-block my-0.5"
              }
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
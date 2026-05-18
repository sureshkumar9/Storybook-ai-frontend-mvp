"use client";

import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const mockData = [
    "hello",
    "how are you",
    "what is your name",
    "bye",
    "good morning",
    "good night",
    "help me",
  ];

  const fuse = new Fuse(mockData, {
    includeScore: true,
    threshold: 0.4,
  });

  const findBestMatch = (userInput) => {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="border border-gray-300 rounded-lg p-5 max-w-md w-full bg-white shadow-md">
      <div className="text-xl font-bold mb-4 text-center text-gray-800">
        AI Assistant
      </div>

      <div className="min-h-[200px] max-h-[400px] overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            Start a conversation...
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex my-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[70%] break-words ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
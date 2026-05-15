"use client";

import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";

export default function Chatbot() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      router.push("/login");
      return;
    }

    setLoggedInUser(user);
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="min-h-screen flex bg-[#eff4ff] text-slate-900 w-full">
      <aside className="hidden md:flex w-72 flex-col bg-slate-950 text-white">
        <div className="p-6 border-b border-slate-800">
          <div className="mb-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            Storybook AI
          </div>
          <button className="w-full rounded-3xl bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-700">
            + New Chat
          </button>
        </div>

        <div className="flex-1 p-6 space-y-3 text-sm text-slate-300">
          <div className="text-slate-400 uppercase tracking-[0.1em] text-[11px]">Recent chats</div>
          <div className="rounded-3xl bg-slate-900 px-4 py-3 text-white shadow-sm">
            Storybook AI Chat
          </div>
          <div className="rounded-3xl px-4 py-3 transition hover:bg-slate-800 cursor-pointer">
            Mock Data Discussion
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 text-sm text-slate-500">
          Storybook AI MVP
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">AI Assistant</h1>
            <p className="text-sm text-slate-500">Ask anything about your design system.</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {loggedInUser?.email?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <span>{loggedInUser?.email || "User"}</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full z-10 mt-3 w-48 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                <button
                  onClick={() => router.push("/users")}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  View Users
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto py-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6">
            {messages.length === 0 && (
              <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
                <h2 className="text-4xl font-semibold text-slate-900">How can I help you today?</h2>
                <p className="mt-3 text-lg text-slate-500">Start typing your message below.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-[30px] px-6 py-4 text-[15px] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-[8px]"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-[8px] shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white px-6 py-5">
          <form onSubmit={handleSend} className="mx-auto flex max-w-5xl gap-3 px-2 sm:px-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message AI Assistant..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

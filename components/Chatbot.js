"use client"

import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage, { sender: 'bot', text: 'hello' }]);
    setInput('');
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, maxWidth: 400 }}>
      <div style={{ minHeight: 120, marginBottom: 12 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ background: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9', borderRadius: 4, padding: '4px 8px', display: 'inline-block', margin: '2px 0' }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
}

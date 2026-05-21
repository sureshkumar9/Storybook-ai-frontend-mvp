"use client";

import React, { useState } from "react";

export default function ContextInput({ onContextChange }) {
  const [input, setInput] = useState("");
  const [contextList, setContextList] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const updated = [...contextList, input.trim()];
    setContextList(updated);
    setInput("");
    if (onContextChange) onContextChange(updated);
  };

  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl p-4 max-w-md w-full mx-auto mb-6">
      <h3 className="text-lg font-semibold mb-2 text-blue-700">Add Context Items</h3>
      <form onSubmit={handleAdd} className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter context phrase..."
          className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
          Add
        </button>
      </form>
      <div className="text-sm text-gray-700">
        <span className="font-medium">Current Context:</span>
        <ul className="list-disc pl-5 mt-1">
          {contextList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <pre className="bg-gray-100 rounded p-2 mt-2 text-xs text-gray-600 overflow-x-auto">{JSON.stringify(contextList, null, 2)}</pre>
    </div>
  );
}

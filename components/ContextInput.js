"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";

const ContextInput = forwardRef(function ContextInput({ onContextChange }, ref) {
  const [input, setInput] = useState("");
  const [contextList, setContextList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleAdd = async (e) => {
    // allow calling with no event (programmatic) or via Enter key
    if (e && e.preventDefault) e.preventDefault();

    if (!input.trim()) return;

    const updated = [...contextList, input.trim()];

    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contexts: updated }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save context");
      }

      setContextList(result.data);

      if (onContextChange) {
        onContextChange(result.data);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };


  // Expose saveAll via ref so parent can trigger saving from modal
  useImperativeHandle(ref, () => ({
    saveAll: async () => {
      const updated = input.trim() ? [...contextList, input.trim()] : [...contextList];
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:8000/context", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contexts: updated }),
        });
        const result = await res.json();
        if (!result.success) {
          throw new Error(result.error || "Failed to save context");
        }
        setContextList(result.data);
        setInput("");
        if (onContextChange) onContextChange(result.data);
        return result.data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
  }));

  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl p-4 max-w-md w-full mx-auto mb-6">
      <h3 className="text-lg font-semibold mb-2 text-blue-700">Add Context Items</h3>
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a phrase and press Enter to add..."
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div className="mt-3 text-sm text-slate-700">
        <div className="font-medium mb-1">Current Context</div>
        <ul className="list-disc pl-5">
          {contextList.map((item, idx) => (
            <li key={idx} className="py-1">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default ContextInput;

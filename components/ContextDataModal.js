
"use client";

import { useEffect, useState } from "react";

export default function ContextDataModal({ open = false, onClose = () => {}, onSave, children } = {}) {
  const [text, setText] = useState("");

  useEffect(() => {
    // Reset textarea when modal opens
    if (open) {
      setText("");
    }
  }, [open]);

  const handleClear = () => setText("");
  const handleSave = () => {
    if (typeof onSave === "function") onSave(text);
    if (typeof onClose === "function") onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-white shadow-lg ring-1 ring-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="context-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 id="context-modal-title" className="text-sm font-semibold text-slate-900">
            Edit Context
          </h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 rounded-full p-1"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-4">
          {/* If children passed, render them (e.g., ContextInput). Otherwise show a textarea fallback */}
          {children ? (
            children
          ) : (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste context here..."
              className="w-full min-h-[160px] rounded-md border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
            />
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-4 py-3">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


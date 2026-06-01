"use client";

import JsonEditor from "./JsonEditor";

const sampleJson = `{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "Editor" }
  ],
  "products": [
    { "id": 1, "title": "Product A", "price": 29.99 },
    { "id": 2, "title": "Product B", "price": 49.99 }
  ]
}`;

export default function ContextDataModal({
  open,
  onClose,
  jsonValue,
  onJsonChange,
  onInsertSample,
  onClear,
  onSave,
  error,
  success,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-[28px] bg-white shadow-2xl shadow-slate-950/20 ring-1 ring-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="context-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 id="context-modal-title" className="text-lg font-semibold text-slate-900">
              Context Data for Component Generation
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              JSON used to populate generated components.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close context modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 px-6 py-6">
          <JsonEditor
            value={jsonValue}
            onChange={onJsonChange}
            placeholder="Paste or type JSON context here..."
          />

          <button
            type="button"
            onClick={onInsertSample}
            className="inline-flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Insert sample data
          </button>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear Context
          </button>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex justify-center rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Save Context
          </button>
        </div>
      </div>
    </div>
  );
}

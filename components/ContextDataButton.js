"use client";

export default function ContextDataButton({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-slate-900/20 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
      aria-label="Open context data modal"
    >
      <span className="h-3.5 w-3.5 rounded-full bg-emerald-400" />
      Context Data
    </button>
  );
}

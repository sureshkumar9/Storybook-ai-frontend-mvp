"use client";

export default function JsonEditor({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck="false"
      className="min-h-[280px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-950/90 px-4 py-4 text-sm leading-6 text-slate-100 shadow-inner outline-none ring-0 transition focus:border-slate-300 focus:ring-2 focus:ring-slate-400/40"
      style={{
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        whiteSpace: "pre",
        overflow: "auto",
      }}
      rows={16}
    />
  );
}

"use client";

import { useState } from "react";

export default function CodePanel({ code = "// Generated code will appear here." }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const exportFile = () => {
    const blob = new Blob([code], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snippet.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm w-full">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H4.75A2.25 2.25 0 002.5 3.75v12.5A2.25 2.25 0 004.75 18.5h10.5a2.25 2.25 0 002.25-2.25V6.5m-15-3h15m-15 4h15" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Code</h3>
            <p className="text-xs text-slate-500">Generated component code</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v0h4a2 2 0 012 2v1H2V5a2 2 0 012-2h4V3z" />
              <path fillRule="evenodd" d="M2 5h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h10a1 1 0 011 1v1H4V6z" />
            </svg>
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            onClick={exportFile}
            className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H4.75A2.25 2.25 0 002.5 3.75v12.5A2.25 2.25 0 004.75 18.5h10.5a2.25 2.25 0 002.25-2.25V6.5m-7-3v6.75m-2.25-2.25l2.25 2.25 2.25-2.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <pre className="h-full w-full overflow-auto bg-slate-950 p-3 text-xs text-slate-100 leading-5 font-mono">{code}</pre>
      </div>
    </div>
  );
}

 import { useState } from "react";

export default function CodePanel({ code = "// Generated code will appear here." }) {
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus(""), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "generated-component.jsx";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Code
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Generated component code</h2>
          <p className="mt-1 text-sm text-slate-500">Inspect generated component code and story snippets.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copyStatus || "Copy"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto rounded-lg border border-slate-200 bg-slate-950 text-slate-100">
        <pre className="whitespace-pre overflow-x-auto p-4 text-xs sm:text-sm leading-6">{code}</pre>
      </div>
    </div>
  );
}

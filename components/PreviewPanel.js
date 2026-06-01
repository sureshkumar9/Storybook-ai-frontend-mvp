
"use client";

export default function PreviewPanel({ previewText = "Live preview will appear here." }) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm w-full">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100">
            <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.5 7.5l-4.5 4.5-2.5-2.5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Live Preview</h3>
            <p className="text-xs text-slate-500">Real-time component preview</p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto bg-slate-50 p-5">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Live
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Generated UI</h4>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{previewText}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-white p-4 shadow-xs">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Preview Info</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This panel displays a live preview of generated components. The preview updates automatically when the AI generates new code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

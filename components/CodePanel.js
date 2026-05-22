 
export default function CodePanel({ code = "// Generated code will appear here." }) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Code Display</h2>
          <p className="text-sm text-slate-500">Inspect generated component code and story snippets.</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto rounded-2xl border border-slate-200 bg-slate-950 text-slate-100">
        <pre className="whitespace-pre overflow-x-auto p-4 text-xs sm:text-sm leading-6">{code}</pre>
      </div>
    </div>
  );
}



export default function PreviewPanel({ previewText = "Live preview will appear here." }) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Live Preview</h2>
        <p className="text-sm text-slate-500">View generated UI output in a responsive preview panel.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-auto rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-4">
        <div className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-3">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Preview Mode
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Generated UI</h3>
            <p className="mt-2 text-sm text-slate-600">{previewText}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-5">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h4 className="text-base font-semibold text-slate-900">Preview Card</h4>
              <p className="mt-2 text-sm text-slate-600">This panel updates automatically when the chat assistant generates a component or story preview.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function PreviewPanel({
  storyUrl,
  previewText = "Generate a component to see preview",
}) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Live Preview
        </h2>

        <p className="text-sm text-slate-500">
          Storybook component preview
        </p>
      </div>

      <div className="flex h-full min-h-0 overflow-hidden rounded-xl border">
        {storyUrl ? (
          <iframe
            src={storyUrl}
            title="storybook-preview"
            className="h-full w-full border-0"
          />
        ) : (
          <div className="flex items-center justify-center w-full text-slate-500">
            {previewText}
          </div>
        )}
      </div>
    </div>
  );
}
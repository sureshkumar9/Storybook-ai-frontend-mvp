"use client";

import { useEffect, useRef } from "react";

export default function PreviewPanel({ previewText = "Live preview will appear here.", previewCode = "" }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    const baseStyles = `
      body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; background: transparent; }
      .preview-root { display: block; }
    `;

    // Clean markdown fences if present
    const cleanedCode = previewCode.replace(/^```(?:jsx|tsx|javascript|js)?\n?/i, "").replace(/\n?```$/, "");

    // If previewCode is empty, show previewText
    if (!cleanedCode.trim()) {
      doc.open();
      doc.write(`<!doctype html>
        <html>
          <head><meta charset="utf-8"><style>${baseStyles}</style></head>
          <body><div class="preview-root">${previewText}</div></body>
        </html>`);
      doc.close();
      return;
    }

    // Otherwise, render as JSX using Babel + UMD React
    const reactScript = "https://unpkg.com/react@18/umd/react.development.js";
    const reactDomScript = "https://unpkg.com/react-dom@18/umd/react-dom.development.js";
    const babelScript = "https://unpkg.com/@babel/standalone/babel.min.js";

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>${baseStyles}</style>
        </head>
        <body>
          <div id="root"></div>
          <script src="${reactScript}"></script>
          <script src="${reactDomScript}"></script>
          <script src="${babelScript}"></script>
          <script type="text/babel">
            try {
              ${cleanedCode}
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(Preview));
            } catch (err) {
              document.body.innerHTML = '<pre style="color: red;">' + err.toString() + '</pre>';
            }
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();
  }, [previewCode, previewText]);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Live Preview</h2>
        <p className="text-sm text-slate-500">View generated UI output in a responsive preview panel.</p>
      </div>

      <div className="flex h-full min-h-0 overflow-hidden rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-4">
        <iframe
          ref={iframeRef}
          title="preview-iframe"
          className="w-full h-full rounded-md border"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
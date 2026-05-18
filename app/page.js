"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [componentName, setComponentName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) {
      setError("Describe the component you want to generate.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setGeneratedCode("");
      setComponentName("");
      setDescription("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Generation failed");
      }

      setGeneratedCode(data.code);
      setComponentName(data.componentName || "");
      setDescription(data.description || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
              Storybook AI
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Generate a React component for your Storybook library.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Describe the component, states, styling, and interaction details.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Component prompt
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Example: A pricing card with three tiers, feature bullets, highlighted pro plan, and a compact mobile layout."
                className="min-h-48 resize-y rounded border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
              />
            </label>

            {error ? (
              <p className="rounded border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center rounded bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            >
              {loading ? "Generating..." : "Generate component"}
            </button>
          </form>
        </section>

        <section className="min-h-[28rem] rounded border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 px-4 py-3">
            <p className="text-sm font-medium text-slate-300">Generated code</p>
            {componentName ? (
              <p className="mt-1 text-lg font-semibold text-white">
                {componentName}
              </p>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            ) : null}
          </div>

          <pre className="min-h-[24rem] overflow-auto p-4 text-sm leading-6 text-slate-100">
            <code>
              {generatedCode ||
                "Your generated React component will appear here."}
            </code>
          </pre>
        </section>
      </div>
    </main>
  );
}

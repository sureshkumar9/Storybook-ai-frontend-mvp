import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5-coder:1.5b";
const normalizedOllamaHost = OLLAMA_HOST.replace(/\/$/, "");

const ComponentSchema = z.object({
  componentName: z.string(),
  description: z.string(),
  code: z.string(),
});

const componentJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    componentName: { type: "string" },
    description: { type: "string" },
    code: { type: "string" },
  },
  required: ["componentName", "description", "code"],
};

const systemPrompt =
  "You are a frontend code generator. Return only JSON for a single React component in TypeScript. Use Tailwind CSS only. The component must be self-contained, clean, and production-friendly.";

function parseJsonResponse(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("Ollama did not return JSON.");
    }

    return JSON.parse(match[0]);
  }
}

function isOllamaConnectionError(error: unknown) {
  const cause = (error as { cause?: { code?: string } })?.cause;

  return (
    error instanceof TypeError &&
    error.message === "fetch failed" &&
    (cause?.code === "ECONNREFUSED" || cause?.code === "ENOTFOUND")
  );
}

function parseOllamaError(errorText: string) {
  try {
    const parsed = JSON.parse(errorText);

    if (typeof parsed?.error === "string") {
      return parsed.error;
    }
  } catch {
    // Fall through to the raw response text.
  }

  return errorText;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${normalizedOllamaHost}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        format: componentJsonSchema,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        options: {
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const ollamaError =
        parseOllamaError(errorText) ||
        `Ollama request failed with status ${response.status}.`;

      if (ollamaError.includes("requires more system memory")) {
        return NextResponse.json(
          {
            error: `The Ollama model "${OLLAMA_MODEL}" is too large for the available memory. Pull and use a smaller model, for example: ollama pull qwen2.5-coder:1.5b`,
          },
          { status: 507 }
        );
      }

      throw new Error(ollamaError);
    }

    const data = await response.json();
    const content = data?.message?.content;

    if (!content) {
      throw new Error("Ollama response did not include message content.");
    }

    const parsed = ComponentSchema.parse(parseJsonResponse(content));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate API error:", error);

    if (isOllamaConnectionError(error)) {
      return NextResponse.json(
        {
          error: `Ollama is not reachable at ${normalizedOllamaHost}. Start Ollama, then make sure the "${OLLAMA_MODEL}" model is installed.`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to generate component.",
      },
      { status: 500 }
    );
  }
}

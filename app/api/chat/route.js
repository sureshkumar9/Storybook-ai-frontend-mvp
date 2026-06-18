import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    // Initialize the updated client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
You are a senior React + Storybook engineer.


Return ONLY valid React component code.

Requirements:
- Export default component
- No markdown
- No explanations
- No code fences
- JSX only

User request:
${message}
`;

    // Use the updated .models.generateContent method with a valid model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
    });

    return Response.json({
      output: response.text,
    });

  } catch (error) {
    console.error("🔥 Gemini API ERROR:", error);

    return Response.json(
      {
        error: error.message || "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
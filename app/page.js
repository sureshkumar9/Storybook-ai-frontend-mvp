"use client"

import Chatbot from "../components/Chatbot";
import ContextInput from "../components/ContextInput";
import CodePanel from "../components/CodePanel";
import PreviewPanel from "../components/PreviewPanel";
import { useState } from "react";

export default function Home() {
    const [contextData, setContextData] = useState([]);
    const [generatedCode, setGeneratedCode] = useState("// Chat to generate component code here.");
    const [previewText, setPreviewText] = useState("Ask the assistant to generate a component preview.");

    const handleMessagesUpdate = (messages) => {
        const lastBotMessage = [...messages].reverse().find((msg) => msg.sender === "bot");
        if (lastBotMessage) {
            setGeneratedCode(`// Generated code from last response:\n${lastBotMessage.text}`);
            setPreviewText(lastBotMessage.text);
        }
    };

    return (
        <main className="h-screen overflow-hidden bg-slate-50">
            <div className="mx-auto flex h-full min-h-0 w-full max-w-[1600px] flex-col px-4 py-6 lg:px-10 lg:py-8">
                <header className="mb-6 rounded-[32px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
                    <h1 className="text-3xl font-semibold text-slate-900">AI Assistant Dashboard</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600">
                        Use the chat panel, preview generated code in the code display panel, and inspect output in the live preview.
                    </p>
                </header>

                <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
                    <section className="flex min-h-0 flex-col space-y-6">
                        <ContextInput onContextChange={setContextData} />
                        <div className="flex-1 min-h-0">
                            <Chatbot contextData={contextData} onMessagesChange={handleMessagesUpdate} />
                        </div>
                    </section>

                    <div className="flex h-full min-h-0">
                        <CodePanel code={generatedCode} />
                    </div>

                    <div className="flex h-full min-h-0">
                        <PreviewPanel previewText={previewText} />
                    </div>
                </div>
            </div>
        </main>
    );
}

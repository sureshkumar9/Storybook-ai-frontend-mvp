"use client"

import { useState } from "react";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from "react-resizable-panels";
import Chatbot from "../components/Chatbot";
import ContextInput from "../components/ContextInput";
import CodePanel from "../components/CodePanel";
import PreviewPanel from "../components/PreviewPanel";

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
            <div className="flex h-full min-h-0 w-full flex-col">
                <header className="border-b border-slate-200 bg-white px-6 py-5 shadow-xs">
                    <h1 className="text-2xl font-semibold text-slate-900">AI Assistant Dashboard</h1>
                    <p className="mt-1 text-xs text-slate-600">
                        Resize panels by dragging dividers. Chat, generate code, and preview in real-time.
                    </p>
                </header>

                <PanelGroup direction="horizontal" className="flex-1 overflow-hidden">
                    {/* Chatbot Panel - 30% */}
                    <Panel defaultSize={30} minSize={20} maxSize={50}>
                        <div className="flex h-full flex-col space-y-4 overflow-hidden p-4">
                            <ContextInput onContextChange={setContextData} />
                            <div className="flex-1 min-h-0 overflow-hidden">
                                <Chatbot contextData={contextData} onMessagesChange={handleMessagesUpdate} />
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle />

                    {/* Code Panel - 40% */}
                    <Panel defaultSize={40} minSize={25} maxSize={60}>
                        <div className="h-full overflow-hidden p-4">
                            <CodePanel code={generatedCode} />
                        </div>
                    </Panel>

                    <PanelResizeHandle />

                    {/* Preview Panel - 30% */}
                    <Panel defaultSize={30} minSize={20} maxSize={50}>
                        <div className="h-full overflow-hidden p-4">
                            <PreviewPanel previewText={previewText} />
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </main>
    );
}

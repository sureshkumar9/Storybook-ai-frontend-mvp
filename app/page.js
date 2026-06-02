"use client"

import { useEffect, useState } from "react";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from "react-resizable-panels";
import Chatbot from "../components/Chatbot";
import CodePanel from "../components/CodePanel";
import PreviewPanel from "../components/PreviewPanel";
import ContextDataButton from "../components/ContextDataButton";
import ContextDataModal from "../components/ContextDataModal";

const CONTEXT_STORAGE_KEY = "storybook-context-data";
const SAMPLE_CONTEXT = `{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "Editor" }
  ],
  "products": [
    { "id": 1, "title": "Product A", "price": 29.99 },
    { "id": 2, "title": "Product B", "price": 49.99 }
  ]
}`;

export default function Home() {
    const [contextData, setContextData] = useState(null);
    const [contextJson, setContextJson] = useState("");
    const [isContextModalOpen, setIsContextModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("// Chat to generate component code here.");
    const [previewText, setPreviewText] = useState("Ask the assistant to generate a component preview.");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem(CONTEXT_STORAGE_KEY);
        if (stored) {
            setContextJson(stored);
            try {
                setContextData(JSON.parse(stored));
            } catch (error) {
                setContextData(null);
            }
        }
    }, []);

    const handleMessagesUpdate = (messages) => {
        const lastBotMessage = [...messages].reverse().find((msg) => msg.sender === "bot");
        if (lastBotMessage) {
            setGeneratedCode(`// Generated code from last response:\n${lastBotMessage.text}`);
            setPreviewText(lastBotMessage.text);
        }
    };

    const handleSaveContextFromModal = (text) => {
        const plain = text ?? "";
        setContextJson(plain);
        setContextData(plain);
    };

    const openContextModal = () => setIsContextModalOpen(true);
    const closeContextModal = () => setIsContextModalOpen(false);

    const handleSaveContext = () => {
        // Save in-memory only (plain text)
        setContextData(contextJson);
    };

    const handleClearContext = () => {
        setContextJson("");
        setContextData(null);
    };

    const handleInsertSampleData = () => {
        setContextJson(SAMPLE_CONTEXT);
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
                    <Panel defaultSize={30} minSize={20} maxSize={50}>
                        <div className="flex h-full flex-col overflow-hidden p-4">
                            <div className="mb-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h2 className="text-base font-semibold text-slate-900">Context-aware chat</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Use the context data modal to store JSON that will be passed along with your component prompts.
                                </p>
                            </div>
                            <div className="flex-1 min-h-0 overflow-hidden">
                                <Chatbot contextData={contextData} onMessagesChange={handleMessagesUpdate} />
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle />

                    <Panel defaultSize={40} minSize={25} maxSize={60}>
                        <div className="h-full overflow-hidden p-4">
                            <CodePanel code={generatedCode} />
                        </div>
                    </Panel>

                    <PanelResizeHandle />

                    <Panel defaultSize={30} minSize={20} maxSize={50}>
                        <div className="h-full overflow-hidden p-4">
                            <PreviewPanel previewText={previewText} />
                        </div>
                    </Panel>
                </PanelGroup>
            </div>

            <ContextDataButton onOpen={openContextModal} />
            <ContextDataModal open={isContextModalOpen} onClose={closeContextModal} onSave={handleSaveContextFromModal} />
        </main>
    );
}

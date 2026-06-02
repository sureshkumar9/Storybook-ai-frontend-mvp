"use client"

import Chatbot from "../components/Chatbot";
import ContextInput from "../components/ContextInput";
import ContextDataModal from "../components/ContextDataModal";
import CodePanel from "../components/CodePanel";
import PreviewPanel from "../components/PreviewPanel";
import { useState, useRef } from "react";

export default function Home() {
    const [contextData, setContextData] = useState([]);
    const [generatedCode, setGeneratedCode] = useState("// Chat to generate component code here.");
    const [previewText, setPreviewText] = useState("Ask the assistant to generate a component preview.");
    const [previewCode, setPreviewCode] = useState("");

    // const handleMessagesUpdate = (messages) => {
    //     const lastBotMessage = [...messages].reverse().find((msg) => msg.sender === "bot");
    //     if (lastBotMessage) {
    //         setGeneratedCode(`// Generated code from last response:\n${lastBotMessage.text}`);
    //         setPreviewText(lastBotMessage.text);
    //     }
    // };

    const handleMessagesUpdate = (messages) => {
        const lastBotMessage = [...messages]
            .reverse()
            .find((msg) => msg.sender === "bot");

        if (!lastBotMessage) return;

        setGeneratedCode(lastBotMessage.text);

        // AI-generated Preview() component
        setPreviewCode(lastBotMessage.text);

        setPreviewText("Rendering generated component...");
    };


    const [isContextModalOpen, setIsContextModalOpen] = useState(false);

    const openContextModal = () => setIsContextModalOpen(true);
    const closeContextModal = () => setIsContextModalOpen(false);

    const contextInputRef = useRef(null);

    const handleSaveContextFromModal = async () => {
        // trigger ContextInput.saveAll via ref, and update page state with returned data
        if (contextInputRef.current && typeof contextInputRef.current.saveAll === 'function') {
            try {
                const data = await contextInputRef.current.saveAll();
                setContextData(data);
            } catch (err) {
                // keep existing contextData on error
                console.error('Failed to save context from modal', err);
            }
        }
        closeContextModal();
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

                <div className="flex h-full min-h-0 gap-6">
                    <section className="flex flex-col flex-1 min-h-0">
                        <div>
                            <button onClick={openContextModal} className="rounded-lg bg-slate-900 text-white px-3 py-2">Open Context</button>
                            <ContextDataModal open={isContextModalOpen} onClose={closeContextModal} onSave={handleSaveContextFromModal}>
                                <ContextInput ref={contextInputRef} onContextChange={setContextData} />
                            </ContextDataModal>
                        </div>
                        <div className="flex-1 min-h-0 overflow-auto">
                            <Chatbot contextData={contextData} onMessagesChange={handleMessagesUpdate} />
                        </div>
                    </section>

                    <div className="flex-none w-1/3 min-h-0">
                        <CodePanel code={generatedCode} />
                    </div>

                    <div className="flex-none w-1/3 min-h-0">
                        <PreviewPanel previewCode={previewCode} previewText={previewText} />
                    </div>
                </div>
            </div>
        </main>
    );
}

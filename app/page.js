"use client"

import Chatbot from "../components/Chatbot";
import ContextInput from "../components/ContextInput";
import ContextDataModal from "../components/ContextDataModal";
import CodePanel from "../components/CodePanel";
import PreviewPanel from "../components/PreviewPanel";
import Sidebar from "../components/Sidebar";
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
        <main className="relative h-screen overflow-hidden bg-slate-100">
            <Sidebar />
            <div className="relative flex h-full min-h-0 w-full flex-col gap-6 overflow-hidden lg:pl-[284px]">
                <div className="mx-auto flex h-full min-h-0 w-full max-w-[1680px] flex-col gap-6 px-4 py-6 lg:px-6 lg:py-6">
                    <header className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                        <h1 className="text-3xl font-semibold text-slate-900">AI Assistant Dashboard</h1>
                        <p className="mt-2 max-w-3xl text-sm text-slate-600">
                            Use the chat panel, preview generated code in the code display panel, and inspect output in the live preview.
                        </p>
                    </header>

                    <div className="flex flex-1 min-h-0 flex-col gap-4 lg:flex-row">
                        <section className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm lg:w-[30%]">
                            <div className="border-b border-slate-200 px-6 py-5">
                                <p className="text-sm font-semibold text-slate-900">Context-aware chat</p>
                                <p className="mt-1 text-sm text-slate-500">Use the chat panel to prompt AI and generate component code.</p>
                            </div>
                            <div className="flex-1 min-h-0 overflow-hidden p-6">
                                <Chatbot contextData={contextData} onMessagesChange={handleMessagesUpdate} />
                            </div>
                        </section>

                        <div className="flex min-h-0 w-full flex-col lg:w-[40%]">
                            <CodePanel code={generatedCode} />
                        </div>

                        <div className="flex min-h-0 w-full flex-col lg:w-[30%]">
                            <PreviewPanel previewCode={previewCode} previewText={previewText} />
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={openContextModal}
                    className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-20px_rgba(15,23,42,0.8)] transition hover:bg-slate-800"
                >
                    Context Data
                </button>

                <ContextDataModal open={isContextModalOpen} onClose={closeContextModal} onSave={handleSaveContextFromModal}>
                    <ContextInput ref={contextInputRef} onContextChange={setContextData} />
                </ContextDataModal>
            </div>
        </main>
    );
}

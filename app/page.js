"use client"

import Chatbot from "../components/Chatbot";
import ContextInput from "../components/ContextInput";
import { useState } from "react";

export default function Home() {
    const [contextData, setContextData] = useState([]);
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="w-full max-w-md">
                <ContextInput onContextChange={setContextData} />
            </div>
            <div className="mt-2 w-full max-w-md">
                <Chatbot contextData={contextData} />
            </div>
        </div>
    );
}
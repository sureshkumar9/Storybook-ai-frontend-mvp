import Chatbot from "../components/Chatbot";

export default function Home() {
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="mt-8 w-full max-w-md">
                <Chatbot />
            </div>
        </div>
    );
}
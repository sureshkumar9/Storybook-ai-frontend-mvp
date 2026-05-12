import Chatbot from "../components/Chatbot";

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            <div style={{ marginTop: 32 }}>
                <Chatbot />
            </div>
        </div>
    );
}
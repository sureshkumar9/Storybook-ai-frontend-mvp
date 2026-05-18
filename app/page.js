import Chatbot from "../components/Chatbot";

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f4f8, #d9e2ec)' }}>
            <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: 20 }}>Storybook AI Chatbot</h1>
            <div style={{ marginTop: 32 }}>
                <Chatbot />
            </div>
        </div>
    );
}
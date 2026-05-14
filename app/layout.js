import './globals.css'

export const metadata = {
    title: 'Storybook AI Chatbot',
    description: 'AI-powered chatbot for storybook assistance',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
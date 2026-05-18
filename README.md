# Storybook-ai-frontend-mvp
Build the frontend shell for an AI-assisted Storybook component generator using Next.js.

## Getting Started

First, install dependencies:

```bash
npm install
```

Make sure Ollama is running locally:

```bash
ollama serve
```

In another terminal, pull the default model:

```bash
ollama pull qwen2.5-coder:1.5b
```

If Ollama is already running as a desktop app or service, you only need to pull
the model.

You can override the local model or host with `.env.local`:

```bash
OLLAMA_MODEL=qwen2.5-coder:1.5b
OLLAMA_HOST=http://127.0.0.1:11434
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Build for Production

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

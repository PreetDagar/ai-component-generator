# AI Component Generator

An AI-powered web application that helps developers generate UI components from natural-language prompts. It provides a streamlined interface for creating, viewing, and working with generated code.

## Features

* **AI-powered code generation** — Generate UI component code from text prompts using Google Gemini.
* **Live preview** — View generated component output in the application.
* **Code editor** — Work with generated code using the Monaco Editor.
* **React and Vite** — A modern frontend development environment with fast hot-module replacement.
* **Tailwind CSS** — Utility-first styling for building responsive interfaces.
* **Interactive interface** — React-based controls and notifications for a smoother workflow.

## Tech Stack

* React
* Vite
* JavaScript
* Tailwind CSS
* Google GenAI SDK (`@google/genai`)
* Monaco Editor
* React Select
* React Toastify

## Project Structure

```text
ai-com-gen/
├── public/
├── src/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, install:

* [Node.js](https://nodejs.org/) — preferably a current LTS version.
* npm, which is included with Node.js.
* A Google Gemini API key, if required by the application's configuration.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/PreetDagar/ai-component-generator.git
cd ai-component-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API key

Create a `.env` file in the project root if your application is configured to read the Gemini API key from an environment variable.

For a Vite frontend, client-exposed environment variables commonly use the `VITE_` prefix. For example:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Use the exact variable name expected by your source code. Never commit your real API key or upload it to a public repository. Client-side environment variables can be exposed in the browser, so production applications should protect API credentials through a backend service.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, commonly:

```text
http://localhost:5173
```

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                    |

These scripts depend on the configuration in `package.json`.

## Build for Production

To create a production build, run:

```bash
npm run build
```

Vite generates the production files in the `dist/` directory.

To preview the build locally:

```bash
npm run preview
```

## Security

* Keep API keys and other secrets out of Git.
* Add `.env` files to `.gitignore`.
* Do not publish API keys in JavaScript source code.
* If a key has already been committed or exposed, revoke it and generate a replacement.

## Future Improvements

* Add support for more UI frameworks and component libraries.
* Improve generated-code validation and error handling.
* Add additional component templates and customization options.
* Support exporting generated components into reusable project files.
* Improve accessibility and responsive design.

## Author

**Preet Dagar**

GitHub: [@PreetDagar](https://github.com/PreetDagar)

## License

Refer to the repository's `LICENSE` file for licensing terms.

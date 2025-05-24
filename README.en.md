<div align="center">
  <a name="readme-top"></a>

  <h1>Mermaid Converter</h1>
  🇺🇸 <a href="README.en.md">Read in English</a> | 🇧🇷 <a href="README.md">Leia em Português</a>
  <p>
     Visual converter and editor for <b>Mermaid</b> diagrams with live preview, export, and integrated AI assistant.
  </p>
</div>

---

<p align="center">

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.x-yellow?logo=vite)
![MUI](https://img.shields.io/badge/MUI-5.x-blue?logo=mui)
![Mermaid](https://img.shields.io/badge/Mermaid-10.x-brightgreen?logo=mermaid)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?logo=vercel)
![Jest](https://img.shields.io/badge/Jest-29.x-blue?logo=jest)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-blue?logo=google)

</p>

---

## ✨ About the Project

**Mermaid Converter** is a web application to create, edit, visualize, and export diagrams using [Mermaid](https://mermaid-js.github.io/) syntax.
It includes an AI assistant (Gemini) to help generate and explain diagrams, as well as export features for SVG, PNG, and PDF.

---

## 📺 Demo

<p align="center">
  <img src="./mermaid-converter.gif" alt="Mermaid Converter Demo" width="700"/>
</p>

---

## 🚀 How to Run the Project Locally

You can run the project locally using **Node.js** or via **Vercel CLI** to test the serverless functions.

### 1. Running with Node.js (Vite)

#### Steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/izaacledererjunior/mermaid-converter.git
   cd mermaid-converter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the project root** with your API keys (see `.env.example`):

   ```ini
   GEMINI_API_KEY=...
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in your browser:**

   ```
   http://localhost:5173
   ```

> ⚠️ **Note:** The `/api/*` routes (serverless functions) will not work with `npm run dev` alone. To test the AI locally, use the Vercel CLI.

---

### 2. Running with Vercel CLI (recommended for AI features)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Run the project with serverless functions:**

   ```bash
   vercel dev
   ```

3. **Open in your browser:**

   ```
   http://localhost:3000
   ```

---

## 🧠 Features

- Mermaid code editor with syntax highlighting
- Real-time diagram preview
- Export to SVG and PNG
- AI assistant (OpenAI/Gemini) for diagram generation, explanation, and correction
- Responsive interface with light/dark theme
- Download generated diagrams
- Integration with serverless functions (Vercel API)

---

## 🛠️ Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [MUI (Material UI)](https://mui.com/)
- [Mermaid.js](https://mermaid-js.github.io/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Google Gemini API](https://ai.google.dev/)

---

## 📦 Project Structure

```
mermaid-converter/
├── api/                # Serverless functions (e.g., chat.js)
├── public/             # Static files
├── src/
│   ├── components/     # React components (Chat, Editor, Preview, etc)
│   ├── pages/          # Main pages
│   ├── theme.ts        # Custom MUI themes
│   └── ...             # Other files
├── .env.example        # Example environment variables
├── package.json
├── vercel.json         # Vercel routes/functions config
└── README.md
```

---

## 🌐 Serverless API (AI Assistant)

Serverless functions are in the `/api` folder and are accessed via `/api/chat` for AI (Gemini) integration.

- **Endpoint:** `POST /api/chat`
- **Expected body:**
  ```json
  {
    "messages": [
      { "role": "system", "content": "..." },
      { "role": "user", "content": "..." }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "message": "AI response"
  }
  ```

---

## 📝 Example: Using the AI Assistant

1. Type your question or request a diagram in the side chat.
2. The assistant will reply, possibly suggesting ready-to-use Mermaid code.
3. Click "Click here to insert this diagram into the editor" to import the suggested diagram.

---

## ⚠️ Security Notice

- **Never share your `.env` file or API keys publicly.**
- Make sure `.env` is in your `.gitignore` and never committed to the repository.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE.txt` file for details.

---

## 📞 Contact

- **Email:** brizaac@tutanota.com

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center">
  <a name="readme-top"></a>

  <h1>Mermaid Converter</h1>

  <p>
     Conversor e editor visual de diagramas <b>Mermaid</b> com preview, exportação e assistente IA integrado.
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

## ✨ Sobre o Projeto

O **Mermaid Converter** é uma aplicação web para criar, editar, visualizar e exportar diagramas usando a sintaxe [Mermaid](https://mermaid-js.github.io/).
Inclui um assistente IA (Gemini) para ajudar na geração e explicação de diagramas, além de recursos de exportação para SVG, PNG e PDF.

---

## 📺 Demonstração

<p align="center">
  <img src="./mermaid-converter.gif" alt="Demonstração do Mermaid Converter" width="700"/>
</p>

---

## 🚀 Como Rodar o Projeto Localmente

Você pode rodar o projeto localmente usando **Node.js** ou via **Vercel CLI** para testar as funções serverless.

### 1. Rodando com Node.js (Vite)

#### Passos:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/izaacledererjunior/mermaid-converter.git
   cd mermaid-converter
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Crie um arquivo `.env` na raiz do projeto** com suas chaves de API (veja `.env.example`):

   ```ini
   GEMINI_API_KEY=...
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**

   ```
   http://localhost:5173
   ```

> ⚠️ **Atenção:** As rotas `/api/*` (funções serverless) não funcionarão apenas com `npm run dev`. Para testar a IA localmente, use o Vercel CLI.

---

### 2. Rodando com Vercel CLI (recomendado para testar IA)

1. **Instale o Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Rode o projeto com as funções serverless:**

   ```bash
   vercel dev
   ```

3. **Acesse no navegador:**

   ```
   http://localhost:3000
   ```

---

## 🧠 Funcionalidades

- Editor de código Mermaid com destaque de sintaxe
- Preview visual do diagrama em tempo real
- Exportação para SVG e PNG
- Assistente IA (OpenAI/Gemini) para geração, explicação e correção de diagramas
- Interface responsiva e tema claro/escuro
- Download do diagrama gerado
- Integração com funções serverless (API Vercel)

---

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [MUI (Material UI)](https://mui.com/)
- [Mermaid.js](https://mermaid-js.github.io/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Google Gemini API](https://ai.google.dev/)

---

## 📦 Estrutura do Projeto

```
mermaid-converter/
├── api/                # Funções serverless (ex: chat.js)
├── public/             # Arquivos estáticos
├── src/
│   ├── components/     # Componentes React (Chat, Editor, Preview, etc)
│   ├── pages/          # Páginas principais
│   ├── theme.ts        # Temas MUI customizados
│   └── ...             # Outros arquivos
├── .env.example        # Exemplo de variáveis de ambiente
├── package.json
├── vercel.json         # Configuração de rotas/functions Vercel
└── README.md
```

---

## 🌐 API Serverless (Assistente IA)

As funções serverless ficam na pasta `/api` e são acessadas via `/api/chat` para integração com IA (Gemini).

- **Endpoint:** `POST /api/chat`
- **Body esperado:**
  ```json
  {
    "messages": [
      { "role": "system", "content": "..." },
      { "role": "user", "content": "..." }
    ]
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Resposta da IA"
  }
  ```

---

## 📝 Exemplo de Uso do Assistente IA

1. Digite sua dúvida ou peça um diagrama no chat lateral.
2. O assistente irá responder, podendo sugerir códigos Mermaid prontos.
3. Clique em "Clique aqui para inserir este diagrama no editor" para importar o diagrama sugerido.

---

## ⚠️ Aviso de Segurança

- **Nunca compartilhe seu arquivo `.env` ou chaves de API publicamente.**
- Assegure-se de que `.env` está no `.gitignore` e nunca faça commit desse arquivo.

---

## 📄 Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo `LICENSE.txt` para mais detalhes.

---

## 📞 Contato

- **Email:** izaacledererjunior@gmail.com

---

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

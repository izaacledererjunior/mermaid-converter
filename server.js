import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3001;


const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_API_KEY}`
        },
        body: JSON.stringify({ inputs: formatMessagesToPrompt(req.body.messages) }),
      }
    );
    const result = await response.json();
    res.json({ message: result[0].generated_text });
  } catch (error) {
    // Tratamento de erro
  }
});


if (isProduction) {
  app.use(express.static(resolve(__dirname, 'dist')));


  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${isProduction ? 'produção' : 'desenvolvimento'}`);
  if (!isProduction) {
    console.log(`API disponível em: http://localhost:${PORT}/api`);
    console.log(`Nota: Para o frontend, execute "npm run dev" em outro terminal`);
  }
});

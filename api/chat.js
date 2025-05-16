import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { messages } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const systemMessage = messages.find(m => m.role === 'system');
    const contents = [];

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.role === 'system') continue;

      if (msg.role === 'user') {
        let userText = msg.content;

        if (systemMessage && i === 0) {
          userText = `${systemMessage.content}\n\n${userText}`;
        }

        contents.push({
          role: 'user',
          parts: [{ text: userText }],
        });
      } else if (msg.role === 'assistant') {
        contents.push({
          role: 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Chamada à API Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      }
    );

    if (
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts
    ) {
      const assistantMessage = response.data.candidates[0].content.parts[0].text;
      return res.status(200).json({ message: assistantMessage });
    }

    return res.status(500).json({ error: 'Resposta inesperada da API' });
  } catch (error) {
    console.error('Erro na API Gemini:', error.response?.data || error.message);

    if (error.response) {
      if (error.response.status === 400) {
        return res.status(400).json({ error: 'Requisição inválida para API Gemini' });
      } else if (error.response.status === 403) {
        return res.status(403).json({ error: 'Problema com autenticação da API Gemini' });
      }
    }

    return res.status(500).json({ error: 'Falha na comunicação com o serviço de IA' });
  }
}

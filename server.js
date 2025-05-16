import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

// Configurar variáveis de ambiente
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3001;

// Inicializar Express
const app = express();
app.use(cors());
app.use(express.json());

// Função para formatar mensagens para a API da OpenAI
const formatMessages = (messages) => {
  // Já está no formato correto para OpenAI; retorna as mensagens diretamente
  return messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

// Rota para o chat - Usando OpenAI
// Modificação na rota /api/chat
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    console.log(`Enviando requisição para OpenAI API com ${messages.length} mensagens`);

    // Adicionar timeout para evitar requisições pendentes indefinidamente
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: formatMessages(messages),
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        timeout: 30000, // 30 segundos de timeout
      }
    );

    console.log('Resposta recebida da OpenAI com sucesso');
    const assistantMessage = response.data.choices[0].message.content;
    res.json({ message: assistantMessage });

  } catch (error) {
    console.error('Erro na API OpenAI:', error.code || 'Erro desconhecido');

    // Tratamento de timeout específico
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Tempo limite da requisição excedido' });
    }

    // Resto do tratamento de erros aqui...
  }
});

// Rota de teste
app.get('/api/connectivity', async (req, res) => {
  try {
    console.log('Testando conectividade...');
    const response = await axios.get('https://www.google.com', { timeout: 5000 });
    res.json({ status: 'ok', statusCode: response.status });
  } catch (error) {
    console.error('Erro de conectividade:', error.message);
    res.status(500).json({ error: 'Falha na conexão', message: error.message });
  }
});

// Configurações para produção - servir arquivos estáticos
if (isProduction) {
  app.use(express.static(resolve(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
  });
}

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${isProduction ? 'produção' : 'desenvolvimento'}`);
  console.log(`Usando API: OpenAI`);
  if (!isProduction) {
    console.log(`API disponível em: http://localhost:${PORT}/api`);
    console.log(`Nota: Para o frontend, execute "npm run dev" em outro terminal`);
  }
});

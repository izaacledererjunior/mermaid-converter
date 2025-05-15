import axios from 'axios';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Configura a URL base da API
const API_URL = import.meta.env.DEV
  ? 'http://localhost:3001/api'
  : 'https://mermaid-assistant-api.onrender.com/api';


export const ChatService = {

  async sendMessage(messages: Message[]): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/chat`, { messages });
      return response.data.message;
    } catch (error) {
      console.error('Erro ao comunicar com a API:', error);
      throw new Error('Falha na comunicação com o serviço de IA');
    }
  },


  prepareMermaidPrompt(userMessage: string, currentDiagram?: string): Message[] {

    const systemPrompt: Message = {
      role: 'system',
      content: `Você é um assistente especializado em diagramas Mermaid.
      Ajude o usuário a criar, entender e modificar diagramas.
      Use blocos de código com a sintaxe Mermaid para fornecer exemplos:
      \`\`\`mermaid
      seu-codigo-aqui
      \`\`\`
      Seja conciso e focado em soluções práticas.`
    };

    const messages: Message[] = [systemPrompt];


    if (currentDiagram) {
      messages.push({
        role: 'user',
        content: `Este é o diagrama em que estou trabalhando:\n\`\`\`mermaid\n${currentDiagram}\n\`\`\``
      });
    }

    messages.push({
      role: 'user',
      content: userMessage
    });

    return messages;
  }
};

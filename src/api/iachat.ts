import axios from 'axios';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const ChatService = {
  async sendMessage(messages: Message[]): Promise<string> {
    try {
      console.log('Enviando requisição para servidor proxy');

      const response = await axios.post(
        '/api/chat',
        { messages },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        }
      );

      return response.data.message;
    } catch (error) {
      console.error('Erro ao comunicar com o servidor:', error);

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.error || error.message;
        throw new Error(errorMessage);
      }

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
      Seja conciso e focado em soluções práticas.`,
    };

    const messages: Message[] = [systemPrompt];

    if (currentDiagram) {
      messages.push({
        role: 'user',
        content: `Este é o diagrama em que estou trabalhando:\n\`\`\`mermaid\n${currentDiagram}\n\`\`\``,
      });
    }

    messages.push({
      role: 'user',
      content: userMessage,
    });

    return messages;
  },
};

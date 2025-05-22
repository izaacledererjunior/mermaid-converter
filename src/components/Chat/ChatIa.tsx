import React, { useState, useRef, useEffect } from 'react';
import { Paper, Divider } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { ChatService } from '../../api/iachat';
import ChatHeader from './HeaderChat';
import ChatMessages from './ListMessages';
import ChatInput from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  diagramCode: string;
  onInsertCode: (code: string) => void;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ diagramCode, onInsertCode, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou seu assistente de diagramas Mermaid. Como posso ajudar?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const messagesForAI = ChatService.prepareMermaidPrompt(input, diagramCode);
      const responseText = await ChatService.sendMessage(messagesForAI);

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);

      const mermaidCodeMatch = responseText.match(/```mermaid\n([\s\S]*?)\n```/);
      if (mermaidCodeMatch && mermaidCodeMatch[1]) {
        const extractedCode = mermaidCodeMatch[1];
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `[Clique aqui para inserir este diagrama no editor](insert:${extractedCode})`,
          },
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            error instanceof Error
              ? `Erro: ${error.message}`
              : 'Desculpe, ocorreu um erro ao processar sua solicitação.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMessageClick = (content: string) => {
    const insertMatch = content.match(
      /\[Clique aqui para inserir este diagrama no editor\]\(insert:([\s\S]*?)\)/
    );
    if (insertMatch && insertMatch[1]) {
      onInsertCode(insertMatch[1]);
    }
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <ChatHeader onClose={onClose} />
      <ChatMessages
        messages={messages}
        darkMode={darkMode}
        messagesEndRef={messagesEndRef}
        onMessageClick={handleMessageClick}
      />
      <Divider />
      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
      />
    </Paper>
  );
};

export default AIChat;

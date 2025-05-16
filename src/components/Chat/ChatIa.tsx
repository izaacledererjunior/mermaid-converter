import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Paper, TextField, IconButton, Typography,
  List, ListItem, CircularProgress, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '../../context/ThemeContext';
import { ChatService } from '../../api/iachat';

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
      content: 'Olá! Sou seu assistente de diagramas Mermaid. Como posso ajudar?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  // Rolar para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Adiciona a mensagem do usuário
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Constrói contexto com o código atual do diagrama
      const contextMessage = diagramCode
        ? `Estou trabalhando com este diagrama Mermaid:\n\`\`\`\n${diagramCode}\n\`\`\``
        : '';

      // Busca resposta da API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            userMessage,
            ...(contextMessage ? [{ role: 'user', content: contextMessage }] : [])
          ],
        }),
      });

      const data = await response.json();

      // Atualiza mensagens com a resposta
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);

        // Verifica se a resposta contém código Mermaid e oferece opção para inserir
        const mermaidCodeMatch = data.message.match(/```mermaid\n([\s\S]*?)\n```/);
        if (mermaidCodeMatch && mermaidCodeMatch[1]) {
          const extractedCode = mermaidCodeMatch[1];
          // Adiciona botão para inserir o código
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: `[Clique aqui para inserir este diagrama no editor](insert:${extractedCode})`
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Erro ao comunicar com a IA:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua solicitação.'
        }
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
    // Verifica se é um link para inserir código
    const insertMatch = content.match(/\[Clique aqui para inserir este diagrama no editor\]\(insert:([\s\S]*?)\)/);
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
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Assistente de Diagramas</Typography>
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="fechar chat"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                bgcolor: 'action.hover',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        )}

      </Box>

      <List
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          bgcolor: darkMode ? 'background.paper' : '#f5f7f9',
        }}
      >
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Paper
              onClick={() => handleMessageClick(msg.content)}
              sx={{
                maxWidth: '80%',
                p: 2,
                bgcolor: msg.role === 'user'
                  ? (darkMode ? 'primary.dark' : 'primary.light')
                  : (darkMode ? '#383838' : '#ffffff'),
                color: msg.role === 'user'
                  ? 'primary.contrastText'
                  : 'text.primary',
                borderRadius: 2,
                cursor: msg.content.includes('insert:') ? 'pointer' : 'default',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  '& code': {
                    bgcolor: darkMode ? '#2d2d2d' : '#f1f1f1',
                    p: 0.5,
                    borderRadius: 1,
                    fontFamily: 'monospace'
                  }
                }}
              >
                {/* Renderizar conteúdo com formatação */}
                {msg.content.includes('insert:')
                  ? msg.content.replace(/\[Clique aqui para inserir este diagrama no editor\]\(insert:[\s\S]*?\)/, 'Clique aqui para inserir este diagrama no editor')
                  : msg.content}
              </Typography>
            </Paper>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>

      <Divider />

      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pergunte sobre diagramas Mermaid..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          multiline
          maxRows={4}
          size="small"
        />

        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}

        </IconButton>
      </Box>
    </Paper>
  );
};

export default AIChat;

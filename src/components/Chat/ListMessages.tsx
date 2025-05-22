import React from 'react';
import type { RefObject } from 'react';
import { List, ListItem, Paper, Typography, Box } from '@mui/material';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}
interface ChatMessagesProps {
  messages: Message[];
  darkMode: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onMessageClick: (content: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  darkMode,
  messagesEndRef,
  onMessageClick,
}) => (
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
          onClick={() => onMessageClick(msg.content)}
          sx={{
            maxWidth: '80%',
            p: 2,
            bgcolor:
              msg.role === 'user'
                ? darkMode
                  ? 'primary.dark'
                  : 'primary.light'
                : darkMode
                  ? '#383838'
                  : '#ffffff',
            color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
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
                fontFamily: 'monospace',
              },
            }}
          >
            {msg.content.includes('insert:')
              ? msg.content.replace(
                  /\[Clique aqui para inserir este diagrama no editor\]\(insert:[\s\S]*?\)/,
                  'Clique aqui para inserir este diagrama no editor'
                )
              : msg.content}
          </Typography>
        </Paper>
      </ListItem>
    ))}
    <div ref={messagesEndRef} />
  </List>
);

export default ChatMessages;

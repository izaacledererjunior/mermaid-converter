import React from 'react';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

interface ChatButtonProps {
  onClick: () => void;
  sx?: object;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, sx }) => (
  <IconButton color="primary" aria-label="chat com assistente" sx={sx} onClick={onClick}>
    <ChatIcon />
  </IconButton>
);

export default ChatButton;

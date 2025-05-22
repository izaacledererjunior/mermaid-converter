import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => (
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
    <IconButton
      onClick={onClose}
      size="small"
      aria-label="fechar chat"
      sx={{
        color: 'text.secondary',
        '&:hover': {
          color: 'text.primary',
          bgcolor: 'action.hover',
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);

export default ChatHeader;

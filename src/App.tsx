import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, IconButton, Drawer } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DiagramInput from './components/Input/DiagramInput';
import DiagramPreview from './components/Preview/DiagramPreview';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header/Header';
import AIChat from './components/Chat/ChatIa';
import { darkTheme } from './theme';

const App: React.FC = () => {
  const [diagramCode, setDiagramCode] = useState<string>('');
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const initialCode = `graph TD
      Client([Cliente]) --> API[API REST]

      API --> Auth[Autenticação]
      API --> Service[Serviço Principal]

      Auth --> Cache[(Redis)]
      Service --> DB[(Banco de Dados)]

      Service --> Queue[Fila de Tarefas]
      Queue --> Worker[Processador]
      Worker --> Email[Serviço de Email]

      classDef client fill:#a9dcf4,stroke:#0277bd,stroke-width:2px
      classDef service fill:#bbdefb,stroke:#0277bd,stroke-width:1px
      classDef database fill:#e1f5fe,stroke:#0277bd,stroke-width:1px,shape:cylinder

      class Client client
      class API,Auth,Service,Worker,Email service
      class DB,Cache,Queue database`;
    setDiagramCode(initialCode);
  }, []);

  const handleInsertCode = (code: string) => {
    setDiagramCode(code);
  };


  const [chatOpen, setChatOpen] = useState<boolean>(false);
  return (
    <ThemeProvider>
      <Header />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '90vh',
          height: 'calc(100vh - 64px)',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          pt: 2,
          pb: 6,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, md: 8 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              minHeight: { md: '70vh' },
              height: { md: 'calc(100vh - 160px)' },
              alignItems: 'stretch',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Paper
              sx={{
                flex: 1,
                p: 2,
                bgcolor: 'background.paper',
                border: '1px solid #4F4F4F',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                mb: { xs: 2, md: 0 },
                mt: { xs: 2, md: 0 },
                minHeight: 0,
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Typography variant="h5" color="text.primary" gutterBottom>
                Editor de Diagrama
              </Typography>
              <DiagramInput diagramCode={diagramCode} setDiagramCode={setDiagramCode} />
            </Paper>

            <Paper
              sx={(theme) => ({
                flex: 1,
                p: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'transparent' : 'background.paper',
                border: '1px solid #4F4F4F',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 0,
                height: '100%',
                overflow: 'auto',
              })}
            >
              <Typography variant="h5" color="text.primary" gutterBottom>
                Pré-visualização
              </Typography>
              <DiagramPreview diagramCode={diagramCode} setSvgContent={setSvgContent} />
            </Paper>
          </Box>
        </Container>
        {!chatOpen && (
          <IconButton
            color="primary"
            aria-label="chat com assistente"
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 24 },
              right: { xs: 16, sm: 24 },
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              boxShadow: 3,
              zIndex: 1300,
              transition: 'all 0.2s ease-in-out',
              '@media (max-height: 500px)': {
                bottom: 12,
                right: 12,
                width: 40,
                height: 40,
              },
              '@media (pointer: coarse)': {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bottom: -8,
                  left: -8,
                },
              }
            }}
            onClick={() => setChatOpen(true)}
          >
            <ChatIcon />
          </IconButton>
        )}
        <Drawer
          anchor="right"
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '100%', sm: 400 },
              boxSizing: 'border-box',
            },
          }}
        >
          <AIChat
            diagramCode={diagramCode}
            onInsertCode={handleInsertCode}
            onClose={() => setChatOpen(false)}
          />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default App;

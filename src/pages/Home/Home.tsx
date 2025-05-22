import React, { useState, useEffect } from 'react';
import { Box, Container, Drawer } from '@mui/material';
import { Header } from '../../components/Header/Header';
import AIChat from '../../components/Chat/ChatIa';
import DiagramEditor from '../../components/Home/DiagramEditor';
import DiagramPreviewPanel from '../../components/Home/DiagramPreviewPanel';
import ChatButton from '../../components/Home/ChatButton';

const Home: React.FC = () => {
  const [diagramCode, setDiagramCode] = useState<string>('');
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

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

  return (
    <>
      <Header />
      <Box sx={rootBoxSx}>
        <Container maxWidth={false} sx={containerSx}>
          <Box sx={flexBoxSx}>
            <DiagramEditor
              diagramCode={diagramCode}
              setDiagramCode={setDiagramCode}
              sx={editorPaperSx}
            />
            <DiagramPreviewPanel
              diagramCode={diagramCode}
              setSvgContent={setSvgContent}
              sx={previewPaperSx}
            />
          </Box>
        </Container>
        {!chatOpen && (
          <ChatButton sx={chatButtonSx} onClick={() => setChatOpen(true)} />
        )}
        <Drawer
          anchor="right"
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          sx={drawerSx}
        >
          <AIChat
            diagramCode={diagramCode}
            onInsertCode={handleInsertCode}
            onClose={() => setChatOpen(false)}
          />
        </Drawer>
      </Box>
    </>
  );
};

export default Home;

const rootBoxSx = {
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
};

const containerSx = {
  px: { xs: 2, md: 8 },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const flexBoxSx = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: 4,
  minHeight: { md: '70vh' },
  height: { md: 'calc(100vh - 160px)' },
  alignItems: 'stretch',
  justifyContent: 'center',
  overflow: 'hidden',
};

const editorPaperSx = {
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
};

const previewPaperSx = (theme: any) => ({
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
});

const chatButtonSx = {
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
  },
};

const drawerSx = {
  '& .MuiDrawer-paper': {
    width: { xs: '100%', sm: 400 },
    boxSizing: 'border-box',
  },
};

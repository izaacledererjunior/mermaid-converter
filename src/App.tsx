import React, { useState } from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import DiagramInput from './components/Input/DiagramInput';
import DiagramPreview from './components/Preview/DiagramPreview';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Importa o tema ajustado
import { Header } from './components/Header/Header'; // Importa o Header

const App: React.FC = () => {
  const [diagramCode, setDiagramCode] = useState<string>(
    `graph TD
    A[Start] --> B{Decision?}
    B -->|Yes| C[Do something]
    B -->|No| D[Stop]
    C --> A`
  );
  const [svgContent, setSvgContent] = useState<string | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '90vh',
          height: '90vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            {/* Editor */}
            <Paper
              sx={{
                flex: 1,
                p: 2,
                bgcolor: 'background.paper',
                border: '1px solid #4F4F4F', // Borda mais contrastante
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                mb: { xs: 2, md: 0 },
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

            {/* Pré-visualização */}
            <Paper
              sx={{
                flex: 1,
                p: 2,
                bgcolor: 'background.paper',
                border: '1px solid #4F4F4F', // Borda mais contrastante
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 0,
                height: '100%',
                overflow: 'auto',
              }}
            >
              <Typography variant="h5" color="text.primary" gutterBottom>
                Pré-visualização
              </Typography>
              <DiagramPreview
                diagramCode={diagramCode} setSvgContent={setSvgContent} />
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;

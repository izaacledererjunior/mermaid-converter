import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0056B3', // Azul real para botões primários
    },
    secondary: {
      main: '#8A2BE2', // Roxo vibrante para links e destaques
    },
    background: {
      default: '#1F1F1F', // Fundo cinza mais escuro
      paper: '#292929', // Fundo escuro para papéis
    },
    text: {
      primary: '#FFFFFF', // Texto branco
      secondary: '#B0B0B0', // Texto cinza claro para menos destaque
    },
    error: {
      main: '#FF0000', // Vermelho vibrante para mensagens de erro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontSize: '2.5rem',
      '@media (min-width:1200px)': {
        fontSize: '3rem', // Ajuste para desktops grandes
      },
    },
    h5: {
      fontSize: '1.5rem',
    },
    button: {
      textTransform: 'none', // Remove transformação para caixa alta em botões
    },
  },
});

export default theme;
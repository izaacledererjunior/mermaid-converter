import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C7A89', // Cinza suave para botões primários
    },
    secondary: {
      main: '#BFC9CA', // Gelo suave para destaques
    },
    background: {
      default: '#F7F9FA', // Quase branco, muito suave
      paper: '#FFFFFF',   // Branco puro para cards/papéis
    },
    text: {
      primary: '#2C3E50', // Cinza escuro para contraste suave
      secondary: '#7B8A8B', // Cinza claro para menos destaque
    },
    error: {
      main: '#E57373', // Vermelho suave para mensagens de erro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontSize: '2.5rem',
      '@media (min-width:1200px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;

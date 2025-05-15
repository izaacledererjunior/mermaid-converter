import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import mermaidLogoSrc from '../../../assets/mermaid.svg';
import { useTheme } from '../../context/ThemeContext';

export const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
      }}
    >
      <Box>
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={mermaidLogoSrc}
            alt="Mermaid Logo"
            style={{
              height: '50px',
              width: '50px',
            }}
          />
        </a>
      </Box>

      <Box>
        <Typography
          variant="h5"
          color="text.primary"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Mermaid Editor
        </Typography>
      </Box>

      <Box>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label="toggle theme"
          title={darkMode ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );
};

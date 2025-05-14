import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import Logo from '../../assets/logo.png'


export const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 2,
        px: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderBottom: '1px solid #4F4F4F', // Borda mais contrastante
        boxShadow: 1,
      }}
    >
      {/* <Logo /> */}
      <Typography
        variant="h5"
        color="text.primary"
        sx={{
          marginLeft: 2,
          fontWeight: 'bold',
        }}
      >
        Conversor Mermaid
      </Typography>
    </Box>
  )

}

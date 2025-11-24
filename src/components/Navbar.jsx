// components/Navbar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { navbarStyles } from '../styles/Navbar.styles';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = navbarStyles(theme);

  const menuItems = ['Inicio', 'Generar', 'Verificar', 'Decodificar'];

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={styles.logo}>
           
        </Typography>

        {/* Menu Items - Como en la imagen */}
        <Box sx={styles.menuContainer}>
          {menuItems.map((item) => (
            <Typography 
              key={item}
              sx={{
                ...styles.menuItem,
                fontWeight: item === 'Inicio' ? 'bold' : 'normal',
                color: item === 'Inicio' ? 'primary.main' : 'text.primary',
                borderBottom: item === 'Inicio' ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
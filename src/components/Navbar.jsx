// components/Navbar.jsx
import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { navbarStyles } from "../styles/Navbar.styles"

const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const styles = navbarStyles(theme)

  const menuItems = ["Inicio", "Generar", "Verificar", "Decodificar"]

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={styles.logo}>
          🔐 JWT Tool
        </Typography>

        {/* Menu Items - Como en la imagen */}
        <Box sx={styles.menuContainer}>
          {menuItems.map((item) => (
            <Typography
              key={item}
              sx={{
                ...styles.menuItem,
                fontWeight: item === "Inicio" ? 700 : 500,
                color: item === "Inicio" ? "white" : "text.primary",
                background:
                  item === "Inicio"
                    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    : "transparent",
                boxShadow:
                  item === "Inicio"
                    ? `0 4px 12px ${theme.palette.primary.main}40`
                    : "none",
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

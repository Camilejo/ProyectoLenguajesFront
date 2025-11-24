// components/Footer.jsx
import React from "react"
import {
  Box,
  Container,
  Typography,
  useTheme,
  Stack,
  Divider,
} from "@mui/material"
import { footerStyles } from "../styles/Footer.styles"
import SchoolIcon from "@mui/icons-material/School"
import GroupIcon from "@mui/icons-material/Group"

const Footer = () => {
  const theme = useTheme()
  const styles = footerStyles(theme)

  return (
    <Box sx={styles.footer}>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center">
          {/* Universidad */}
          <Box sx={styles.section}>
            <SchoolIcon sx={styles.icon} />
            <Typography variant="h6" sx={styles.universityName}>
              UPTC
            </Typography>
          </Box>

          {/* Materia */}
          <Typography variant="body1" sx={styles.subject}>
            Lenguajes Formales
          </Typography>

          <Divider sx={styles.divider} />

          {/* Integrantes */}
          <Box sx={styles.section}>
            <GroupIcon sx={styles.icon} />
            <Typography variant="subtitle1" sx={styles.integratesTitle}>
              Integrantes:
            </Typography>
          </Box>

          <Stack spacing={1} alignItems="center">
            <Typography variant="body2" sx={styles.memberName}>
              Camilo Colón
            </Typography>
            <Typography variant="body2" sx={styles.memberName}>
              Jhon Jaime
            </Typography>
          </Stack>

          {/* Copyright */}
          <Typography variant="caption" sx={styles.copyright}>
            © 2025 JWT Token Manager
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer

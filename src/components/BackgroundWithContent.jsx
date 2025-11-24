// components/BackgroundWithContent.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { backgroundStyles, cardStyles } from '../styles/BackgronundWithContent.styles';

const BackgroundWithContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = backgroundStyles(theme);
  const cardStylesObj = cardStyles(theme);
  
  const [activeViews, setActiveViews] = useState({
    generar: false,
    verificar: false,
    decodificar: false
  });

  const tableData = [
    { parameter: 'alg', value: 'HS256', description: 'Algoritmo de firma' },
    { parameter: 'typ', value: 'JWT', description: 'Tipo de token' },
    { parameter: 'iss', value: 'auth-server', description: 'Emisor' },
    { parameter: 'exp', value: '1735689600', description: 'Tiempo de expiración' },
  ];

  const handleToggleView = (component) => {
    setActiveViews(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  return (
    <Box sx={styles.backgroundContainer}>
      <Box sx={styles.contentContainer}>
        {/* Header Section */}
        <Box sx={styles.headerSection}>
          <Typography variant="h3" sx={styles.mainTitle}>
           JWT Tool
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
            Generador y verificador de tokens JWT
          </Typography>
        </Box>

        {/* Main Grid Layout */}
        <Box sx={styles.mainGrid}>
          {/* Left Column - Grande */}
          <Box sx={styles.leftColumn}>
            {/* Tu card grande aquí */}
            <Card sx={cardStylesObj.mainCard}>
              <CardContent sx={cardStylesObj.mainCardContent}>
                <Typography variant="h6" sx={cardStylesObj.cardHeader}>
                  Inicio
                </Typography>
                <TextField
                  multiline
                  rows={isMobile ? 8 : 16}
                  placeholder="Pega tu JWT aquí..."
                  variant="outlined"
                  fullWidth
                  sx={cardStylesObj.textField}
                />
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - 3 pequeños */}
          <Box sx={styles.rightColumn}>
            {/* Card 1 - Generar */}
            <Card sx={{...cardStylesObj.sideCard, ...cardStylesObj.tallCard}}>
              <CardContent sx={cardStylesObj.sideCardContent}>
                <Box sx={cardStylesObj.cardHeaderWithButton}>
                  <Typography variant="h6">
                    Payload
                  </Typography>
                  <IconButton 
                    size="small" 
                    sx={cardStylesObj.swapButton}
                    onClick={() => handleToggleView('generar')}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>
                
                <Box sx={cardStylesObj.flipContainer}>
                  <Box 
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.generar ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      opacity: activeViews.generar ? 0 : 1
                    }}
                  >
                    <TextField
                      multiline
                      rows={isMobile ? 4 : 6}
                      placeholder="Configuración para generar JWT..."
                      variant="outlined"
                      fullWidth
                      sx={cardStylesObj.sideTextField}
                    />
                  </Box>

                  <Box 
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.generar ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                      opacity: activeViews.generar ? 1 : 0
                    }}
                  >
                    <TableContainer sx={cardStylesObj.tableContainer}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableHeader}>Parámetro</TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>Valor</TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>Descripción</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell sx={cardStylesObj.tableCell}>{row.parameter}</TableCell>
                              <TableCell sx={cardStylesObj.tableCell}>{row.value}</TableCell>
                              <TableCell sx={cardStylesObj.tableCell}>{row.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Card 2 - Verificar */}
            <Card sx={{...cardStylesObj.sideCard, ...cardStylesObj.mediumCard}}>
              <CardContent sx={cardStylesObj.sideCardContent}>
                <Box sx={cardStylesObj.cardHeaderWithButton}>
                  <Typography variant="h6">
                    Header
                  </Typography>
                  <IconButton 
                    size="small" 
                    sx={cardStylesObj.swapButton}
                    onClick={() => handleToggleView('verificar')}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>
                
                <Box sx={cardStylesObj.flipContainer}>
                  <Box 
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.verificar ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      opacity: activeViews.verificar ? 0 : 1
                    }}
                  >
                    <TextField
                      multiline
                      rows={isMobile ? 3 : 4}
                      placeholder="Token a verificar..."
                      variant="outlined"
                      fullWidth
                      sx={cardStylesObj.sideTextField}
                    />
                  </Box>

                  <Box 
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.verificar ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                      opacity: activeViews.verificar ? 1 : 0
                    }}
                  >
                    <TableContainer sx={cardStylesObj.tableContainer}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableHeader}>Verificación</TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>Estado</TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>Detalles</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableCell}>Firma</TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>✅ Válida</TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>HMAC verificada</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableCell}>Expiración</TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>✅ Vigente</TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>Expira en 2h</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Card 3 - Decodificar */}
            <Card sx={{...cardStylesObj.sideCard, ...cardStylesObj.shortCard}}>
              <CardContent sx={cardStylesObj.sideCardContent}>
                <Box sx={cardStylesObj.cardHeaderWithButton}>
                  <Typography variant="h6">
                    Signature
                  </Typography>
                  <IconButton 
                    size="small" 
                    sx={cardStylesObj.swapButton}
                    onClick={() => handleToggleView('decodificar')}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>
                
                <Box sx={cardStylesObj.flipContainer}>
                  <Box 
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.decodificar ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      opacity: activeViews.decodificar ? 0 : 1
                    }}
                  >
                    <TextField
                      multiline
                      rows={isMobile ? 2 : 3}
                      placeholder="Token a decodificar..."
                      variant="outlined"
                      fullWidth
                      sx={cardStylesObj.sideTextField}
                    />
                  </Box>

                  <Box 
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.decodificar ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                      opacity: activeViews.decodificar ? 1 : 0
                    }}
                  >
                    <TableContainer sx={cardStylesObj.tableContainer}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableHeader}>Header</TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>Payload</TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>Signature</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableCell}>{"{alg: HS256}"}</TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>{"{user: admin}"}</TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>verified</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BackgroundWithContent;
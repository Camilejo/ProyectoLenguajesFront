// components/BackgroundWithContent.jsx
import React, { useState } from "react"
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
  Button,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import SendIcon from "@mui/icons-material/Send"
import LockIcon from "@mui/icons-material/Lock"
import VerifiedIcon from "@mui/icons-material/Verified"
import CodeIcon from "@mui/icons-material/Code"
import DataObjectIcon from "@mui/icons-material/DataObject"
import FingerprintIcon from "@mui/icons-material/Fingerprint"
import ArticleIcon from "@mui/icons-material/Article"
import SecurityIcon from "@mui/icons-material/Security"
import {
  backgroundStyles,
  cardStyles,
} from "../styles/BackgronundWithContent.styles"
import { useJWT } from "../hooks/useJWT"

const BackgroundWithContent = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const styles = backgroundStyles(theme)
  const cardStylesObj = cardStyles(theme)

  // Hook JWT
  const {
    generateToken,
    verifyToken,
    decodeToken,
    token,
    loading,
    error,
    verificationResult,
    decodedData,
  } = useJWT()

  const [activeViews, setActiveViews] = useState({
    generar: false,
    verificar: false,
    decodificar: false,
  })

  // Estados para los campos
  const [jwtInput, setJwtInput] = useState("")
  const [payloadInput, setPayloadInput] = useState(
    '{"sub": "user123", "name": "John Doe", "role": "admin"}'
  )
  const [headerData, setHeaderData] = useState(null)
  const [payloadData, setPayloadData] = useState(null)
  const [signatureData, setSignatureData] = useState(null)

  const handleToggleView = (component) => {
    setActiveViews((prev) => ({
      ...prev,
      [component]: !prev[component],
    }))
  }

  // Generar token
  const handleGenerateToken = async () => {
    try {
      const payloadObj = JSON.parse(payloadInput)
      const result = await generateToken(payloadObj)
      if (result.success) {
        setJwtInput(result.token)
        // Decodificar automáticamente para mostrar header y payload
        await handleDecodeToken(result.token)
      }
    } catch (err) {
      alert("Error: El payload debe ser un JSON válido")
    }
  }

  // Verificar token
  const handleVerifyToken = async () => {
    if (!jwtInput.trim()) {
      alert("Por favor ingresa un token JWT")
      return
    }
    const result = await verifyToken(jwtInput)

    // Debug: Ver qué estructura tiene el resultado
    console.log("Resultado de verificación:", result)

    if (result.success) {
      // Si el backend devuelve datos completos del token, mostrarlos
      if (result.data && result.data.datos) {
        const { header, payload, signature } = result.data.datos

        // Actualizar las tarjetas con la información del token verificado
        setHeaderData(header || null)
        setPayloadData(payload || null)
        setSignatureData(signature || "verified")
      } else {
        // Si no hay datos del backend, decodificar localmente
        await handleDecodeToken(jwtInput)
      }
    }
  }

  // Decodificar token
  const handleDecodeToken = async (tokenToUse = null) => {
    const tokenToDecode = tokenToUse || jwtInput
    if (!tokenToDecode.trim()) {
      alert("Por favor ingresa un token JWT")
      return
    }

    const result = await decodeToken(tokenToDecode)
    if (result.success && result.data) {
      setHeaderData(result.data.header || null)
      setPayloadData(result.data.payload || null)
      setSignatureData(result.data.signature || "verified")
    }
  }

  return (
    <Box sx={styles.backgroundContainer}>
      <Box sx={styles.contentContainer}>
        {/* Header Section */}
        <Box sx={styles.headerSection}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <LockIcon
              sx={{
                fontSize: 48,
                color: theme.palette.primary.main,
                mt: 0.5, // Pequeño ajuste para alinear con el texto
              }}
            />
            <Typography
              variant="h3"
              sx={{
                ...styles.mainTitle,
                mb: 0, // Eliminar el margin bottom del título
              }}
            >
              JWT Token Manager
            </Typography>
          </Box>
          <Typography variant="body1" sx={styles.subtitle}>
            Herramienta profesional para generar, verificar y decodificar tokens
            JWT de forma segura
          </Typography>
        </Box>

        {/* Main Grid Layout */}
        <Box sx={styles.mainGrid}>
          {/* Left Column - Grande */}
          <Box sx={styles.leftColumn}>
            {/* Tu card grande aquí */}
            <Card sx={cardStylesObj.mainCard}>
              <CardContent sx={cardStylesObj.mainCardContent}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                    pb: 1.5,
                    borderBottom: `2px solid ${theme.palette.primary.main}20`,
                  }}
                >
                  <SecurityIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 28 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      m: 0,
                    }}
                  >
                    JWT Token
                  </Typography>
                </Box>
                <TextField
                  multiline
                  rows={isMobile ? 8 : 14}
                  placeholder="Pega tu token JWT aquí para analizarlo...

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  variant="outlined"
                  fullWidth
                  value={jwtInput}
                  onChange={(e) => setJwtInput(e.target.value)}
                  sx={cardStylesObj.textField}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <SendIcon />
                    }
                    onClick={handleVerifyToken}
                    disabled={loading || !jwtInput.trim()}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      },
                    }}
                  >
                    Verificar Token
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleDecodeToken()}
                    disabled={loading || !jwtInput.trim()}
                  >
                    Decodificar
                  </Button>
                </Box>

                {/* Mensajes de error o éxito */}
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
                {verificationResult && !error && (
                  <Alert
                    severity={verificationResult.valid ? "success" : "warning"}
                    sx={{ mt: 2 }}
                  >
                    {verificationResult.valid ? (
                      <Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <VerifiedIcon
                            sx={{ color: "success.main", fontSize: 18 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", mb: 0.5 }}
                          >
                            Token válido y verificado
                          </Typography>
                        </Box>
                        {(() => {
                          // Buscar exp en diferentes ubicaciones posibles
                          let exp = null

                          if (verificationResult.datos) {
                            // Buscar en datos.exp (cadena ISO del backend)
                            exp = verificationResult.datos.exp

                            // Si no está ahí, buscar en datos.payload.exp (número timestamp)
                            if (!exp && verificationResult.datos.payload) {
                              exp = verificationResult.datos.payload.exp
                            }
                          }

                          if (exp) {
                            let fechaExpiracion = null

                            // Si es una cadena ISO (formato: "2024-11-23T10:00:00.000Z")
                            if (typeof exp === "string") {
                              fechaExpiracion = new Date(exp)
                            }
                            // Si es un timestamp numérico (segundos desde epoch)
                            else if (typeof exp === "number") {
                              fechaExpiracion = new Date(exp * 1000)
                            }

                            // Verificar que la fecha sea válida
                            if (
                              fechaExpiracion &&
                              !isNaN(fechaExpiracion.getTime())
                            ) {
                              return (
                                <Typography
                                  variant="caption"
                                  sx={{ display: "block" }}
                                >
                                  Expira:{" "}
                                  {fechaExpiracion.toLocaleString("es-ES", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  })}
                                </Typography>
                              )
                            }
                          }

                          return null
                        })()}
                        {verificationResult.datos &&
                          verificationResult.datos.esNuestroToken && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 0.5,
                              }}
                            >
                              <LockIcon
                                sx={{ color: "success.dark", fontSize: 16 }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ display: "block", color: "success.dark" }}
                              >
                                Token firmado con nuestra clave secreta
                              </Typography>
                            </Box>
                          )}
                      </Box>
                    ) : (
                      <Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", mb: 0.5 }}
                          >
                            {verificationResult.mensaje ||
                              "Token inválido o expirado"}
                          </Typography>
                        </Box>
                        {verificationResult.razon && (
                          <Typography
                            variant="caption"
                            sx={{ display: "block" }}
                          >
                            {verificationResult.razon}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - 3 pequeños */}
          <Box sx={styles.rightColumn}>
            {/* Card 1 - Generar */}
            <Card sx={{ ...cardStylesObj.sideCard, ...cardStylesObj.tallCard }}>
              <CardContent sx={cardStylesObj.sideCardContent}>
                <Box sx={cardStylesObj.cardHeaderWithButton}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DataObjectIcon
                      sx={{ color: theme.palette.success.main, fontSize: 20 }}
                    />
                    <Typography variant="h6">Payload</Typography>
                  </Box>
                  <IconButton
                    size="small"
                    sx={cardStylesObj.swapButton}
                    onClick={() => handleToggleView("generar")}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>

                <Box sx={cardStylesObj.flipContainer}>
                  <Box
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.generar
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      opacity: activeViews.generar ? 0 : 1,
                    }}
                  >
                    <TextField
                      multiline
                      rows={isMobile ? 3 : 4}
                      placeholder='{"sub": "user123", "name": "John Doe", "role": "admin"}'
                      variant="outlined"
                      fullWidth
                      value={payloadInput}
                      onChange={(e) => setPayloadInput(e.target.value)}
                      sx={cardStylesObj.sideTextField}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      startIcon={
                        loading ? <CircularProgress size={16} /> : <SendIcon />
                      }
                      onClick={handleGenerateToken}
                      disabled={loading}
                      sx={{
                        mt: 1,
                        background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
                        },
                      }}
                    >
                      Generar Token
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.generar
                        ? "rotateY(0deg)"
                        : "rotateY(-180deg)",
                      opacity: activeViews.generar ? 1 : 0,
                    }}
                  >
                    <TableContainer sx={cardStylesObj.tableContainer}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableHeader}>
                              Parámetro
                            </TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>
                              Valor
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {payloadData &&
                            Object.entries(payloadData).map(([key, value]) => {
                              // Formatear valores especiales
                              let displayValue = value

                              // Si es un timestamp (iat, exp, nbf), convertir a fecha legible
                              if (
                                (key === "iat" ||
                                  key === "exp" ||
                                  key === "nbf") &&
                                typeof value === "number"
                              ) {
                                const date = new Date(value * 1000)
                                displayValue = `${value} (${date.toLocaleString(
                                  "es-ES",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  }
                                )})`
                              } else if (typeof value === "object") {
                                displayValue = JSON.stringify(value, null, 2)
                              } else {
                                displayValue = String(value)
                              }

                              return (
                                <TableRow key={key}>
                                  <TableCell sx={cardStylesObj.tableCell}>
                                    <strong>{key}</strong>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      ...cardStylesObj.tableCell,
                                      fontFamily:
                                        key === "iat" ||
                                        key === "exp" ||
                                        key === "nbf"
                                          ? "monospace"
                                          : "inherit",
                                      whiteSpace: "pre-wrap",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {displayValue}
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          {!payloadData && (
                            <TableRow>
                              <TableCell
                                colSpan={2}
                                sx={{
                                  ...cardStylesObj.tableCell,
                                  textAlign: "center",
                                }}
                              >
                                Genera o decodifica un token para ver datos
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Card 2 - Verificar */}
            <Card
              sx={{ ...cardStylesObj.sideCard, ...cardStylesObj.mediumCard }}
            >
              <CardContent sx={cardStylesObj.sideCardContent}>
                <Box sx={cardStylesObj.cardHeaderWithButton}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ArticleIcon
                      sx={{ color: theme.palette.info.main, fontSize: 20 }}
                    />
                    <Typography variant="h6">Header</Typography>
                  </Box>
                  <IconButton
                    size="small"
                    sx={cardStylesObj.swapButton}
                    onClick={() => handleToggleView("verificar")}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>

                <Box sx={cardStylesObj.flipContainer}>
                  <Box
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.verificar
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      opacity: activeViews.verificar ? 0 : 1,
                    }}
                  >
                    <TextField
                      multiline
                      rows={isMobile ? 3 : 4}
                      placeholder='{"alg": "HS256", "typ": "JWT"}'
                      variant="outlined"
                      fullWidth
                      value={
                        headerData ? JSON.stringify(headerData, null, 2) : ""
                      }
                      InputProps={{ readOnly: true }}
                      sx={cardStylesObj.sideTextField}
                    />
                  </Box>

                  <Box
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.verificar
                        ? "rotateY(0deg)"
                        : "rotateY(-180deg)",
                      opacity: activeViews.verificar ? 1 : 0,
                    }}
                  >
                    <TableContainer sx={cardStylesObj.tableContainer}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableHeader}>
                              Campo
                            </TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>
                              Valor
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {headerData &&
                            Object.entries(headerData).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell sx={cardStylesObj.tableCell}>
                                  {key}
                                </TableCell>
                                <TableCell sx={cardStylesObj.tableCell}>
                                  {String(value)}
                                </TableCell>
                              </TableRow>
                            ))}
                          {!headerData && (
                            <TableRow>
                              <TableCell
                                colSpan={2}
                                sx={{
                                  ...cardStylesObj.tableCell,
                                  textAlign: "center",
                                }}
                              >
                                Decodifica un token para ver el header
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Card 3 - Decodificar */}
            <Card
              sx={{ ...cardStylesObj.sideCard, ...cardStylesObj.shortCard }}
            >
              <CardContent sx={cardStylesObj.sideCardContent}>
                <Box sx={cardStylesObj.cardHeaderWithButton}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FingerprintIcon
                      sx={{ color: theme.palette.warning.main, fontSize: 20 }}
                    />
                    <Typography variant="h6">Signature</Typography>
                  </Box>
                  <IconButton
                    size="small"
                    sx={cardStylesObj.swapButton}
                    onClick={() => handleToggleView("decodificar")}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>

                <Box sx={cardStylesObj.flipContainer}>
                  <Box
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.decodificar
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      opacity: activeViews.decodificar ? 0 : 1,
                    }}
                  >
                    <TextField
                      multiline
                      rows={isMobile ? 2 : 3}
                      placeholder="Firma verificada"
                      variant="outlined"
                      fullWidth
                      value={
                        signatureData
                          ? `${signatureData}`
                          : "Esperando verificación..."
                      }
                      InputProps={{ readOnly: true }}
                      sx={cardStylesObj.sideTextField}
                    />
                  </Box>

                  <Box
                    sx={{
                      ...cardStylesObj.flipContent,
                      transform: activeViews.decodificar
                        ? "rotateY(0deg)"
                        : "rotateY(-180deg)",
                      opacity: activeViews.decodificar ? 1 : 0,
                    }}
                  >
                    <TableContainer sx={cardStylesObj.tableContainer}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableHeader}>
                              Estado
                            </TableCell>
                            <TableCell sx={cardStylesObj.tableHeader}>
                              Resultado
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableCell}>
                              Firma
                            </TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>
                              {signatureData || "No verificada"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={cardStylesObj.tableCell}>
                              Algoritmo
                            </TableCell>
                            <TableCell sx={cardStylesObj.tableCell}>
                              {headerData?.alg || "N/A"}
                            </TableCell>
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
  )
}

export default BackgroundWithContent

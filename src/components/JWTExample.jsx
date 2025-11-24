// components/JWTExample.jsx
// Componente de ejemplo que muestra cómo usar el hook useJWT

import React, { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material"
import { useJWT } from "../hooks/useJWT"

/**
 * Componente de ejemplo para demostrar el uso del hook useJWT
 *
 * Para usarlo, importa este componente en tu App.jsx:
 * import JWTExample from './components/JWTExample';
 *
 * Y agrégalo en el JSX:
 * <JWTExample />
 */
const JWTExample = () => {
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

  const [payload, setPayload] = useState(
    '{"sub": "user123", "name": "John Doe", "role": "admin"}'
  )
  const [tokenToVerify, setTokenToVerify] = useState("")

  const handleGenerate = async () => {
    try {
      const payloadObj = JSON.parse(payload)
      await generateToken(payloadObj)
    } catch (err) {
      alert("Error: El payload debe ser un JSON válido")
    }
  }

  const handleVerify = async () => {
    if (!tokenToVerify.trim()) {
      alert("Por favor ingresa un token para verificar")
      return
    }
    await verifyToken(tokenToVerify)
  }

  const handleDecode = async () => {
    if (!tokenToVerify.trim()) {
      alert("Por favor ingresa un token para decodificar")
      return
    }
    await decodeToken(tokenToVerify)
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Ejemplo de Uso - JWT Manager
      </Typography>

      <Stack spacing={3}>
        {/* Sección 1: Generar Token */}
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              1. Generar Token JWT
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Payload (JSON)"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder='{"sub": "user123", "name": "John Doe"}'
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Generar Token"}
            </Button>

            {token && (
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ wordBreak: "break-all", fontFamily: "monospace" }}
                >
                  <strong>Token generado:</strong>
                  <br />
                  {token}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Sección 2: Verificar/Decodificar Token */}
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              2. Verificar o Decodificar Token
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Token JWT"
              value={tokenToVerify}
              onChange={(e) => setTokenToVerify(e.target.value)}
              placeholder="Pega tu token JWT aquí..."
              sx={{ mb: 2 }}
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleVerify}
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : "Verificar"}
              </Button>

              <Button
                variant="outlined"
                onClick={handleDecode}
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : "Decodificar"}
              </Button>
            </Stack>

            {verificationResult && (
              <Alert
                severity={verificationResult.valid ? "success" : "error"}
                sx={{ mt: 2 }}
              >
                <Typography variant="body2">
                  <strong>Resultado de verificación:</strong>
                  <br />
                  {JSON.stringify(verificationResult, null, 2)}
                </Typography>
              </Alert>
            )}

            {decodedData && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  <strong>Token decodificado:</strong>
                  <br />
                  <pre>{JSON.stringify(decodedData, null, 2)}</pre>
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Errores */}
        {error && (
          <Alert severity="error">
            <Typography variant="body2">
              <strong>Error:</strong> {error}
            </Typography>
          </Alert>
        )}

        {/* Información de ayuda */}
        <Card
          elevation={1}
          sx={{ bgcolor: "info.light", color: "info.contrastText" }}
        >
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              💡 Cómo funciona:
            </Typography>
            <Typography variant="body2">
              1. Este componente usa el hook <code>useJWT</code> que maneja toda
              la lógica
              <br />
              2. El hook llama al servicio <code>api.js</code> que hace las
              peticiones HTTP
              <br />
              3. Las URLs del backend se configuran en el archivo{" "}
              <code>.env</code>
              <br />
              4. Revisa <code>QUICK_START.md</code> para más detalles
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default JWTExample

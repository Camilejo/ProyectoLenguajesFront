// App.js
import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import BackgroundWithContent from "./components/BackgroundWithContent"
import Footer from "./components/Footer"
import { appTheme } from "./styles/theme"

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BackgroundWithContent />
      <Footer />
    </ThemeProvider>
  )
}

export default App

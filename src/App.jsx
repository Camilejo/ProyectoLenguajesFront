// App.js
import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Navbar from "./components/Navbar"
import BackgroundWithContent from "./components/BackgroundWithContent"
import Footer from "./components/Footer"
import { appTheme } from "./styles/theme"

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Navbar />
      <BackgroundWithContent />
      <Footer />
    </ThemeProvider>
  )
}

export default App

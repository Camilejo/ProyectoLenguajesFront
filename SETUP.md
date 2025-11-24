# 🔐 JWT Token Manager - Frontend

Herramienta profesional y moderna para generar, verificar y decodificar tokens JWT de forma segura. Interfaz de usuario elegante construida con React, Material-UI y Vite.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante con gradientes y animaciones suaves
- 🔄 **Gestión Completa de JWT**: Genera, verifica y decodifica tokens
- 📱 **Responsive**: Adaptado para móviles, tablets y desktop
- ⚡ **Rápido**: Construido con Vite para desarrollo y builds ultrarrápidos
- 🎯 **API Centralizada**: Servicio unificado para todas las llamadas al backend
- 🔧 **Configurable**: Variables de entorno para fácil configuración

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. **Clona el repositorio**

```bash
git clone <tu-repositorio>
cd otis-kit-app
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto (o copia `.env.example`):

```env
# Configuración del Backend API
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Rutas específicas del API
VITE_API_GENERATE_TOKEN=/api/generar-token
VITE_API_VERIFY_TOKEN=/api/verificar-token
VITE_API_DECODE_TOKEN=/api/decodificar-token
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎯 Uso del Sistema

### Configuración del Backend

El frontend está diseñado para conectarse automáticamente al backend usando las variables de entorno del archivo `.env`:

```javascript
// Las rutas se configuran automáticamente desde .env
import { generateToken, verifyToken, decodeToken } from "./services/api"

// Ejemplo de uso
const result = await generateToken({
  sub: "user123",
  name: "John Doe",
  role: "admin",
})
```

### Variables de Entorno

| Variable                  | Descripción                      | Valor por Defecto        |
| ------------------------- | -------------------------------- | ------------------------ |
| `VITE_API_URL`            | URL base del backend             | `http://localhost:3000`  |
| `VITE_API_TIMEOUT`        | Timeout de peticiones (ms)       | `10000`                  |
| `VITE_API_GENERATE_TOKEN` | Endpoint para generar tokens     | `/api/generar-token`     |
| `VITE_API_VERIFY_TOKEN`   | Endpoint para verificar tokens   | `/api/verificar-token`   |
| `VITE_API_DECODE_TOKEN`   | Endpoint para decodificar tokens | `/api/decodificar-token` |

### Servicio de API

El proyecto incluye un servicio centralizado en `src/services/api.js` que maneja todas las comunicaciones con el backend:

```javascript
import api from "./services/api"

// Generar token
const { success, data, error } = await api.generateToken(payload)

// Verificar token
const result = await api.verifyToken(tokenString)

// Decodificar token
const decoded = await api.decodeToken(tokenString)

// Obtener configuración
const config = api.getApiConfig()
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
```

## 🏗️ Estructura del Proyecto

```
otis-kit-app/
├── src/
│   ├── assets/              # Recursos estáticos
│   ├── components/          # Componentes de React
│   │   ├── BackgroundWithContent.jsx
│   │   └── Navbar.jsx
│   ├── services/            # Servicios de API
│   │   └── api.js          # ⭐ Servicio centralizado
│   ├── styles/              # Estilos y tema
│   │   ├── BackgronundWithContent.styles.js
│   │   ├── Navbar.styles.js
│   │   └── theme.js
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── .env                     # ⭐ Variables de entorno
├── .env.example             # Ejemplo de configuración
├── package.json
└── vite.config.js
```

## 🎨 Personalización

### Cambiar Colores del Tema

Edita `src/styles/theme.js`:

```javascript
export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Cambia este color
      // ...
    },
    // ...
  },
})
```

### Cambiar URL del Backend

Simplemente actualiza el archivo `.env`:

```env
VITE_API_URL=https://tu-api.com
```

## 🔧 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **Material-UI (MUI) 7** - Componentes y estilos
- **Vite 7** - Build tool y dev server
- **Emotion** - CSS-in-JS
- **ESLint** - Linter de código

## 📝 Conexión con el Backend

Para conectar con tu backend:

1. **Asegúrate de que el backend esté corriendo** (generalmente en puerto 3000)

2. **Configura CORS en tu backend** (Express ejemplo):

```javascript
import cors from "cors"
app.use(
  cors({
    origin: "http://localhost:5173", // Puerto de Vite
  })
)
```

3. **Verifica las rutas en el `.env`** coincidan con tu backend

4. **Prueba la conexión** desde el navegador usando las herramientas de desarrollo

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

### Variables de Entorno en Producción

Recuerda configurar las variables de entorno en tu plataforma de hosting (Vercel, Netlify, etc.):

```env
VITE_API_URL=https://tu-api-produccion.com
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

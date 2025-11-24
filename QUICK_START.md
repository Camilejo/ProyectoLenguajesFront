# 🚀 Guía Rápida de Configuración

## Para configurar el frontend y conectarlo con el backend:

### 1️⃣ Configurar Variables de Entorno

El archivo `.env` ya está creado con los valores por defecto:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
VITE_API_GENERATE_TOKEN=/api/generar-token
VITE_API_VERIFY_TOKEN=/api/verificar-token
VITE_API_DECODE_TOKEN=/api/decodificar-token
```

### 2️⃣ Si tu backend usa rutas diferentes:

Simplemente edita el archivo `.env` con tus rutas:

```env
# Ejemplo si tus rutas son diferentes
VITE_API_URL=http://localhost:4000
VITE_API_GENERATE_TOKEN=/jwt/generate
VITE_API_VERIFY_TOKEN=/jwt/verify
VITE_API_DECODE_TOKEN=/jwt/decode
```

### 3️⃣ Usar el servicio de API en tus componentes:

```javascript
import api from "./services/api"

// En tu componente
const handleGenerate = async () => {
  const result = await api.generateToken({
    sub: "user123",
    name: "John Doe",
  })

  if (result.success) {
    console.log("Token generado:", result.data.token)
  } else {
    console.error("Error:", result.error)
  }
}
```

### 4️⃣ O usar el custom hook (más fácil):

```javascript
import { useJWT } from "./hooks/useJWT"

function MiComponente() {
  const { generateToken, token, loading, error } = useJWT()

  const handleClick = async () => {
    await generateToken({ userId: 123 })
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {token && <p>Token: {token}</p>}
      <button onClick={handleClick}>Generar Token</button>
    </div>
  )
}
```

### 5️⃣ Configurar CORS en tu backend:

Asegúrate de que tu backend Express tenga CORS habilitado:

```javascript
// En tu archivo app.js del backend
import cors from "cors"

app.use(
  cors({
    origin: "http://localhost:5173", // Puerto del frontend Vite
    credentials: true,
  })
)
```

### 6️⃣ Iniciar ambos servidores:

#### Backend:

```bash
cd back
npm start
# Debería correr en http://localhost:3000
```

#### Frontend:

```bash
cd otis-kit-app
npm run dev
# Debería correr en http://localhost:5173
```

### ✅ ¡Listo!

Ahora tu frontend debería conectarse automáticamente al backend usando las rutas configuradas en el archivo `.env`.

---

## 🔧 Cambios Comunes

### Cambiar el puerto del backend:

```env
VITE_API_URL=http://localhost:4000
```

### Usar un backend en producción:

```env
VITE_API_URL=https://mi-api.herokuapp.com
```

### Agregar autenticación:

Modifica el archivo `src/services/api.js` para incluir headers de autenticación:

```javascript
const fetchWithTimeout = async (url, options = {}, timeout = API_TIMEOUT) => {
  // ...
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tu_token}`, // 👈 Agregar aquí
      ...options.headers,
    },
  })
  // ...
}
```

---

## 📞 ¿Problemas?

1. **Error de CORS**: Verifica que el backend tenga CORS habilitado
2. **Error 404**: Verifica que las rutas en `.env` coincidan con las del backend
3. **Backend no responde**: Asegúrate de que esté corriendo en el puerto correcto
4. **Variables de entorno no se cargan**: Reinicia el servidor de desarrollo (Ctrl+C y `npm run dev`)

---

💡 **Tip**: Usa las DevTools del navegador (F12) → Network para ver las peticiones y errores.

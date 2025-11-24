// services/api.js
// Servicio centralizado para todas las llamadas al backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

// Rutas del API
const ENDPOINTS = {
    GENERATE_TOKEN: import.meta.env.VITE_API_GENERATE_TOKEN || '/api/generar-token',
    VERIFY_TOKEN: import.meta.env.VITE_API_VERIFY_TOKEN || '/api/verificar-token',
    DECODE_TOKEN: import.meta.env.VITE_API_DECODE_TOKEN || '/api/decodificar-token',
};

/**
 * Función auxiliar para realizar peticiones HTTP
 */
const fetchWithTimeout = async (url, options = {}, timeout = API_TIMEOUT) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(id);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error('La petición excedió el tiempo de espera');
        }
        throw error;
    }
};

/**
 * Generar un nuevo token JWT
 * @param {Object} payload - Datos para incluir en el token
 * @returns {Promise<Object>} Token generado
 */
export const generateToken = async (payload) => {
    try {
        const url = `${API_URL}${ENDPOINTS.GENERATE_TOKEN}`;
        const data = await fetchWithTimeout(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        // Tu backend devuelve: { mensaje: "...", token: "..." }
        return { success: true, data };
    } catch (error) {
        console.error('Error al generar token:', error);
        return {
            success: false,
            error: error.message || 'Error al generar el token'
        };
    }
};/**
 * Verificar la validez de un token JWT
 * @param {string} token - Token a verificar
 * @returns {Promise<Object>} Resultado de la verificación
 */
export const verifyToken = async (token) => {
    try {
        const url = `${API_URL}${ENDPOINTS.VERIFY_TOKEN}`;

        // Hacer la petición sin usar fetchWithTimeout porque necesitamos
        // manejar el status 400 como una respuesta válida
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), API_TIMEOUT);

        const response = await fetch(url, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        clearTimeout(id);

        // Parsear el JSON independientemente del status code
        const data = await response.json();

        // El backend devuelve:
        // - status 200 con estado="valido" para tokens válidos
        // - status 400 con estado="invalido" para tokens inválidos/expirados
        // - status 500 para errores del servidor

        if (response.status === 500) {
            throw new Error(data.error || 'Error del servidor');
        }

        // Mapear la respuesta al formato que espera el frontend
        const isValid = data.estado === "valido";

        return {
            success: true,
            data: {
                valid: isValid,
                estado: data.estado,
                mensaje: data.mensaje,
                datos: data.datos,
                error: data.error,
                razon: data.razon
            }
        };
    } catch (error) {
        console.error('Error al verificar token:', error);

        if (error.name === 'AbortError') {
            return {
                success: false,
                error: 'La petición excedió el tiempo de espera'
            };
        }

        return {
            success: false,
            error: error.message || 'Error al verificar el token'
        };
    }
};

/**
 * Decodificar un token JWT sin verificar su firma
 * Decodifica localmente en el frontend (no requiere backend)
 * @param {string} token - Token a decodificar
 * @returns {Promise<Object>} Token decodificado
 */
export const decodeToken = async (token) => {
    try {
        // Decodificar JWT localmente (sin verificar firma)
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Token JWT inválido. Debe tener 3 partes separadas por puntos.');
        }

        // Decodificar Base64URL a JSON
        const decodeBase64Url = (str) => {
            // Reemplazar caracteres URL-safe y agregar padding
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            const pad = base64.length % 4;
            if (pad) {
                base64 += '='.repeat(4 - pad);
            }

            try {
                // Decodificar base64 y convertir a texto UTF-8
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );
                return JSON.parse(jsonPayload);
            } catch {
                throw new Error('Error al decodificar la parte del token');
            }
        };

        const header = decodeBase64Url(parts[0]);
        const payload = decodeBase64Url(parts[1]);
        const signature = parts[2];

        return {
            success: true,
            data: {
                header,
                payload,
                signature,
                mensaje: 'Token decodificado exitosamente (localmente en el navegador)'
            }
        };
    } catch (error) {
        console.error('Error al decodificar token:', error);
        return {
            success: false,
            error: error.message || 'Error al decodificar el token'
        };
    }
};/**
 * Obtener la configuración actual de la API
 * @returns {Object} Configuración de la API
 */
export const getApiConfig = () => ({
    apiUrl: API_URL,
    timeout: API_TIMEOUT,
    endpoints: ENDPOINTS,
});

export default {
    generateToken,
    verifyToken,
    decodeToken,
    getApiConfig,
};

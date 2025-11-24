// hooks/useJWT.js
// Custom hook para manejar operaciones JWT

import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook personalizado para operaciones JWT
 * @returns {Object} Métodos y estados para trabajar con JWT
 */
export const useJWT = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');
    const [decodedData, setDecodedData] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);

    /**
     * Genera un nuevo token JWT
     */
    const handleGenerateToken = useCallback(async (payload) => {
        setLoading(true);
        setError(null);

        try {
            const result = await api.generateToken(payload);

            if (result.success) {
                setToken(result.data.token || '');
                return { success: true, token: result.data.token };
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (err) {
            const errorMessage = 'Error al generar el token';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Verifica un token JWT
     */
    const handleVerifyToken = useCallback(async (tokenToVerify) => {
        setLoading(true);
        setError(null);

        try {
            const result = await api.verifyToken(tokenToVerify);

            if (result.success) {
                setVerificationResult(result.data);
                return { success: true, data: result.data };
            } else {
                setError(result.error);
                setVerificationResult({ valid: false, error: result.error });
                return { success: false, error: result.error };
            }
        } catch (err) {
            const errorMessage = 'Error al verificar el token';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Decodifica un token JWT
     */
    const handleDecodeToken = useCallback(async (tokenToDecode) => {
        setLoading(true);
        setError(null);

        try {
            const result = await api.decodeToken(tokenToDecode);

            if (result.success) {
                setDecodedData(result.data);
                return { success: true, data: result.data };
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (err) {
            const errorMessage = 'Error al decodificar el token';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Limpia todos los estados
     */
    const clearAll = useCallback(() => {
        setToken('');
        setDecodedData(null);
        setVerificationResult(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        // Estados
        loading,
        error,
        token,
        decodedData,
        verificationResult,

        // Métodos
        generateToken: handleGenerateToken,
        verifyToken: handleVerifyToken,
        decodeToken: handleDecodeToken,
        clearAll,
    };
};

export default useJWT;

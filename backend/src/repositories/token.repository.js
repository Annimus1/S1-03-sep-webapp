import CacheSingleton from '../database/CacheSingleton.js';

/**
 * Repositorio encargado de la persistencia de tokens (whitelist) en Redis.
 * Permite agregar, verificar y eliminar tokens de la whitelist para controlar el acceso.
 * Utiliza un prefijo en las claves para evitar colisiones y maneja expiraciones automáticas.
 */
class TokenRepository {
    /**
     * Inicializa el repositorio de tokens con la instancia de caché y el prefijo de clave.
     */
    constructor() {
        this.cache = CacheSingleton;
        this.prefix = 'token_whitelist:'; 
    }

    /**
     * Guarda un token (lo añade a la whitelist) estableciendo una clave en Redis.
     * El token expirará en Redis en el mismo momento que expiraría el token original.
     * @param {string} userId - Identificador único del usuario (por ejemplo, JTI del JWT).
     * @param {string} jwt - El JWT o valor del token a guardar.
     * @param {number} expirationTimeSeconds - El tiempo de vida restante del token (en segundos).
     * @returns {Promise<boolean>} True si la operación fue exitosa, false en caso contrario.
     */
    async whitelistToken(userId, jwt, expirationTimeSeconds=3600) {
        if (expirationTimeSeconds <= 0) {
            return true; 
        }
        const key = this.prefix + userId;
        const value = jwt;
        try {
            const result = await this.cache.set(key, value, expirationTimeSeconds);
            return result === 'OK'; 
        } catch (error) {
            console.error(`Error al añadir token a la whitelist: ${error.message}`);
            return false;
        }
    }

    /**
     * Verifica si un token está en la whitelist de Redis.
     * @param {string} userId - Identificador único del usuario (por ejemplo, JTI del JWT).
     * @returns {Promise<boolean>} True si el token está en la whitelist, false en caso contrario.
     */
    async isTokenWhitelisted(userId, token) {
    const key = this.prefix + userId;
    try {
        const result = await this.cache.get(key);
        return result === token; // verificar que sea exactamente el token
    } catch (error) {
        console.error(`Error al verificar token en la whitelist: ${error.message}`);
        return false;
    }
}


    /**
     * Elimina una clave de token de la whitelist manualmente.
     * Puede usarse para limpiar entradas o revertir una revocación accidental.
     * @param {string} userId - Identificador único del usuario (por ejemplo, JTI del JWT).
     * @returns {Promise<boolean>} True si se eliminó al menos una clave, false en caso contrario.
     */
    async revokeToken(userId, token) {
        const key = this.prefix + userId;
        try {
            const currentToken = await this.cache.get(key);

            if (!currentToken) {
                console.log('No hay token en Redis para este usuario.');
                return false;
            }

            if (currentToken !== token) {
                console.log('El token proporcionado no coincide con el token en Redis.');
                return false; // el token no coincide
            }

            const deletedCount = await this.cache.del(key);
            console.log('DeletedCount:', deletedCount);

            return deletedCount > 0;
        } catch (error) {
            console.error(`Error al eliminar token de la whitelist: ${error.message}`);
            return false;
        }
    }


    /*async revokeToken(userId) {
        const key = this.prefix + userId;
        try {
            const deletedCount = await this.cache.del(key);
            return deletedCount > 0;
        } catch (error) {
            console.error(`Error al eliminar token de la whitelist: ${error.message}`);
            return false;
        }
    }*/
}

export default new TokenRepository();
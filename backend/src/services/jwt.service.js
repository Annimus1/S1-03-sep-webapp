import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

/**
 * Servicio para la gestión de tokens JWT.
 * Permite firmar y verificar tokens utilizando una clave secreta y expiración configurable.
 */
class JWT {

    /**
     * Inicializa el servicio JWT con la clave secreta y el tiempo de expiración.
     * @constructor
     */
    constructor() {
        dotenv.config();

        /**
         * Clave secreta utilizada para firmar y verificar los tokens.
         * @type {string}
         */
        this.secret = process.env.JWT_SECRET;

        /**
         * Tiempo de expiración de los tokens (por defecto: '1h').
         * @type {string}
         */
        this.expiration = '1h';
    }

    /**
     * Firma un nuevo token JWT con el payload proporcionado.
     * @param {Object} payload - Información a incluir en el token.
     * @returns {string} El token JWT firmado.
     * @example
     * const jwtService = new JWT();
     * const token = jwtService.sign({ userId: '123' });
     */
    sign(payload) {
        const result = jwt.sign(payload, this.secret, { expiresIn: this.expiration });
        return result;
    }

    /**
     * Verifica la validez de un token JWT.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object} Un objeto con la propiedad 'success' (boolean) y 'data' (payload decodificado o error).
     * @example
     * const jwtService = new JWT();
     * const result = jwtService.verify(token);
     * if (result.success) {
     *   // Token válido, acceder a result.data
     * } else {
     *   // Token inválido, manejar error
     * }
     */
    verify(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            return {
                success: true,
                data: decoded
            };
        } catch (err) {
            return {
                success: false,
                data: err.name
            };
        }
    }
}

export default JWT;
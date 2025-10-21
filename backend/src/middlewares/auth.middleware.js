import tokenRepository from '../repositories/token.repository.js';
import JWT from '../services/jwt.service.js';

/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth: # arbitrary name for the security scheme
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     security: [{ bearerAuth: [] }]
*/
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'error', message: 'Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Token inválido.' });
    }
    const serviceJWT = new JWT();
    const { success, data } = serviceJWT.verify(token);
    if (!success) {
      return res.status(401).json({ status: 'error', message: 'Token inválido o expirado.' });
    }

    // Revisar whitelist en Redis
    const isWhitelisted = await tokenRepository.isTokenWhitelisted(data.id, token);
    if (!isWhitelisted) {
      return res.status(401).json({ status: 'error', message: 'Token revocado o no autorizado.' });
    }

    // Guardar payload en req.user
    req.user = data;
    req.token = token;
    next();

  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(500).json({ status: 'error', message: 'Error interno en autenticación.' });
  }
};

export const authenticateRole = async (req, res, next) => {
  const id = req.user.id;
  const role = req.user.role;
  const paramId = req.params.id

  if(id == paramId){
    next();
    return;
  }

  if(role == 'asesor'){
    next();
    return;
  }

  res.status(403).send({error:"", message:""});
}

import { Router } from 'express';
import { authController, authLoginController, authLogoutController, authRegisterAdviserController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { validateRegister, validateRegisterAdviser, validationLogin } from '../middlewares/validation.middleware.js';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *      - "Autenticación" 
 *     summary: Crea una cuenta de usuario PYMES.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Creacion una cuenta de usuario PYMES.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID unico del usuario.
 *                       example: "1"
 *                     nombres:
 *                       type: string
 *                       description: Nombres del usuario.
 *                       example: "Jhon Richard"
 *                     appellidos:
 *                       type: string
 *                       description: Apellidos del usuario.
 *                       example: "Doe Smith"
 *                     email:
 *                       type: string
 *                       description: El email del usuario.
 *                       example: "jhondoe05@gmail.com"
 *                     token:
 *                       type: string
 *                       description: JSON web Token.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
 *       400:
 *         description: Ningun dato fue recibido.Email ya registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Verifique que los datos ingresados sean correctos.Email, nombres, apellidos y password son obligatorios."
 *       422:
 *         description: Password invalido.Algun dato requerido no fue enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Datos de registro inválidos."
 *                     errors:
 *                       type: array 
 *                       items:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: string
 *                             description: Campo donde se genero el error.
 *                             example: "password"
 *                           message:
 *                             type: string
 *                             description: Mensaje específico para ese error.
 *                             example: '\"password\" needs 8 or more characters'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Error interno del servidor."
 * 
*/
router.post('/register', validateRegister, authController);

/**
 * @swagger
 * /auth/register-adviser:
 *   post:
 *     tags:
 *      - "Autenticación" 
 *     summary: Crea una cuenta de asesor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro-asesor'
 *     responses:
 *       201:
 *         description: Creacion de cuenta asesor exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID unico del usuario.
 *                       example: "1"
 *                     nombres:
 *                       type: string
 *                       description: Nombres del usuario.
 *                       example: "Jhon Richard"
 *                     appellidos:
 *                       type: string
 *                       description: Apellidos del usuario.
 *                       example: "Doe Smith"
 *                     email:
 *                       type: string
 *                       description: El email del usuario.
 *                       example: "jhondoe05@gmail.com"
 *                     token:
 *                       type: string
 *                       description: JSON web Token.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
 *                     cargo:
 *                       type: string
 *                       description: Cargo dentro de la empresa.
 *                       example: "asesor"
 *       400:
 *         description: Ningun dato fue recibido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "email, nombres, apellidos y password son obligatorios."
 *       422:
 *         description: Algun dato requerido no fue enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Datos de registro inválidos."
 *                     errors:
 *                       type: array 
 *                       items:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: string
 *                             description: Campo donde se genero el error.
 *                             example: "password"
 *                           message:
 *                             type: string
 *                             description: Mensaje específico para ese error.
 *                             example: '\"password\" is required'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Error interno del servidor."
 * 
*/
router.post('/register-adviser', validateRegisterAdviser, authRegisterAdviserController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - "Autenticación" 
 *     summary: Inicio de sesion para usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Inicio de sesion exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID unico del usuario.
 *                       example: "1"
 *                     nombres:
 *                       type: string
 *                       description: Nombres del usuario.
 *                       example: "Jhon Richard"
 *                     appellidos:
 *                       type: string
 *                       description: Apellidos del usuario.
 *                       example: "Doe Smith"
 *                     email:
 *                       type: string
 *                       description: El email del usuario.
 *                       example: "jhondoe05@gmail.com"
 *                     token:
 *                       type: string
 *                       description: JSON web Token.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
 *                     cargo:
 *                       type: string
 *                       description: Cargo dentro de la empresa.
 *                       example: "user"
 *       400:
 *         description: Ningun dato fue recibido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "email y password obligatorios."
 *       401:
 *         description: Datos invalidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Credenciales invalidas."
 *       422:
 *         description: Algun dato requerido no fue enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Datos de registro inválidos."
 *                     errors:
 *                       type: array 
 *                       items:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: string
 *                             description: Campo donde se genero el error.
 *                             example: "password"
 *                           message:
 *                             type: string
 *                             description: Mensaje específico para ese error.
 *                             example: '\"password\" is required'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Error interno del servidor." 
 * 
*/
router.post('/login', validationLogin, authLoginController)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *      - "Autenticación"
 *     summary: Cierra sesión del usuario actual.
 *     description: Revoca el token JWT activo y elimina el acceso en la whitelist.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Sesión cerrada correctamente."
 *       401:
 *         description: Token inválido o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token inválido o expirado."
 *       500:
 *         description: Error interno al cerrar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No se pudo revocar el token."
 */


router.post('/logout', authenticateToken,authLogoutController);

export default router;

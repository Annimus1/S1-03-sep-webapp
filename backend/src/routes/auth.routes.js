import { Router } from 'express';
import { authController, authLoginController } from '../controllers/auth.controller.js';
import { validateRegister, validationLogin } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', validateRegister, authController);


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
 *                       example: "Supervisor"
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
 * 
*/
router.post('/login', validationLogin, authLoginController)

export default router;

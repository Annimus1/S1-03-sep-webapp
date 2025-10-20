import { Router } from "express"
import { authenticateToken, authenticateRole }  from "../middlewares/auth.middleware.js";
import { userController } from '../controllers/user.controller.js';

const router = Router();

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     tags:
 *      - "Perfil" 
 *     summary: Obtiene un usuario PyMEs.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El Identificador del usuario que se quiere recuperar.
 *           example: "64b5a2164b5a3f4b5c6d7e8f"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Documentos guardados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Email del usuario.
 *                   example: "68ed84e9f3c9f63d7bb5adb6"
 *                 role:
 *                   type: string
 *                   description: Rol del usuario dentro de la aplicacion.
 *                   example: "user"
 *                 email:
 *                   type: string
 *                   description: Email del usuario.
 *                   example: "jhondoe.01@gmail.com"
 *                 password:
 *                   type: string
 *                   description: Password del usuario mayor o igual a 8 caracteres.
 *                   example: "-JhonDoe#1234"
 *                 nombres:
 *                   type: string
 *                   description: Nombres del Usuario.
 *                   example: "Juan"
 *                 apellidos:
 *                   type: string
 *                   description: Apellido del Usuario.
 *                   example: "Perez"
 *                 CUIT:
 *                   type: string
 *                   description: CUIT del Usuario.
 *                   example: "27-45585198-3"
 *                 personalDNI:
 *                   type: string
 *                   description: "DNI del Usuario."
 *                   example: "45585198"
 *                 Cargo:
 *                   type: string
 *                   description: Cargo del Usuario en la empresa.
 *                   example: "CEO"
 *                 nombreComercial:
 *                   type: string
 *                   description: Nombre comercial de la empresa.
 *                   example: "Kredia S.A."
 *                 empresarialCUIT:
 *                   type: string
 *                   description: CUIT de la empresa.
 *                   example: "30-71048762-1"
 *                 tipoSocietario:
 *                   type: string
 *                   description: Tipo societario de la empresa (SRL, SA, SAS, EIRL, etc.).
 *                   example: "SRL"
 *                 domicilioFiscal:
 *                   type: string
 *                   description: Domicilio fiscal de la empresa.
 *                   example: "Calle Falsa 123, CABA"
 *                 domicilioComercial:
 *                   type: string
 *                   description: Domicilio comercial de la empresa.
 *                   example: "Calle Falsa 123, CABA"
 *                 actividadEconomicaPrincipal:
 *                   type: string
 *                   description: Actividad económica principal de la empresa.
 *                   example: "Comercio al por mayor de productos alimenticios"
 *                 fechaConstitucion:
 *                   type: string
 *                   format: date
 *                   description: Fecha de constitución de la empresa.
 *                   example: "2020-01-15"
 *                 numeroRegistro:
 *                   type: string
 *                   description: Número de registro mercantil de la empresa.
 *                   example: "123456789"
 *                 pep:
 *                   type: boolean
 *                   description: Indica si el usuario es una Persona Expuesta Políticamente (Sí/No).
 *                   example: false
 *                 estatutoSocial:
 *                   type: string
 *                   description: "to define"
 *                   example: "url-del-recurso" 
 *                 actaDesignacionAutoridades:
 *                   type: string
 *                   description: "to define"
 *                   example: "url-del-recurso" 
 *                 poderRepresentante:
 *                   type: string
 *                   description: "to define"
 *                   example: "url-del-recurso" 
 *                 inscripcionFiscal:
 *                   type: string
 *                   description: "to define"
 *                   example: "url-del-recurso" 
 *                 comprobanteDomicilioFiscal:
 *                   type: string
 *                   description: "to define"
 *                   example: "url-del-recurso" 
 *                 datosVerificados:
 *                   type: boolean
 *                   description: "To define"
 *                   example: "true" 
 *                 createdAt:
 *                   type: string
 *                   description: "To define"
 *                   example: "Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)" 
 *                 updatedAt:
 *                   type: string
 *                   description: "To define"
 *                   example: "Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)" 
 *                 DNI:
 *                   type: string
 *                   description: "To define"
 *                   example: "url-del-recurso" 
 *                 DeclaracionJurada:
 *                   type: string
 *                   description: "To define"
 *                   example: "url-del-recurso" 
 *                 certificadoPyes:
 *                   type: string
 *                   description: "To define"
 *                   example: "url-del-recurso" 
 *                 comprobanteDomicilioPersonal:
 *                   type: string
 *                   description: "To define"
 *                   example: "url-del-recurso" 
 *       401:
 *         description: No autorizado.
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
 *                       example: "No autorizado."
 *       404:
 *         description: Usuario no encontrado.
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
 *                       example: "Usuario no encontrado."
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
router.get('/:id', authenticateToken, authenticateRole, userController)


export default router;
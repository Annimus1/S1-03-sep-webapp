import { Router } from 'express';
import { singleResourceController, validateAccountFiles } from '../controllers/storage.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import filesUploadMiddleware from '../middlewares/upload.middleware.js';

const router = Router();

/**
 * @swagger
 * /validate-account:
 *   post:
 *     tags:
 *      - "Subida de documentos" 
 *     summary: Anexa Documentos al usuario PyMEs.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FileMetadata'
 *     responses:
 *       200:
 *         description: Documentos guardados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     datosVerificados:
 *                       type: boolean
 *                       description: Muestra si ya todos los campos han sido enviados
 *                       example: false
 *                     files:
 *                       type: array
 *                       description: Lista de los nombres de los archivos recibidos.
 *                       items:
 *                         type: string
 *                         example: "estatutoSocial"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Archivos procesados correctamente."
 *       400:
 *         description: Tipo de archivo no valido | Archivo excede el peso limite.
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
 *                       example: "Tipo de archivo no valido."
 * 
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
 *       422:
 *         description: Documentos guardados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: HLAAA
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: Estado de la respuesta.
 *                     example: "error"
 *                   message:
 *                     type: string
 *                     description: Mensaje de la respuesta.
 *                     example: "Error mientras procesaba estatutoSocial."
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
router.post('/validate-account', authenticateToken, filesUploadMiddleware, validateAccountFiles);

/**
 * @swagger
 * /uploads/{resource}:
 *   get:
 *     tags:
 *      - "Subida de documentos" 
 *     summary: Retorna un recurso especifico.
 *     parameters:
 *       - in: path
 *         name: resource
 *         required: true
 *         schema:
 *           type: string
 *           description: El recurso especifico que se quiere recuperar.
 *           example: "123_estatutoSocial_1678886400000.pdf"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Devuelve el recurso solicitado.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary 
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
 *         description: Archivo no encontrado.
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
 *                       example: "Archivo no encontrado."
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
 *                       example: "Error al acceder al archivo."
 * 
*/
router.get('/uploads/:resource',authenticateToken, singleResourceController)

export default router;

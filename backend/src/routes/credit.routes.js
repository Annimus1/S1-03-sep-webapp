import { Router } from 'express';
import { uploadCreditFiles } from '../controllers/credit.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { filesCreditMiddleware } from '../middlewares/upload.middleware.js';

const router = Router();
/**
 * @swagger
 * /credit/upload:
 *   post:
 *     tags:
 *      - "Crédito"
 *     summary: Sube documentos al credito.
 *     description: Permite al usuario subir todos los archivos relacionados con su crédito.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Credit'
 *     responses:
 *       201:
 *         description: Documentos guardados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
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
 *                     credit:
 *                       type: object
 *                       description: Objeto crédito actualizado.
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
 *         description: Error en subir un documento.
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

router.post('/upload', authenticateToken, filesCreditMiddleware, uploadCreditFiles)

export default router;

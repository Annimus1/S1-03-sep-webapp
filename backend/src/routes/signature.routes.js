import { Router } from 'express';
import { authenticateToken}  from '../middlewares/auth.middleware.js';
import { authenticateCreditandRole } from '../middlewares/role.middleware.js'
import { signatureUploadMiddleware } from '../middlewares/signature.middleware.js'
import { signContractController,contractController } from '../controllers/signature.controller.js';
const router = Router();

/**
 * @swagger
 * /signature/contract/{id}:
 *   get:
 *     tags:
 *      - "Firma Digital"
 *     summary: Lista de todos los Creditos.
 *     description: Permite al usuario asesor obtener la lista de los creditos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El Identificador del credito que se quiere actualizar.
 *           example: "68f6bd80e3303d7586016068"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contrato PDF generado con éxito.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string # Indica que la respuesta es un flujo de bytes
 *               format: binary # Específica que es un archivo binario (el PDF)
 *             headers:
 *               Content-Disposition:
 *                 schema:
 *                   type: string
 *                   example: attachment; filename=Contrato_Firmado_30-71234567-8.pdf
 *       403:
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
 *                       example: "No esta autorizado a ver los créditos"
 *       404:
 *         description: Creditos no encontrado.
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
 *                       example: "Creditos no encontrado."
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
 */
router.get('/contract/:id', authenticateToken, authenticateCreditandRole, contractController);

router.post('/sign/:id', signatureUploadMiddleware, signContractController);

export default router;

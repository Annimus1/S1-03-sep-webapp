import { Router } from 'express';
import filesUploadMiddleware from '../middlewares/upload.middleware.js';

const router = Router();


/**
 * @swagger
 * /validate-accounts:
 *   post:
 *     tags:
 *      - "Subida de documentos" 
 *     summary: Crea una cuenta de usuario PYMES.
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
 *                     status:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "success"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Documentos guardados exitosamente."
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
router.post('/validate-accounts', filesUploadMiddleware, (req, res) => {

    console.log('----------------------------------------------------');
    console.log('✅ Documentos recibidos con éxito');
    Object.keys(req.files).map(e=> console.log(e))
    console.log('----------------------------------------------------');

    res.status(200).json({ 
        message: 'Archivos procesados y mostrados en consola.',
        files: Object.keys(req.files) // Indica qué archivos se recibieron
    });
});

export default router;

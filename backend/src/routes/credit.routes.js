import { Router } from 'express';
import { desicionCredit, getCreditById, getCredits, updateCreditStatus, uploadCreditFiles } from '../controllers/credit.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authenticateCreditandRole, authenticateRoleAsesor } from '../middlewares/role.middleware.js';
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

/**
 * @swagger
 * /credit/{id}:
 *   get:
 *     tags:
 *      - "Crédito"
 *     summary: Obtiene un Credito.
 *     description: Permite al usuario obtener un crédito por su ID y a un usuario asesor.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El Identificador del credito que se quiere recuperar.
 *           example: "68f6bd80e3303d7586016068"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Credito encontrado exitosamente.
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
 *                       example: "Credito encontrado."
 *                     credit:
 *                       type: object
 *                       description: Objeto crédito.
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
 *                       example: "No esta autorizado a ver este crédito"
 *       404:
 *         description: Credito no encontrado.
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
 *                       example: "Credito no encontrado."
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

router.get('/:id',authenticateToken,authenticateCreditandRole, getCreditById);
/**
 * @swagger
 * /credit:
 *   get:
 *     tags:
 *      - "Crédito"
 *     summary: Lista de todos los Creditos.
 *     description: Permite al usuario asesor obtener la lista de los creditos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Creditos encontrados exitosamente.
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
 *                       example: "Credito encontrado."
 *                     credits:
 *                       type: array
 *                       description: Lista de Créditos.
 *                       items:
 *                         type: object
 *                         example: {}
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

router.get('/',authenticateToken,authenticateRoleAsesor, getCredits);
/**
 * @swagger
 * /credit/update-estatus/{id}:
 *   post:
 *     tags:
 *      - "Crédito"
 *     summary: Actualiza un Credito por la firmaDigital.
 *     description: Permite que al cargar la fimaDigital se actualice el estado a revision.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firmaDigital:
 *                 type: string
 *                 description: Indica si la firma digital ha sido cargada.
 *                 example: "true"
 *     responses:
 *       200:
 *         description: Credito actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     estatus:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "revision"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Credito actualizado."
 *                     credit:
 *                       type: object
 *                       description: Objeto crédito.
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
 *                       example: "No esta autorizado a ver este crédito"
 *       404:
 *         description: Credito no encontrado.
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
 *                       example: "Credito no encontrado."
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

router.post('/update-estatus/:id',authenticateToken,authenticateCreditandRole, updateCreditStatus);

/**
 * @swagger
 * /credit/desicion/{id}:
 *   post:
 *     tags:
 *      - "Crédito"
 *     summary: Actualiza un Credito por la respuesta del asesor..
 *     description: Indica si el credito fue aprobado o rechazado.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estatus:
 *                 type: string
 *                 description: Indica si el credito fue aprobado o rechazado.
 *                 example: "rechazado"
 *     responses:
 *       200:
 *         description: Credito actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     estatus:
 *                       type: string
 *                       description: Estado de la respuesta.
 *                       example: "revision"
 *                     message:
 *                       type: string
 *                       description: Mensaje de la respuesta.
 *                       example: "Credito actualizado."
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
 *                       example: "No esta autorizado a ver este crédito"
 *       404:
 *         description: Credito no encontrado.
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
 *                       example: "Credito no encontrado."
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

router.post('/desicion/:id',authenticateToken,authenticateRoleAsesor, desicionCredit); 
export default router;

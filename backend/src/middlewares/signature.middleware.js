import upload from "./multerPng.middleware.config.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadMetadata:
 *       type: object
 *       properties:
 *         signature:
 *           type: string
 *           format: binary
 *           description: Firma en formato png.
 *         contract:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Contrato.
 */
export const signatureUploadMiddleware = upload.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'contract', maxCount: 1 },
])
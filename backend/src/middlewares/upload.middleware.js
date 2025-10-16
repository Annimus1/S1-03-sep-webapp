import upload  from './multer.middleware.config.js';


// Middleware que define los campos específicos que esperamos
// del lado del backend.

/**
 * @swagger
 * components:
 *   schemas:
 *     FileMetadata:
 *       type: object
 *       properties:
 *         estatutoSocial:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Estatuto Social.
 *         actaDesignacionAutoridades:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Acta de Designación de Autoridades.
 *         poderRepresentante:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Poder del Representante Legal.
 *         inscripcionFiscal:
 *           type: string
 *           format: binary
 *           description: Documento PDF de la Inscripción Fiscal (Ej. RFC).
 *         comprobanteDomicilioFiscal:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Comprobante de Domicilio Fiscal.
 */
const filesUploadMiddleware = upload.fields([
    { name: 'estatutoSocial', maxCount: 1 },
    { name: 'actaDesignacionAutoridades', maxCount: 1 }, 
    { name: 'poderRepresentante', maxCount: 1 },
    { name: 'inscripcionFiscal', maxCount: 1 }, 
    { name: 'comprobanteDomicilioFiscal', maxCount: 1 } 
]);

export default filesUploadMiddleware;
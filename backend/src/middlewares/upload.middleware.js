import upload from '../middlewares/multer.middleware.config.js';

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
 *         certificadoPyes:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Certificado PyMEs.
 *         DeclaracionJurada:
 *           type: string
 *           format: binary
 *           description: Documento PDF de la DeclaracionJurada.
 *         DNI:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Documento de Identidad Nacional por ambos lados.
 *         comprobanteDomicilioPersonal:
 *           type: string
 *           format: binary
 *           description: Documento PDF del Comprobante de Domicilio Personal.
 */
const filesUploadMiddleware = upload.fields([
    { name: 'estatutoSocial', maxCount: 1 },
    { name: 'actaDesignacionAutoridades', maxCount: 1 }, 
    { name: 'poderRepresentante', maxCount: 1 },
    { name: 'inscripcionFiscal', maxCount: 1 }, 
    { name: 'comprobanteDomicilioFiscal', maxCount: 1 },
    { name: 'certificadoPyes', maxCount:1},
    { name: 'DeclaracionJurada', maxCount:1},
    { name: 'DNI', maxCount:1},
    { name: 'comprobanteDomicilioPersonal', maxCount:1},  
]);

export default filesUploadMiddleware;
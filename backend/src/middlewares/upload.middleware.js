import upload from './multer.middleware.config.js';


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
export const filesUploadMiddleware = upload.fields([
    { name: 'estatutoSocial', maxCount: 1 },
    { name: 'actaDesignacionAutoridades', maxCount: 1 }, 
    { name: 'poderRepresentante', maxCount: 1 },
    { name: 'inscripcionFiscal', maxCount: 1 }, 
    { name: 'comprobanteDomicilioFiscal', maxCount: 1 } 
]);


export const filesCreditMiddleware = upload.fields([
    { name: 'estadosContablesAuditados', maxCount: 1 }, 
    { name: 'estadosContableIntermedios', maxCount: 1 },
    { name: 'ddjjImpositivas', maxCount: 1 },
    { name: 'resumenBancario', maxCount: 1 },
    { name: 'detalleCuentas', maxCount: 1 }, 
    { name: 'comprobanteImpuestos', maxCount: 1 },
    { name: 'ingresosEgresosMensuales', maxCount: 1 }, 
    { name: 'inventariosActuales', maxCount: 1 },
    { name: 'activosFijos', maxCount: 1 },
    { name: 'proyeccionFlujoFondos', maxCount: 1 }, 
    { name: 'ratiosFinancieros', maxCount: 1 },
    { name: 'registroVentasCompras', maxCount: 1 }, 
    { name: 'planFinancieroCredito', maxCount: 1 },
    { name: 'certificacionContable', maxCount: 1 },
    { name: 'organigramaPersonal', maxCount: 1 }, 
    { name: 'principalesClientes', maxCount: 1 },
    { name: 'principalesProveedores', maxCount: 1 }, 
    { name: 'contratosComerciales', maxCount: 1 },
    { name: 'comprobanteFacturacion', maxCount: 1 },
    { name: 'permisosHabilitantes', maxCount: 1 }, 
    { name: 'comprobantePropiedad', maxCount: 1 },
    { name: 'evidenciaActividadOnline', maxCount: 1 }, 
    { name: 'fotosEstablecimiento', maxCount: 1 },
    { name: 'descripcionMercado', maxCount: 1 },
    { name: 'presupuestoInversion', maxCount: 1 }, 
    { name: 'cotizacionProveedores', maxCount: 1 },
    { name: 'estudioFactibilidad', maxCount: 1 }, 
    { name: 'planMantenimiento', maxCount: 1 }, 
    { name: 'informeTecnico', maxCount: 1 },
    { name: 'planImplementacion', maxCount: 1 }, 
    { name: 'permisosObra', maxCount: 1 },
    { name: 'facturaProforma', maxCount: 1 }, 
    { name: 'detalleFondos', maxCount: 1 },
    { name: 'proyeccionFlujoOperativo', maxCount: 1 },
    { name: 'gastosOperativos', maxCount: 1 }, 
    { name: 'evidenciaExpancion', maxCount: 1 },
    { name: 'constanciaCBU', maxCount: 1 }, 
    { name: 'certificadoLibreDeuda', maxCount: 1 },
    { name: 'historialPrestamos', maxCount: 1 },
    { name: 'referenciasComerciales', maxCount: 1 },
    { name: 'informeCrediticio', maxCount: 1 },
    { name: 'detalleCreditos', maxCount: 1 },
    { name: 'referenciasBancarias', maxCount: 1 },
    { name: 'ddjjQuiebra', maxCount: 1 },
    { name: 'tituloPropiedad', maxCount: 1 },
    { name: 'tasaOficial', maxCount: 1 },
    { name: 'avalSolidario', maxCount: 1 },
    { name: 'comprobanteGarantes', maxCount: 1 },
    { name: 'cesionSGR', maxCount: 1 }, 
    { name: 'informeRegistral', maxCount: 1 },
    { name: 'seguro', maxCount: 1 },
    { name: 'declaracionPatrimonialGarante', maxCount: 1 },
    { name: 'documentoDeuda', maxCount: 1 },
    { name: 'ddjjOrigenLicito', maxCount: 1 },
    { name: 'ddjjBeneficiarioFinal', maxCount: 1 },
    { name: 'consentimientoAnalisis', maxCount: 1 },
    { name: 'constanciaPoliticasInternas', maxCount: 1 },
    { name: 'firmaDigital', maxCount: 1 }
]);
export default filesUploadMiddleware;
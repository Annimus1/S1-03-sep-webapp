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
 *         certificadoPyMes:
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
export const filesUploadMiddleware = upload.fields([
    { name: 'estatutoSocial', maxCount: 1 },
    { name: 'actaDesignacionAutoridades', maxCount: 1 }, 
    { name: 'poderRepresentante', maxCount: 1 },
    { name: 'inscripcionFiscal', maxCount: 1 }, 
    { name: 'comprobanteDomicilioFiscal', maxCount: 1 },
    { name: 'certificadoPyMes', maxCount:1},
    { name: 'DeclaracionJurada', maxCount:1},
    { name: 'DNI', maxCount:1},
    { name: 'comprobanteDomicilioPersonal', maxCount:1},  
]);

/**
 * @swagger
 * components:
 *   schemas:
 *     Credit:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID del usuario propietario del crédito
 *         creditType:
 *           type: string
 *           enum: ['inversion', 'capital_trabajo']
 *           default: 'inversion'
 *           description: Tipo de crédito solicitado
 *         firmaDigital:
 *           type: string
 *           default: null
 *           description: Url del recurso firmado digitalmente en el crédito. 
 *         estatus:
 *           type: string
 *           enum: ['recaudacion de documentos', 'aprobado', 'rechazado', 'revision']
 *           default: 'recaudacion de documentos'
 *           description: Estado actual del crédito
 *         datosVerificados:
 *           type: boolean
 *           default: false
 *           description: Indica si todos los archivos obligatorios fueron cargados
 *         estadosContablesAuditados:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         estadosContableIntermedios:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         ddjjImpositivas:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         resumenBancario:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         detalleCuentas:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         comprobanteImpuestos:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         ingresosEgresosMensuales:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         inventariosActuales:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         activosFijos:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         proyeccionFlujoFondos:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         ratiosFinancieros:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         registroVentasCompras:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         planFinancieroCredito:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         certificacionContable:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         descripcionNegocio:
 *           type: string
 *           description: Texto descriptivo del negocio
 *         organigramaPersonal:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         principalesClientes:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         principalesProveedores:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         contratosComerciales:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         comprobanteFacturacion:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         permisosHabilitantes:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         comprobantePropiedad:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         evidenciaActividadOnline:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         fotosEstablecimiento:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         descripcionMercado:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         presupuestoInversion:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         cotizacionProveedores:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         estudionFactibilidad:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         planMantenimiento:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         informeTecnico:
 *           type: string
 *           format: binary
 *           description: Archivo opcional
 *         planImplementacion:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         permisosObra:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         facturaProforma:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         detalleFondos:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         proyeccionFlujoOperativo:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         gastosOperativos:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         evidenciaExpancion:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         constanciaCBU:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         certificadoLibreDeuda:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         historialPrestamos:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         referenciasComerciales:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         informeCrediticio:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         detalleCreditos:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         referenciasBancarias:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         ddjjQuiebra:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         tituloPropiedad:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         tasaOficial:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         avalSolidario:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         comprobanteGarantes:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         cesionSGR:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         informeRegistral:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         seguro:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         declaracionPatrimonialGarante:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         documentoDeuda:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         ddjjOrigenLicito:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         ddjjBeneficiarioFinal:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         consentimientoAnalisis:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 *         constanciaPoliticasInternas:
 *           type: string
 *           format: binary
 *           description: Archivo obligatorio
 * */
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
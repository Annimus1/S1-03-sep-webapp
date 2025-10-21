import mongoose from 'mongoose';
const { Schema } = mongoose;

/* ------------------------------------------------------------------
    ESQUEMA PRINCIPAL: CreditSchema
------------------------------------------------------------------ */
const CreditSchema = new Schema({
  // Referencia al usuario propietario del crédito
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Tipo de crédito
    creditType: {
        type: String,
        enum: ['inversion', 'capital_trabajo'], 
        required: true
    },

  /* ------------------- DOCUMENTACIÓN GENERAL ------------------- */
    estadosContablesAuditados: { type: String },
    estadosContableIntermedios: { type: String },
    ddjjImpositivas: { type: String },
    resumenBancario: { type: String },
    detalleCuentas: { type: String},
    comprobanteImpuestos: { type: String },
    ingresosEgresosMensuales: { type: String},
    inventariosActuales: { type: String },
    activosFijos: { type: String },
    proyeccionFlujoFondos: { type: String },
    ratiosFinancieros: { type: String },
    registroVentasCompras: { type: String },
    planFinancieroCredito: { type: String},
    certificacionContable: { type: String },
    descripcionNegocio: { type: String },
    organigramaPersonal: { type: String },
    principalesClientes: { type: String },
    principalesProveedores: { type: String },
    contratosComerciales: { type: String },
    comprobanteFacturacion: { type: String},
    permisosHabilitantes: { type: String },
    comprobantePropiedad: { type: String },
    evidenciaActividadOnline: { type: String },
    fotosEstablecimiento: { type: String },
    descripcionMercado: { type: String },
    constanciaCBU: { type: String },
    detalleFondos: { type: String},
    proyeccionFlujoOperativo: { type: String },
    gastosOperativos: { type: String },
    facturasProforma: { type: String},
    evidenciaExpancion: { type: String},
    certificadoLibreDeuda: { type: String},
    presupuestoInversion: { type: String },
    cotizacionProveedores: { type: String },
    estudioFactibilidad: { type: String },
    planMantenimiento: { type: String },
    informeTecnico: { type: String },
    planImplementacion: { type: String},
    permisosObra: { type: String },
    facturaProforma: { type: String },
    historialPrestamos: { type: String},
    referenciasComerciales: { type: String },
    informeCrediticio: { type: String },
    detalleCreditos: { type: String},
    referenciasBancarias: { type: String},
    ddjjQuiebra: { type: String},
    tituloPropiedad: { type: String},
    tasaOficial: { type: String},
    avalSolidario: { type: String},
    comprobanteGarantes: { type: String},
    cesionSGR: { type: String},
    informeRegistral: { type: String},
    seguro: { type: String},
    declaracionPatrimonialGarante: { type: String },
    documentoDeuda: { type: String},
    ddjjOrigenLicito: { type: String },
    ddjjBeneficiarioFinal: { type: String},
    consentimientoAnalisis: { type: String },
    constanciaPoliticasInternas: { type: String },
    firmaDigital: { type: String,default: 'false' },

    /* ------------------- DATOS DE ESTADO ------------------- */
    estatus: {
        type: String,
        enum: ['recaudacion de documentos', 'aprobado', 'rechazado', 'revision'],
        default: 'recaudacion de documentos'
    },
    datosVerificados: {
        type: String,
        enum: ['true', 'false'],
        default: 'false', // Debe ser true para avanzar a la siguiente seccion.
    },

}, { timestamps: true });


/* ------------------- EXPORT ------------------- */
const Credit = mongoose.model('Credit', CreditSchema);
export default Credit;

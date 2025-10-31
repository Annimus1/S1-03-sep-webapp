import mongoose from 'mongoose';
const { Schema } = mongoose;

/* ------------------------------------------------------------------
    ESQUEMA PRINCIPAL: CreditSchema
------------------------------------------------------------------ */
const CreditSchema = new Schema({
  // Referencia al usuario propietario del crédito
    userId: { type: Schema.Types.ObjectId, ref: 'User'},

  // Tipo de crédito
    creditType: {
        type: String,
        enum: ['inversion', 'capital_trabajo'], 
        default: 'inversion'
    },
    //Monto solicitado
    monto_credito: {
      type: Number,
      default: null
    },
    //Plazo solicitado
    plazos: {
      type: Number,
      default: null
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
    firmaDigital: { type: String,default: null },

    /* ------------------- DATOS DE ESTADO ------------------- */
    estatus: {
        type: String,
        enum: ['recaudacion_documentos', 'aprobado', 'rechazado', 'revision'],
        default: 'recaudacion_documentos'
    },
    datosVerificados: {
        type: Boolean,
        default: false, // Debe ser true para avanzar a la siguiente seccion.
    },

}, { timestamps: true });


/* ------------------- EXPORT ------------------- */
const Credit = mongoose.model('Credit', CreditSchema);
export default Credit;

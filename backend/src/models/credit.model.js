import mongoose from 'mongoose';
const { Schema } = mongoose;

/* ------------------------------------------------------------------
        SUBESQUEMA: Crédito de Inversión / Expansión
------------------------------------------------------------------ */
const InvestmentCreditSchema = new Schema({

    presupuestoInversion: { type: String },
    cotizacionProveedores: { type: String },
    estudioFactibilidad: { type: String },
    planMantenimiento: { type: String },
    informeTecnico: { type: String },
    planImplementacion: { type: String, required: true },
    permisosObra: { type: String, required: true },
    facturaProforma: { type: String, required: true },
}, { _id: false });

/* ------------------------------------------------------------------
    SUBESQUEMA: Crédito de Capital de Trabajo
------------------------------------------------------------------ */
const WorkingCapitalCreditSchema = new Schema({
    detalleFondos: { type: String},
    proyeccionFlujoOperativo: { type: String, required: true },
    gastosOperativos: { type: String, required: true },
    facturasProforma: { type: String},
    evidenciaExpancion: { type: String},
}, { _id: false });

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
    certificadoPyme: { type: String},
    dniRepLegal: { type: String, required: true },
    comprobanteDomicilioPersonal: { type: String, required: true },
    ddjjBeneficiario: { type: String, required: true },
    estadosContablesAuditados: { type: String },
    estadosContableIntermedios: { type: String },
    ddjjImpositivas: { type: String, required: true },
    resumenBancario: { type: String },
    detalleCuentas: { type: String, required: true },
    comprobanteImpuestos: { type: String, required: true },
    ingresosEgresosMensuales: { type: String, required: true },
    inventariosActuales: { type: String },
    activosFijos: { type: String },
    proyeccionFlujoFondos: { type: String, required: true },
    ratiosFinancieros: { type: String },
    registroVentasCompras: { type: String, required: true },
    planFinancieroCredito: { type: String, required: true },
    certificacionContable: { type: String },
    descripcionNegocio: { type: String, required: true },
    organigramaPersonal: { type: String },
    principalesClientes: { type: String, required: true },
    principalesProveedores: { type: String, required: true },
    contratosComerciales: { type: String },
    comprobanteFacturacion: { type: String, required: true },
    permisosHabilitantes: { type: String },
    comprobantePropiedad: { type: String },
    evidenciaActividadOnline: { type: String },
    fotosEstablecimiento: { type: String },
    descripcionMercado: { type: String },
    constanciaCBU: { type: String, required: true },
    certificadoLibreDeuda: { type: String},
    historialPrestamos: { type: String},
    referenciasComerciales: { type: String, required: true },
    informeCrediticio: { type: String, required: true },
    detalleCreditos: { type: String},
    referenciasBancarias: { type: String},
    ddjjQuiebra: { type: String, required: true},
    titutoPropiedad: { type: String},
    tasaOficial: { type: String},
    avalSolidario: { type: String},
    comprobanteGarantes: { type: String},
    cesionSGR: { type: String},
    informeRegistral: { type: String},
    seguro: { type: String},
    declaracionPatrimonialGarante: { type: String, required: true },
    documentoDeuda: { type: String, required: true },
    ddjjOrigenLicito: { type: String, required: true },
    ddjjBeneficiarioFinal: { type: String, required: true },
    consentimientoAnalisis: { type: String, required: true },
    constanciaPoliticasInternas: { type: String },
    firmaDigital: { type: String},

    /* ------------------- SUBESQUEMAS ------------------- */
    investmentCredit: { type: InvestmentCreditSchema, default: null },
    workingCapitalCredit: { type: WorkingCapitalCreditSchema, default: null },

    /* ------------------- DATOS DE ESTADO ------------------- */
    estatus: {
        type: String,
        enum: ['recaudacion de documentos', 'aprobado', 'rechazado', 'revision'],
        default: 'recaudacion de documentos'
    },
    totalDocumentos: { type: Number, default: 0 },
    actualDocumentos: { type: Number, default: 0 },
    }, { timestamps: true });

/* ------------------- EXPORT ------------------- */
const Credit = mongoose.model('Credit', CreditSchema);
export default Credit;

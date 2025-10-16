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
    detalleFondos: { type: String, required: true },
    proyeccionFlujoOperativo: { type: String, required: true },
    gastosOperativos: { type: String, required: true },
    facturasProforma: { type: String, required: true },
    evidenciaExpancion: { type: String, required: true },
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
    estatutoSocial: { type: String, required: true },
    poderRepLegal: { type: String },
    comprobanteDomFiscal: { type: String, required: true },
    actaAutoridades: { type: String, required: true },
    inscripcionFiscal: { type: String, required: true },
    certificadoPyme: { type: String, required: true },
    dniRepLegal: { type: String, required: true },
    ddjjBeneficiario: { type: String, required: true },
    ddjjPEP: { type: String },
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
    certificadoLibreDeuda: { type: String, required: true },
    historialPrestamos: { type: String, required: true },
    referenciasComerciales: { type: String, required: true },
    informeCrediticio: { type: String, required: true },
    detalleCreditos: { type: String, required: true },
    referenciasBancarias: { type: String, required: true },
    ddjjQuiebra: { type: String, required: true },
    titutoPropiedad: { type: String, required: true },
    tasaOficial: { type: String, required: true },
    avalSolidario: { type: String, required: true },
    comprobanteGarantes: { type: String, required: true },
    cesionSGR: { type: String, required: true },
    informeRegistral: { type: String, required: true },
    seguro: { type: String, required: true },
    declaracionPatrimonialGarante: { type: String, required: true },
    documentoDeuda: { type: String, required: true },
    ddjjOrigenLicito: { type: String, required: true },
    ddjjBeneficiarioFinal: { type: String, required: true },
    consentimientoAnalisis: { type: String, required: true },
    constanciaPoliticasInternas: { type: String, required: true },
    firmaDigital: { type: String, required: true },

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

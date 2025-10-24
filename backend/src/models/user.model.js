import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // ----------------------------------------------------------------------
    // I. CAMPOS DE AUTENTICACIÓN Y ROL
    // ----------------------------------------------------------------------
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true, // Este campo almacenará el HASH, NO el texto plano.
    },
    role: {
        type: String,
        required: true,
        enum: ['asesor', 'user'],
        default: 'user'
    },

    // ----------------------------------------------------------------------
    // II. CAMPOS OBLIGATORIOS EN EL REGISTRO (KYC Básico)
    // ----------------------------------------------------------------------
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    personalDNI: { type: String, required: true, unique: true }, // DNI / Cédula / Pasaporte.
    CUIT: { type: String, required: true }, // CUIT / RFC / RUT personal.
    Cargo: { type: String, required: true },

    nombreComercial: { type: String, required: true },
    empresarialCUIT: { type: String, required: true, unique: true }, // CUIT / RUC / RFC / NIT (empresa)
    tipoSocietario: { type: String, required: true }, // SRL, SA, SAS, EIRL, etc.
    domicilioFiscal: { type: String, required: true },
    domicilioComercial: { type: String, required: true },
    actividadEconomicaPrincipal: { type: String, required: true }, // CNAE / Código de actividad.
    fechaConstitucion: { type: Date, required: true },
    numeroRegistro: { type: String, required: true, unique: true }, // IGJ / SUNARP / Registro Mercantil.

    pep: { type: Boolean, required: true }, // Persona Expuesta Políticamente (Sí/No).
    // ----------------------------------------------------------------------
    // III. CAMPOS POST-REGISTRO (Referencias de Documentación)
    // Se almacenan las URLs o IDs de los archivos subidos al servicio de almacenamiento (S3, etc.).
    // ----------------------------------------------------------------------
    estatutoSocial: { type: String, default: null }, // URL/ID del archivo.
    actaDesignacionAutoridades: { type: String, default: null }, // URL/ID del archivo.
    poderRepresentante: { type: String, default: null }, // URL/ID del archivo.
    inscripcionFiscal: { type: String, default: null }, // URL/ID del archivo.
    comprobanteDomicilioFiscal: { type: String, default: null }, // URL/ID del archivo.
    certificadoPyMes: {type: String, default: null},
    DeclaracionJurada: {type: String, default: null},
    DNI: {type: String, default: null},
    comprobanteDomicilioPersonal: {type: String, default: null},

    // ----------------------------------------------------------------------
    // IV. ESTADO DE VERIFICACIÓN
    // ----------------------------------------------------------------------
    datosVerificados: {
        type: Boolean,
        default: false, // Debe ser true para solicitar crédito.
        index: true // Indexar para consultas rápidas de elegibilidad.
    }
}, { timestamps: true });


// 🔑 HOOK PRE-SAVE PARA HASHEAR LA CONTRASEÑA
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Si la contraseña no se modificó, no hacemos nada y pasamos al siguiente middleware/save
    }

    try {
        const rondasHashing = 10;
        // Generar el salt
        const salt = await bcrypt.genSalt(rondasHashing); 
        
        // Hashear la contraseña usando el salt
        this.password = await bcrypt.hash(this.password, salt);
        
        // Continuar con el proceso de guardado
        next();
        
    } catch (error) {
        // Manejar cualquier error durante el hashing
        next(error); 
    }
});

/**
 * Compara una contraseña candidata con el hash almacenado en el usuario.
 *
 * @async
 * @function comparePassword
 * @memberof UserSchema.methods
 * @param {string} candidatePassword - La contraseña enviada por el usuario (en texto plano).
 * @returns {Promise<boolean>} Retorna true si las contraseñas coinciden, false en caso contrario.
 *
 * @example
 * // Ejemplo de uso en un controlador de autenticación:
 * const user = await User.findOne({ email: req.body.email });
 * if (user && await user.comparePassword(req.body.password)) {
 *   // Autenticación exitosa
 * } else {
 *   // Contraseña incorrecta
 * }
 */
UserSchema.methods.comparePassword = async function(candidatePassword) {
    // Compara la contraseña candidata con el hash almacenado (this.password)
    return await bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model('User', UserSchema);
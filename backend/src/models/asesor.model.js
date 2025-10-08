import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const AsesorSchema = new mongoose.Schema({
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
        enum: ['asesor'],
        default: 'asesor'
    }
}, { timestamps: true });


// 🔑 HOOK PRE-SAVE PARA HASHEAR LA CONTRASEÑA
AsesorSchema.pre('save', async function(next) {
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
 * @memberof AsesorSchema.methods
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
AsesorSchema.methods.comparePassword = async function(candidatePassword) {
    // Compara la contraseña candidata con el hash almacenado (this.password)
    return await bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model('Asesor', AsesorSchema);
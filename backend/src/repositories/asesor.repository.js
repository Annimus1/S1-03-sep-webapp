import Asesor from '../models/asesor.model.js';

class AsesorRepository {
  // Buscar usuario por email
  static async findByEmail(email) {
    return Asesor.findOne({ email });
  }

  // Crear usuario
  static async createAsesor(data) {
    const asesor = new Asesor(data);
    return asesor.save(); // pre-save hook de mongoose hará el hash de password
  }

 /**
   * Verifica las credenciales de un asesor buscando por email y comparando la contraseña.
   *
   * Este método utiliza el método de instancia 'comparePassword' del esquema Mongoose
   * para verificar el hash de la contraseña de manera segura.
   *
   * @async
   * @param {string} email - El correo electrónico del usuario (clave de búsqueda).
   * @param {string} candidatePassword - La contraseña en texto plano proporcionada por el usuario.
   * @returns {Promise<object|null>} Retorna el objeto del asesor (documento Mongoose) si las credenciales son válidas,
   * o `null` si el asesor no existe o la contraseña es incorrecta.
   * @throws {Error} Si ocurre un error durante la búsqueda en la base de datos o la verificación de bcrypt.
  */
  static async verifyCredentials(email, candidatePassword) {
    try {
      const asesor = await Asesor.findOne({ email });

      if (!asesor) {
        return null; // Usuario no encontrado.
      }

      const isMatch = await asesor.comparePassword(candidatePassword);

      if (isMatch) {
        return asesor; // Contraseña correcta.
      } else {
        return null; // Contraseña incorrecta.
      }
    } catch (error) {
      console.error("Error al verificar credenciales:", error);
      throw new Error("Error al verificar credenciales del usuario.");
    }
  }
}

export default AsesorRepository;

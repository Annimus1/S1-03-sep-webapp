import User from '../models/user.model.js';

class UserRepository {
  // Buscar usuario por email
  static async findByEmail(email) {
    return User.findOne({ email });
  }

  static async findById(id) {
    return User.findOne({ _id: id });
  }

  // Crear usuario
  static async createUser(data) {
    const user = new User(data);
    return user.save(); // pre-save hook de mongoose hará el hash de password
  }

  /**
    * Verifica las credenciales de un usuario buscando por email y comparando la contraseña.
    *
    * Este método utiliza el método de instancia 'comparePassword' del esquema Mongoose
    * para verificar el hash de la contraseña de manera segura.
    *
    * @async
    * @param {string} email - El correo electrónico del usuario (clave de búsqueda).
    * @param {string} candidatePassword - La contraseña en texto plano proporcionada por el usuario.
    * @returns {Promise<object|null>} Retorna el objeto del usuario (documento Mongoose) si las credenciales son válidas,
    * o `null` si el usuario no existe o la contraseña es incorrecta.
    * @throws {Error} Si ocurre un error durante la búsqueda en la base de datos o la verificación de bcrypt.
   */
  static async verifyCredentials(email, candidatePassword) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return null; // Usuario no encontrado.
      }

      const isMatch = await user.comparePassword(candidatePassword);

      if (isMatch) {
        return user; // Contraseña correcta.
      } else {
        return null; // Contraseña incorrecta.
      }
    } catch (error) {
      console.error("Error al verificar credenciales:", error);
      throw new Error("Error al verificar credenciales del usuario.");
    }
  }

  // Actualizar usuario por ID
  static async updateUser(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }
}

export default UserRepository;

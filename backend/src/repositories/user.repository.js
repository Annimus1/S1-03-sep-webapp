import User from '../models/user.model.js';

class UserRepository {
  // Buscar usuario por email
  static async findByEmail(email) {
    return User.findOne({ email });
  }

  // Crear usuario
  static async createUser(data) {
    const user = new User(data);
    return user.save(); // pre-save hook de mongoose hará el hash de password
  }
}

export default UserRepository;

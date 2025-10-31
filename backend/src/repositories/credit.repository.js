// src/repositories/credit.repository.js
import Credit from '../models/credit.model.js';

class CreditRepository {
  // Crear un nuevo crédito
  static async createCredit(data) {
    const credit = new Credit(data);
    return credit.save();
  }

  // Buscar crédito por ID
  static async findById(id) {
    return Credit.findById(id).populate('userId', 'email nombres apellidos');
  }

  // Buscar créditos por usuario
  static async findByUserId(userId) {
    return Credit.find({ userId }).sort({ createdAt: -1 });
  }
  // Buscar todos los créditos
  static async findAll() {
    return Credit.find().populate('userId', 'email nombres apellidos').sort({ createdAt: -1 });
  }

  // Actualizar crédito por ID
  static async updateCredit(id, updateData) {
    return Credit.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  // Eliminar crédito por ID
  static async deleteCredit(id) {
    return Credit.findByIdAndDelete(id);
  }
}

export default CreditRepository;

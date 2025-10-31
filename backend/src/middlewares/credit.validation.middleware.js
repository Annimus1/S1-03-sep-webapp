import CreditRepository from '../repositories/credit.repository.js';

export const DatosVerificados = async (req, res, next) => {
  const creditId = req.params.id;
  const credit = await CreditRepository.findById(creditId);

  if (!credit) {
    return res.status(404).json({ status: "error", message: "Crédito no encontrado." });
  };

  if (!credit.datosVerificados ) {
    return res.status(400).json({ status: "error", message: "Faltan campos obligatorios en el credito." });
  }
  next();
};
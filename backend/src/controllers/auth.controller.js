import UserRepository from '../repositories/user.repository.js';

export const authController = async (req, res) => {
  try {
    const {
      email,
      password,
      nombreComercial,
      role,
      nombre,
      personalDNI,
      CUIT,
      Cargo,
      empresarialCUIT,
      tipoSocietario,
      domicilioFiscal,
      domicilioComercial,
      actividadEconomicaPrincipal,
      fechaConstitucion,
      numeroRegistro,
      certificadoPyME
    } = req.body;

    // Verificar si el email ya existe
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      console.warn(`Intento de registro con email existente: ${email}`);
      return res.status(400).json({ message: 'No se pudo completar el registro. Verifique los datos ingresados.' });
    }

    // Crear usuario (PyME)
    const newUser = await UserRepository.createUser({
      email,
      password,
      nombreComercial,
      role: role || 'user',
      nombre,
      personalDNI,
      CUIT,
      Cargo,
      empresarialCUIT,
      tipoSocietario,
      domicilioFiscal,
      domicilioComercial,
      actividadEconomicaPrincipal,
      fechaConstitucion,
      numeroRegistro,
      certificadoPyME
    });

    //Respuesta sin password
    const { password: _, ...userSafe } = newUser.toObject();
    return res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      user: userSafe
    });

  } catch (error) {
    console.error('Error registrando usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

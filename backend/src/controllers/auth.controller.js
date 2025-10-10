import tokenRepository from '../repositories/token.repository.js';
import UserRepository from '../repositories/user.repository.js';
import JWT from '../services/jwt.service.js'

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

export const authLoginController = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Verificar si el email ya existe y si la password coincide
    const existingUser = await UserRepository.verifyCredentials(email, password);
    if (!existingUser) {
      console.warn(`Intento de inicio de sesion con email inexistente: ${email}`);
      return res.status(401).json({ message: 'Credenciales invalidas.' });
    }

    // Crear jwt
    const jwt = new JWT();
    const { role, nombre } = existingUser;
    const token = jwt.sign({ nombre, role, email });

    console.log(token);
    // Guardar jwt en cache
    tokenRepository.whitelistToken(existingUser._id, token);
    console.log(`Inicio de sesion: ${email} -> ${token}`)

    // Respuesta
    return res.status(200).json({
      message: 'Inicio de sesion exitoso.',
      user: {
        role,
        nombre,
        email,
        token
      }
    });

  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).json({
        status: 'error',
        message: 'email y password obligatorios.'
      });
    }

    console.error('Error en el inicio de sesion usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

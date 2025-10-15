import AsesorRepository from '../repositories/asesor.repository.js';
import tokenRepository from '../repositories/token.repository.js';
import UserRepository from '../repositories/user.repository.js';
import JWT from '../services/jwt.service.js';

export const authController = async (req, res) => {
  try {
    const {
      email,
      password,
      nombreComercial,
      role,
      nombres,
      apellidos,
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
      pep,
      certificadoPyME
    } = req.body;
    
    // Verificar si el email ya existe
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      console.warn(`Intento de registro con email existente: ${email}`);
      return res.status(400).json({ status: 'error',message: 'No se pudo completar el registro. Verifique los datos ingresados.' });
    }

    // Crear usuario (PyME)
    const newUser = await UserRepository.createUser({
      email,
      password,
      nombreComercial,
      nombres,
      apellidos,
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
      certificadoPyME,
      pep
    });
    // Crear token JWT
    const jwt = new JWT();
    const { role: userRole, nombres: userName, _id } = newUser;
    const token = jwt.sign({ id: _id.toString(),nombres: userName, role: userRole, email });

    // Guardar en Redis (whitelist)
    await tokenRepository.whitelistToken(_id.toString(), token);

    // Respuesta
    return res.status(201).json({
      message: 'Registro de usuario exitoso.',
      user: {
        id: newUser._id,
        role,
        nombres,
        email,
        //token
      }
    });

  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).json({
        status: 'error',
        message: 'email y password obligatorios.'
      });
    }
    console.error('Error registrando usuario:', error);
    return res.status(500).json({ status: 'error',message: 'Error interno del servidor.' });
  }
};

export const authLoginController = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Verificar si el email ya existe y si la password coincide
    let existingUser = await UserRepository.verifyCredentials(email, password);

    if(!existingUser){
      existingUser = await AsesorRepository.verifyCredentials(email, password);
    }

    if (!existingUser) {
      console.warn(`Intento de inicio de sesion con email inexistente: ${email}`);
      return res.status(401).json({ status: "error", message: 'Credenciales invalidas.' });
    }

    // Crear jwt
    const jwt = new JWT();
    const { role, nombres } = existingUser;
    const token = jwt.sign({ id: existingUser._id.toString(),nombres, role, email });

    console.log(token);
    // Guardar jwt en cache
    tokenRepository.whitelistToken(existingUser._id, token);
    console.log(`Inicio de sesion: ${email} -> ${token}`)

    // Respuesta
    return res.status(200).json({
      message: 'Inicio de sesion exitoso.',
      user: {
        id: existingUser._id,
        role,
        nombres,
        email,
        token
      }
    });

  } catch (error) {
    
    console.error('Error en el inicio de sesion usuario:', error);
    
    if (error instanceof TypeError) {
      return res.status(400).json({
        status: 'error',
        message: 'email y password obligatorios.'
      });
    }

    return res.status(500).json({ status: 'error', message: 'Error interno del servidor.' });
  }
};

export const authRegisterAdviserController = async (req, res) => {
  try {
    const {
      email,
      nombres,
      apellidos,
      password
    } = req.body;

    // Verificar si el email ya existe
    const existingUser = await AsesorRepository.findByEmail(email);
    if (existingUser) {
      console.warn(`Intento de registro (asesor) con email existente: ${email}`);
      return res.status(422).json({ 
        status: "error", 
        message: 'No se pudo completar el registro. Verifique los datos ingresados.' });
    }

    // Crear usuario Asesor
    const asesor = await AsesorRepository.createAsesor({
      email,
      nombres,
      apellidos,
      password
    });

    // Crear jwt
    const jwt = new JWT();
    const { role } = asesor;
    const token = jwt.sign({ id: asesor._id.toString(),nombres, role, email });

    // Guardar jwt en cache
    tokenRepository.whitelistToken(asesor._id, token);
    console.log(`Inicio de sesion: ${email} -> ${token}`)

    //Respuesta 
    return res.status(201).json({
      message: 'Asesor registrado exitosamente.',
      user: {
        id : asesor._id, 
        email,
        nombres,
        apellidos,
        role,
        token
      }
    });

  } catch (error) {

    if(error instanceof TypeError){
      return res.status(400).json({ status: "error", message: "email, nombres, apellidos y password son obligatorios." });
    }
    console.error('Error registrando usuario:', error);
    return res.status(500).json({ status: "error", message: 'Error interno del servidor.' });
  }
};


export const authLogoutController = async (req, res) => {
  try {
    const userId = req.user.id; // viene de authenticateToken
    const token = req.token;
    const revoked = await tokenRepository.revokeToken(userId,token);

    if (!revoked) {
      return res.status(401).json({
        status: 'error',
        message: 'No se pudo revocar el token.'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Sesión cerrada correctamente.',
    });

  } catch (error) {
    console.error('Error cerrando sesión:', error);
    return res.status(500).json({ status: 'error', message: 'Error interno al cerrar sesión.' });
  }
};
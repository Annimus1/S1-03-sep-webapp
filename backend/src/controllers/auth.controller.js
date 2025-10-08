const registerUser = async (req, res) => {
  try {
    const { email, password, empresa } = req.body;

    // Aquí iría la lógica real de creación de usuario:
    // - Hash del password
    // - Validación de existencia previa
    // - Inserción en la BD

    return res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente.',
      data: { email, empresa }
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor.'
    });
  }
};

module.exports = { registerUser };

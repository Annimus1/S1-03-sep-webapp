import Joi from 'joi';

/**
 * Esquema Joi para /register
 */
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.base': 'El email debe ser un texto.',
      'string.empty': 'El email es obligatorio.',
      'string.email': 'El email debe tener un formato válido.',
      'any.required': 'El email es obligatorio.'
    }),
  password: Joi.string()
    .min(8)
    .trim()
    .required()
    .messages({
      'string.base': 'La contraseña debe ser un texto.',
      'string.empty': 'La contraseña es obligatoria.',
      'string.min': 'La contraseña debe tener al menos 8 caracteres.',
      'any.required': 'La contraseña es obligatoria.'
    }),
  empresa: Joi.string()
    .min(3)
    .trim()
    .required()
    .messages({
      'string.base': 'El nombre de la empresa debe ser un texto.',
      'string.empty': 'El nombre de la empresa es obligatorio.',
      'string.min': 'El nombre de la empresa debe tener al menos 3 caracteres.',
      'any.required': 'El nombre de la empresa debe tener al menos 3 caracteres.',
      'any.required': 'El nombre de la empresa es obligatorio.'
    })
});

export const validateRegister = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    return res.status(422).json({
      status: 'error',
      message: 'Datos de registro inválidos.',
      errors
    });
  }

  req.body = value;
  next();
};

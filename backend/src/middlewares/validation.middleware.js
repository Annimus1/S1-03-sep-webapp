import Joi from 'joi';

/**
 * Esquema Joi para /register
 */
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required(),

  password: Joi.string()
    .min(8)
    .trim()
    .required(),

  nombre: Joi.string()
    .trim()
    .required(),

  personalDNI: Joi.string()
    .trim()
    .required(),

  CUIT: Joi.string()
    .trim()
    .required(),

  Cargo: Joi.string()
    .trim()
    .required(),

  nombreComercial: Joi.string()
    .trim()
    .required(),

  empresarialCUIT: Joi.string()
    .trim()
    .required(),

  tipoSocietario: Joi.string()
    .trim()
    .required(),

  domicilioFiscal: Joi.string()
    .trim()
    .required(),

  domicilioComercial: Joi.string()
    .trim()
    .required(),

  actividadEconomicaPrincipal: Joi.string()
    .trim()
    .required(),

  fechaConstitucion: Joi.date()
    .required(),

  numeroRegistro: Joi.string()
    .trim()
    .required(),

  certificadoPyME: Joi.boolean()
    .optional()
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


const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required(),

  password: Joi.string()
    .min(8)
    .trim()
    .required()
});
export const validationLogin = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body, {
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
}

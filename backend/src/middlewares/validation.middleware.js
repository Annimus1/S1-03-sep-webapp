import Joi from 'joi';

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario.
 *           example: "jhondoe.01@gmail.com"
 *         password:
 *           type: string
 *           description: Password del usuario mayor o igual a 8 caracteres.
 *           example: "-JhonDoe#1234"
 *         nombres:
 *           type: string
 *           description: Nombres del Usuario.
 *           example: "Juan"
 *         apellidos:
 *           type: string
 *           description: Apellido del Usuario.
 *           example: "Perez"
 *         CUIT:
 *           type: string
 *           description: CUIT del Usuario.
 *           example: "27-45585198-3"
 *         personalDNI:
 *           type: string
 *           description: "DNI del Usuario."
 *           example: "45585198"
 *         Cargo:
 *           type: string
 *           description: Cargo del Usuario en la empresa.
 *           example: "CEO"
 *         nombreComercial:
 *           type: string
 *           description: Nombre comercial de la empresa.
 *           example: "Kredia S.A."
 *         empresarialCUIT:
 *           type: string
 *           description: CUIT de la empresa.
 *           example: "30-71048762-1"
 *         tipoSocietario:
 *           type: string
 *           description: Tipo societario de la empresa (SRL, SA, SAS, EIRL, etc.).
 *           example: "SRL"
 *         domicilioFiscal:
 *           type: string
 *           description: Domicilio fiscal de la empresa.
 *           example: "Calle Falsa 123, CABA"
 *         domicilioComercial:
 *           type: string
 *           description: Domicilio comercial de la empresa.
 *           example: "Calle Falsa 123, CABA"
 *         actividadEconomicaPrincipal:
 *           type: string
 *           description: Actividad económica principal de la empresa.
 *           example: "Comercio al por mayor de productos alimenticios"
 *         fechaConstitucion:
 *           type: string
 *           format: date
 *           description: Fecha de constitución de la empresa.
 *           example: "2020-01-15"
 *         numeroRegistro:
 *           type: string
 *           description: Número de registro mercantil de la empresa.
 *           example: "123456789"
 *         pep:
 *           type: boolean
 *           description: Indica si el usuario es una Persona Expuesta Políticamente (Sí/No).
 *           example: false
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

  nombres: Joi.string()
    .trim()
    .required(),
  apellidos: Joi.string()
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
    .optional(),
  pep: Joi.boolean()
    .required()
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


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario.
 *           example: "jhondoe.01@gmail.com"
 *         password:
 *           type: string
 *           description: Password del usuario mayor o igual a 8 caracteres.
 *           example: "-JhonDoe#1234"
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Registro-asesor:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario.
 *           example: "janedoe.08@kredia.com"
 *         nombres:
 *           type: string
 *           description: Nombres del asesor.
 *           example: "Jane Sophia"
 *         apellidos:
 *           type: string
 *           description: Apellidos del asesor.
 *           example: "Doe Smith"
 *         password:
 *           type: string
 *           description: Password del usuario mayor o igual a 8 caracteres.
 *           example: "-JaneDoe#1234"
 */
const RegisterAdviserSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^@\s]+@kredia\.com$/i)
    .message('"email" debe ser una dirección válida de kredia.com.')
    .trim()
    .lowercase()
    .required(),
  
  nombres: Joi.string()
    .trim()
    .required(),
  
  apellidos: Joi.string()
    .trim()
    .required(),

  password: Joi.string()
    .min(8)
    .trim()
    .required()
});
export const validateRegisterAdviser = (req, res, next) => {
    const { error, value } = RegisterAdviserSchema.validate(req.body, {
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

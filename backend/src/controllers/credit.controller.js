import sgMail from '@sendgrid/mail';
import CreditRepository from '../repositories/credit.repository.js';
import StorageRepository from '../repositories/storage.repository.js';

export const createCredit = async (req, res) => {
  try {
    const userId = req.user.id;
    const monto_credito = req.body.monto_credito;
    const plazos = req.body.plazos;
    const userCredits = await CreditRepository.findByUserId(userId);

    if (userCredits.length > 0) {
      const allFinished = userCredits.every(c =>
        c.estatus === 'aprobado' || c.estatus === 'rechazado'
      );
      if (!allFinished) {
        return res.status(403).json({
          data: {
            status: 'error',
            message: 'No puede iniciar un nuevo crédito hasta que todos los anteriores estén aprobados o rechazados.'
          }
        });
      }
    }
    const newCredit = await CreditRepository.createCredit({
      userId,
      monto_credito,
      plazos,
      estatus: 'recaudacion_documentos',
      createdAt: new Date(),
    });

    return res.status(201).json({
      data: {
        status: 'success',
        message: 'Crédito creado exitosamente.',
        credit: newCredit
      }
    });

  } catch (error) {
    console.error('Error en createCredit:', error);
    return res.status(500).json({
      data: {
        status: 'error',
        message: 'Error interno del servidor.'
      }
    });
  }
};

export const statusCheck = async (req, res) => {
  const credits = await CreditRepository.findAll({ userId: req.user.id })
  if (!credits) {
    res.status(404).json({ credit: null });
  }

  const response = credits.filter(credit => credit.estatus === "recaudacion_documentos")
  if (response.length < 1) {
    res.status(404).json({ credit: null });
  }

  res.status(200).json({ credit: response[0] })
}

export const uploadCreditFiles = async (req, res) => {
  try {
    const paramId = req.params.id;
    const descripcionNegocio = req.body.descripcionNegocio;
    const creditType = req.body.creditType;
    if (descripcionNegocio) {
      await CreditRepository.updateCredit(paramId, { descripcionNegocio: descripcionNegocio });
    }
    const credit = await CreditRepository.findById(paramId);
    if (!credit) {
      return res.status(404).json({
        data: {
          status: 'error',
          message: 'No se encontró ningún crédito para este usuario.'
        }
      });
    }

    //Carga de archivos
    const fileKeys = Object.keys(req.files || {});

    if (fileKeys.length === 0) {
      return res.status(400).json({
        data: {
          status: 'error',
          message: 'No se recibieron archivos.'
        }
      });
    }
    const errors = [];

    // Procesar cada archivo
    for (const key of fileKeys) {
      const file = req.files[key][0];
      try {
        const keyName = file.fieldname;
        const url = await StorageRepository.upload(credit._id, file);

        const updatedField = { [keyName]: url };
        await CreditRepository.updateCredit(credit._id, updatedField);
        await CreditRepository.updateCredit(credit._id, { $inc: { actualDocumentos: 1 } });
      } catch (err) {
        console.error(`[uploadCreditFiles]: Error con ${file.fieldname}`, err);
        errors.push({ status: 'error', message: `Error procesando ${file.fieldname}` });
      }
    }

    // Respuesta con errores parciales
    if (errors.length > 0) {
      return res.status(422).json({ status: 'partial_error', errors });
    }


    // 1. Lista de todos los campos de archivos requeridos
    const archivosRequeridos = [
      // STEP 2 - Información financiera
      'ddjjImpositivas',
      'detalleCuentas',
      'comprobanteImpuestos',
      'ingresosEgresosMensuales',
      'proyeccionFlujoFondos',
      'registroVentasCompras',
      'planFinancieroCredito',
      // STEP 3 - Información operativa
      'principalesClientes',
      'principalesProveedores',
      'comprobanteFacturacion',
      // STEP 5 - Validación crediticia
      'constanciaCBU',
      'certificadoLibreDeuda',
      'referenciasComerciales',
      'informeCrediticio',
      'ddjjQuiebra',
      'documentoDeuda',
      'ddjjOrigenLicito',
      'ddjjBeneficiarioFinal',
      'consentimientoAnalisis'
    ];
    if (credit.creditType === 'capital_trabajo') {
      archivosRequeridos.push('proyeccionFlujoOperativo',
        'gastosOperativos',)
      await CreditRepository.updateCredit(credit._id, { creditType: creditType });

    };
    const archivosNuevos = req.files || {};
    const todosCargados = archivosRequeridos.every(campo => archivosNuevos[campo] || credit[campo]);

    if (todosCargados && credit.descripcionNegocio) {
      await CreditRepository.updateCredit(credit._id, { datosVerificados: true });
    }
    const updatedCredit = await CreditRepository.findById(credit._id);
    // Emitir notificación en tiempo real al asesor
    const io = req.app.get('io');
    io.emit('actualizacionCredito', {
      message: 'Nuevo archivo cargado para revision',
      creditId: updatedCredit._id,
      user: updatedCredit.userId
    });

    return res.status(201).json({
      data: {
        files: Object.keys(req.files),
        message: 'Archivos procesados correctamente.',
        credit: updatedCredit,
      }
    });


  } catch (error) {
    console.error('Error general en uploadCreditFiles:', error);
    return res.status(500).json({
      data: { status: 'error', message: 'Error interno del servidor.' }
    });
  }
};

export const getCreditById = async (req, res) => {
  try {
    const paramId = req.params.id;
    const credit = await CreditRepository.findById(paramId);
    if (!credit) {
      return res.status(404).json({
        data: {
          status: 'error',
          message: 'No se encontró ningún crédito para este usuario.'
        }
      });
    } else {
      return res.status(200).json({
        data: {
          status: 'success',
          message: 'Crédito encontrado.',
          credit: credit
        }
      });
    }
  } catch (error) {
    console.error('Error en getCreditByUser:', error);
    return res.status(500).json({
      data: { status: 'error', message: 'Error interno del servidor.' }
    });
  }
};

export const getCredits = async (req, res) => {
  try {
    const credits = await CreditRepository.findAll();

    // Si no hay créditos
    if (!credits || credits.length === 0) {
      return res.status(404).json({
        data: {
          status: 'not_found',
          message: 'No se encontraron créditos registrados.'
        }
      });
    }

    // Si encuentra créditos
    return res.status(200).json({
      data: {
        status: 'success',
        message: 'Créditos obtenidos correctamente.',
        credits: credits
      }
    });
  } catch (error) {
    return res.status(500).json({
      data: {
        status: 'error',
        message: 'Error interno del servidor.',
        details: error.message
      }
    });
  }
};

export const desicionCredit = async (req, res) => {
  try {
    const creditId = req.params.id;
    const { estatus } = req.body;
    const credit = await CreditRepository.findById(creditId);
    if (!credit) {
      return res.status(404).json({
        data: {
          status: 'error',
          message: 'No se encontró el crédito para actualizar.'
        }
      });
    }
    if (estatus === 'aprobado') {
      const updatedCredit =  await CreditRepository.updateCredit(credit._id, { estatus: 'aprobado' });
        // Emitir notificación en tiempo real al user
      const io = req.app.get('io');
      io.emit('aprobacionCredito', {
        message: 'Credito aprobado',
        creditId: updatedCredit._id,
        user: updatedCredit.userId
      });
      //Enviar email de bienvenida
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
          to: credit.userId.email,
          from: 'krediawebapp@gmail.com', 
          subject: '¡Felicidades! Tu crédito ha sido aprobado',
          text: 'Tu crédito ha sido aprobado exitosamente.',
          html: `<div style="font-family: 'Trebuchet MS', 'Segoe UI', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #0D6546; color: white; padding: 20px; text-align: center; text-size: 24px; font-weight: bold;">
            <h2> ¡Felicidades, ${credit.userId.nombres || 'Usuario'}!</h2>
          </div>
          <div style="padding: 20px; text-align: left;">
            <p style="font-size: 16px;">
            Tenemos buenas noticias! Tu solicitud de crédito fue <strong>aprobada con éxito</strong>.</p>
            <p style="font-size: 16px;">
            <br>
            Ya podés revisar los detalles en tu perfil.<br>
            Pronto el asesor realizará el desembolso de tu crédito. Recibirás una notificación cuando el monto esté en tu cuenta.</p>
            <a href="http://ec2-3-145-192-140.us-east-2.compute.amazonaws.com/" 
              style="display: inline-block; background-color: #F39C12; color: black; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px; text-align: center;">
              Ir a mi cuenta
            </a>
          </div>
          <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 13px; color: #777;">
            <p>Gracias por confiar en <strong>Kredia</strong>.Estamos aquí para apoyar el crecimiento de tu PyME.</p>
            <p>Este es un mensaje automático, no respondas a este correo.</p>
          </div>
        </div>
        `,
      }
      sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error('Error al enviar el email',error)
          })
    }

    if (estatus === 'rechazado') {
      const updatedCredit = await CreditRepository.updateCredit(credit._id, { estatus: 'rechazado' });
        // Emitir notificación en tiempo real al user
      const io = req.app.get('io');
      io.emit('rechazoCredito', {
        message: 'Credito rechazado',
        creditId: updatedCredit._id,
        user: updatedCredit.userId
      });
      //Enviar email de bienvenida
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
          to: credit.userId.email,
          from: 'krediawebapp@gmail.com', 
          subject: 'Lo sentimos! Tu crédito ha sido rechazado',
          text: 'Tu crédito ha sido rechazado.',
          html:  `
            <div style="font-family: 'Trebuchet MS', 'Segoe UI', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
              <div style="background-color: #952014; color: white; padding: 20px; text-align: center; text-size: 24px; font-weight: bold;">
                <h2>Rechazo del Crédito</h2>
              </div>
              <div style="padding: 20px; text-align: left;">
                <p style="font-size: 16px;">
                Gracias por completar tu solicitud, ${credit.userId.nombres || 'Usuario'}.</p>
                <p style="font-size: 16px;">
                En esta ocasión, no pudimos aprobar tu crédito, pero no te desanimes.
                Sabemos que cada negocio es distinto y queremos ayudarte a estar más cerca de una próxima aprobación. 
                Muy pronto podrás acceder a nuevas oportunidades adaptadas a tu perfil.</p>
                <p style="font-size: 16px;">¿Tienes dudas o necesitas asesoría? Estamos para ayudarte</p>
                <a href="http://ec2-3-145-192-140.us-east-2.compute.amazonaws.com/"
                  style="display: inline-block; background-color: #F39C12; color: black; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px;text-align: center;">
                  Chatea con nosotros
                </a>
              </div>
              <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 13px; color: #777;">
                <p>Gracias por confiar en <strong>Kredia</strong>.Estamos aquí para apoyar el crecimiento de tu PyME.</p>
                <p>Este es un mensaje automático, no respondas a este correo.</p>
              </div>
            </div>
            `,
      }
      sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error('Error al enviar el email',error)
          })
    }
    return res.status(200).json({
      data: {
        status: 'success',
        message: 'Crédito actualizado correctamente.',
      }
    });
  } catch (error) {
    console.error('Error en updateCreditStatus:', error);
    return res.status(500).json({
      data: {
        status: 'error',
        message: 'Error interno del servidor.',
        details: error.message
      }
    });
  }
};
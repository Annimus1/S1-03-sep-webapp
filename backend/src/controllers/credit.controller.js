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
          message: 'No se encontró ningún crédito para este usuario.' }
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
      return res.status(422).json({status: 'partial_error', errors});
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
      await CreditRepository.updateCredit(credit._id,{creditType : creditType});

    };
    const archivosNuevos = req.files || {};
    const todosCargados = archivosRequeridos.every(campo => archivosNuevos[campo] || credit[campo]);

    if (todosCargados && credit.descripcionNegocio) {
      await CreditRepository.updateCredit(credit._id,{datosVerificados: true});
    }

    const updatedCredit = await CreditRepository.findById(credit._id);
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
          message: 'No se encontró ningún crédito para este usuario.' }
      });
    } else {
      return res.status(200).json({
        data: {
          status: 'success',
          message: 'Crédito encontrado.',
          credit : credit
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
    console.error('Error en getCredits:', error);
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
    const  {estatus}  = req.body;
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
      console.log('Actualizando estatus a aprobado para el crédito:', creditId);
      await CreditRepository.updateCredit(credit._id, { estatus: 'aprobado' });
    }

    if (estatus === 'rechazado') {
      console.log('Actualizando estatus a rechazado para el crédito:', creditId);
      await CreditRepository.updateCredit(credit._id, { estatus: 'rechazado' });
    }
    const updatedCredit = await CreditRepository.findById(creditId);

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
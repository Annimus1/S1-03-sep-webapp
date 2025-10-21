import CreditRepository from '../repositories/credit.repository.js';
import StorageRepository from '../repositories/storage.repository.js';

export const uploadCreditFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileKeys = Object.keys(req.files || {});

    if (fileKeys.length === 0) {
      return res.status(400).json({
        data: { status: 'error', message: 'No se recibieron archivos.' }
      });
    }

    // Buscar o crear crédito
    let existingCredits = await CreditRepository.findByUserId(userId);
    let credit = existingCredits?.[0];

    // Permitir solo un crédito por usuario
    if (!credit) {
      credit = await CreditRepository.createCredit({
        userId,
        creditType: req.body.creditType || 'inversion',
      });
    }

    const errors = [];

    // Procesar cada archivo
    for (const key of fileKeys) {
      const file = req.files[key][0];
      try {
        const keyName = file.fieldname;
        const url = await StorageRepository.upload(userId, file);

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
      return res.status(422).json(errors);
    }


    // Verificas si se cargó el archivo específico
    // 1. Lista de todos los campos de archivos requeridos
    const archivosRequeridos = [
      // STEP 2 - Información financiera
      'ddjjImpositivas',
      'detalleCuentas',
      'comprobanteImpuestos',
      'proyeccionFlujoFondos',
      'registroVentasCompras',
      'planFinancieroCredito',
      // STEP 3 - Información operativa
      'principalesClientes',
      'principalesProveedores',
      'comprobanteFacturacion',
      // CREDITO INVERSION/EXPANSION
      'planImplementacion',
      'permisosObra',
      'facturaProforma',
      // STEP 4 - Propósito del crédito
      'detalleFondos',
      'proyeccionFlujoOperativo',
      'gastosOperativos',
      'evidenciaExpancion',
      // STEP 5 - Validación crediticia
      'constanciaCBU',
      'certificadoLibreDeuda',
      'historialPrestamos',
      'referenciasComerciales',
      'informeCrediticio',
      'detalleCreditos',
      'referenciasBancarias',
      'ddjjQuiebra',
      'titutoPropiedad',
      'tasaOficial',
      'avalSolidario',
      'comprobanteGarantes',
      'cesionSGR',
      'informeRegistral',
      'seguro',
      'declaracionPatrimonialGarante',
      'documentoDeuda',
      'ddjjOrigenLicito',
      'ddjjBeneficiarioFinal',
      'consentimientoAnalisis',
      'constanciaPoliticasInternas'
    ];
    const todosCargados = archivosRequeridos.every(campo => req.files && req.files[campo]);

    if (todosCargados) {
      await CreditRepository.updateCredit(credit._id,{datosVerificados: 'true'});
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
    const userId = req.user.id;
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

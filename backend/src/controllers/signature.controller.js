import CreditRepository from '../repositories/credit.repository.js';
import StorageRepository from '../repositories/storage.repository.js';
import UserRepository from '../repositories/user.repository.js';
import { generatePdfContract, signContract } from '../services/signature.service.js';


/**
 * Controlador de Express para cargar un contrato y una firma, firmar el PDF
 * y almacenar el documento final.
 * * * @async
 * @exports signContractController
 * @param {object} req - Objeto de solicitud (Request) de Express.
 * @param {object} req.params - Parámetros de la URL.
 * @param {string} req.params.id - ID del crédito a actualizar.
 * @param {object} req.files - Archivos cargados por Multer (Buffer de la firma y el contrato).
 * @param {Array<object>} req.files.signature - Array con el objeto del archivo PNG de la firma.
 * @param {Array<object>} req.files.contract - Array con el objeto del archivo PDF del contrato.
 * @param {object} req.user - Objeto de usuario autenticado (se asume que contiene `id`).
 * @param {object} res - Objeto de respuesta (Response) de Express.
 * @returns {Promise<void>} No devuelve un valor, sino que responde con un JSON de éxito o un error 500.
 */
export const signContractController = async (req, res) => {
  const signatureFile = req.files.signature?.[0];
  const contract = req.files.contract?.[0];
  const paramId = req.params.id
  
  // Verificación de archivo
  if (!signatureFile) {
    return res.status(400).send('Falta el archivo de firma (signature).');
  }

  if (!contract) {
    return res.status(400).send('Falta el archivo de contrato (contract).');
  }

  try {
    // Proceso de firma: toma el Buffer del contrato y el Buffer de la firma PNG.
    const contractBufferSigned = await signContract(contract.buffer, signatureFile.buffer);
    
    // Preparar el archivo firmado para ser subido al repositorio de almacenamiento.
    const file = {
      buffer : contractBufferSigned,
      fieldname : "contract",
      originalname: "Contract.pdf" 
    }

    // Guardar el archivo firmado en el almacenamiento de la aplicación.
    const firmaDigital = await StorageRepository.upload(req.user.id, file);
    
    // Actualizar el registro del crédito con la referencia del archivo firmado
    // y cambiar su estatus a 'revision'.
    const updatedCredit = await CreditRepository.updateCredit(paramId, { firmaDigital, estatus: 'revision' });
    // Emitir notificación en tiempo real al asesor
    const io = req.app.get('io');
    io.emit('nuevoCredito', {
      message: 'Nuevo contrato para revision',
      creditId: updatedCredit._id,
      user: updatedCredit.userId
    });
    // Respuesta exitosa al cliente.
    res.status(200).json({status: "success", message:"Archivo cargado exitosamente"});

  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error en el procesamiento del contrato: ${error.message}`);
  }
}

/**
 * Controlador de Express para la generación y descarga de un contrato de crédito.
 * * @async
 * @exports contractController
 * @param {object} req - Objeto de solicitud (Request) de Express.
 * @param {object} req.params - Parámetros de la URL.
 * @param {string} req.params.id - ID del crédito a buscar en la base de datos (paramId).
 * @param {object} res - Objeto de respuesta (Response) de Express.
 * @returns {Promise<void>} No devuelve un valor, sino que envía el PDF o un error al cliente.
 */
export const contractController = async (req, res) => {

  const paramId = req.params.id
  const credit = await CreditRepository.findById(paramId);

  const creditUserId = credit.userId?._id?.toString() || credit.userId?.toString();
  const user = await UserRepository.findById(creditUserId);

  const fechaActual = new Date(); 
  const desembolso = new Date(fechaActual); 
  const primer_pago = new Date(fechaActual);
  const DIAS_DESEMBOLSO = 15; // Días para el desembolso desde la fecha actual

  // Cálculo de fechas futuras
  desembolso.setDate(fechaActual.getDate() + DIAS_DESEMBOLSO);
  primer_pago.setDate(fechaActual.getDate() + (30 + DIAS_DESEMBOLSO)); // 30 días después del desembolso

  // Objeto de datos que será usado por generatePdfContract
  const DATOS_DEL_CONTRATO = {
    razon_social: user.nombreComercial,
    cuit: user.empresarialCUIT,
    domicilio: user.domicilioFiscal,
    monto_credito: credit?.monto_credito || 'ARS 1,500,000.00', // Valor por defecto si falta
    tipo_credito: credit.creditType == 'inversion' ? 'Inversión' : 'Capital de Trabajo',
    plazo_total: credit?.plazos || '24 meses', // Valor por defecto si falta
    // Formatea las fechas a YYYY-MM-DD
    fecha_desembolso: desembolso.toISOString().split('T')[0], 
    fecha_primer_vencimiento: primer_pago.toISOString().split('T')[0],
  };

  try {
    // Generar el Buffer del PDF
    const pdfBuffer = await generatePdfContract(DATOS_DEL_CONTRATO);

    // Configurar cabeceras para la descarga del archivo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Contrato_Kredia_${DATOS_DEL_CONTRATO.cuit}.pdf`);
    
    // Enviar el PDF al cliente
    res.send(pdfBuffer);

  } catch (error) {
    console.error(`Error al procesar el contrato para ID ${paramId}:`, error.message);
    res.status(500).send('Error al generar el contrato PDF.');
  }
}
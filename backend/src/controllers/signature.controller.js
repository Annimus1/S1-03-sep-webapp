import CreditRepository from '../repositories/credit.repository.js';
import UserRepository from '../repositories/user.repository.js';
import { generatePdfContract, signContract } from '../services/signature.service.js';

export const signContractController = async (req, res) => {
  const signatureFile = req.files.signature?.[0];

  const DATOS_DEL_CONTRATO = {
    razon_social: 'TECNO SOLUTIONS S.R.L.',
    cuit: '30-71234567-8',
    domicilio: 'Av. Corrientes 1500, Piso 5',
    monto_credito: 'ARS 1,500,000.00',
    tipo_credito: 'Capital de Trabajo',
    plazo_total: '24 meses',
    fecha_desembolso: '20 de Noviembre de 2025',
    fecha_primer_vencimiento: '20 de Diciembre de 2025',
  };

  // Verificación de archivo
  if (!signatureFile) {
    return res.status(400).send('Falta el archivo de firma (signature).');
  }

  try {
    // 1. Generar el PDF rellenado
    const pdfBuffer = await generatePdfContract(DATOS_DEL_CONTRATO);

    // 2. Firmar el PDF (usando el Buffer del archivo cargado)
    const contractBufferSigned = await signContract(pdfBuffer, signatureFile.buffer);

    // 3. Enviar el PDF final al cliente
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Contrato_Firmado_${DATOS_DEL_CONTRATO.cuit}.pdf`);
    res.send(contractBufferSigned);

  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error en el procesamiento del contrato: ${error.message}`);
  }
}

/**
 * @fileoverview Controlador para generar dinámicamente el contrato PDF de crédito.
 * * Esta función es un controlador de Express que recupera los datos de un crédito
 * y la información del usuario de las bases de datos (mediante CreditRepository
 * y UserRepository), calcula las fechas de desembolso y primer pago, rellena
 * un objeto de datos de contrato y genera el PDF final para su descarga.
 * * Requiere que las funciones 'CreditRepository.findById', 'UserRepository.findById'
 * y 'generatePdfContract' estén definidas en el contexto global o importadas.
 */

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
    cuit: user.CUIT,
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
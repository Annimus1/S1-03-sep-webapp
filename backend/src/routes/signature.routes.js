import path from 'path';
import { Buffer } from 'buffer';
import { Router } from 'express';
import { readFile } from 'fs/promises'; 
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { signatureUploadMiddleware } from '../middlewares/signature.middleware.js'

const router = Router();

// /usr/src/app/src/contrato/Contrato_final_Kredia.pdf
const TEMPLATE_PATH = path.join(process.cwd(), 'src', 'contrato', 'Contrato_final_Kredia.pdf');
const FONT_SIZE = 10;
const PAGE_INDEX = 0; // La página 1 del PDF

/**
 * Mapeo de campos a coordenadas para el documento Kredia.
 */
const FIELD_COORDINATES = {
    // Datos del PRESTATARIO (Página 1, parte superior)
    razon_social: { page: 0, x: 90, y: 596 },
    cuit: { page: 0, x: 330, y: 596 },
    domicilio: { page: 0, x: 180, y: 578 },

    // Condiciones Particulares (Página 1, sección inferior)
    monto_credito: { page: 0, x: 190, y: 262 },
    tipo_credito: { page: 0, x: 180, y: 247 },
    plazo_total: { page: 0, x: 155, y: 232 },
    fecha_desembolso: { page: 0, x: 205, y: 217 },
    fecha_primer_vencimiento: { page: 0, x: 245, y: 142 },
    // Si agregas más campos (ej. firma en página 4), los pondrías aquí
};

const SIGNATURE_COORDINATES = { 
    page: 3, // Página 4 del PDF (índice 3)
    x: 340, 
    y: 270, 
    scaleFactor: 1,
};


/**
 * Genera el documento PDF final rellenando la plantilla con los datos.
 * @param {object} datos - Objeto con la información del contrato.
 * @returns {Promise<Buffer>} El PDF como un Buffer.
 */
async function generatePdfContract(datos) {
    try {
        const existingPdfBytes = await readFile(TEMPLATE_PATH);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // 💡 OBTENEMOS TODAS LAS PÁGINAS DEL DOCUMENTO
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontColor = rgb(0, 0, 0);

        // 3. Iterar sobre las coordenadas y dibujar el texto en la página correcta
        for (const [key, { page: pageIndex, x, y }] of Object.entries(FIELD_COORDINATES)) {
            const text = datos[key] || '';
            
            // SELECCIONAMOS LA PÁGINA BASÁNDONOS EN EL ÍNDICE
            const targetPage = pages[pageIndex]; 
            
            if (!targetPage) {
                console.warn(`Error: No se encontró la página con índice ${pageIndex}. El PDF podría no tener esa cantidad de páginas.`);
                continue; // Salta si la página no existe
            }

            targetPage.drawText(text, {
                x,
                y,
                size: FONT_SIZE,
                font,
                color: fontColor,
            });
        }

        // 4. Guardar el nuevo PDF como Buffer (contendrá todas las páginas cargadas)
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
        
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        throw new Error('Fallo en la generación del contrato');
    }
}


/**
 * Coloca una imagen de firma PNG en el documento PDF (Buffer)
 * @param {Buffer} contractBuffer - El Buffer del PDF (sin firmar).
 * @param {Buffer} signatureBuffer - El Buffer de la imagen PNG de la firma.
 * @returns {Promise<Buffer>} El PDF firmado como un Buffer.
 */
async function signContract(contractBuffer, signatureBuffer) {
    try {
        // 1. Cargar el documento PDF
        const pdfDoc = await PDFDocument.load(contractBuffer);
        
        // 2. Incrustar la imagen PNG
        const embeddedImage = await pdfDoc.embedPng(signatureBuffer);
        
        // 3. Calcular dimensiones escaladas
        const imageDims = embeddedImage.scale(SIGNATURE_COORDINATES.scaleFactor);
        
        // 4. Seleccionar la página (Página 4, índice 3)
        const pages = pdfDoc.getPages();
        const targetPage = pages[SIGNATURE_COORDINATES.page]; 

        if (!targetPage) {
             throw new Error(`La plantilla no tiene la página de índice ${SIGNATURE_COORDINATES.page}.`);
        }

        // 5. Dibujar la imagen
        targetPage.drawImage(embeddedImage, {
            x: SIGNATURE_COORDINATES.x,
            y: SIGNATURE_COORDINATES.y,
            width: imageDims.width, 
            height: imageDims.height,
        });

        // 6. Guardar y devolver el Buffer
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
        
    } catch (error) {
        console.error('Error al firmar el PDF:', error);
        throw new Error('Fallo en el proceso de colocación de la firma.'); 
    }
}

// -------------------------------------------------------------

router.post('/sign', signatureUploadMiddleware, async (req, res) => {
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
});

router.get('/contract', async (req, res) => {
    // 💡 2. Los datos del contrato deberían venir de un cuerpo de solicitud (POST) o de parámetros (GET), 
    // pero para este ejemplo, los mantenemos hardcodeados.
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

    try {
        // 3. Llamar a la función principal y obtener el PDF como Buffer
        const pdfBuffer = await generatePdfContract(DATOS_DEL_CONTRATO);


        // 4. Enviar el PDF al cliente
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Contrato_Kredia_${DATOS_DEL_CONTRATO.cuit}.pdf`);
        res.send(pdfBuffer);
        
    } catch (error) {
        // 5. Manejar errores y responder con un código de estado apropiado
        console.error(error.message);
        res.status(500).send('Error al generar el contrato PDF.');
    }
});

export default router;

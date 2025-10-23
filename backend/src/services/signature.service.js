import path from 'path';
import { Buffer } from 'buffer';
import { readFile } from 'fs/promises'; 
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// /usr/src/app/src/contrato/Contrato_final_Kredia.pdf
const TEMPLATE_PATH = path.join(process.cwd(), 'src', 'contrato', 'Contrato_final_Kredia.pdf');
const FONT_SIZE = 10;

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
export async function generatePdfContract(datos) {
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
export async function signContract(contractBuffer, signatureBuffer) {
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
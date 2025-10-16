import fs from 'fs';
import path from 'path';

/**
 * @typedef {object} MulterFile
 * @property {string} originalname - Nombre original del archivo.
 * @property {string} fieldname - Nombre del campo del formulario.
 * @property {string} mimetype - Tipo MIME del archivo.
 * @property {Buffer} buffer - El contenido binario del archivo (gracias a memoryStorage).
 * @property {number} size - El tamaño del archivo.
 */

class LocalStorage {
    /** @type {string} */
    uploadDir = path.join(process.cwd(), 'uploads');
    
    /** @type {string} */
    baseUrl = `http://localhost:${process.env.PORT}/api/v1/uploads/`;

    constructor() {
        // Asegura que el directorio 'uploads' exista al inicializar la clase
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
            console.log(`[LocalStorage]: Directorio creado: ${this.uploadDir}`);
        }
    }

    /**
     * Guarda el archivo (buffer) de Multer en el disco local.
     * @param {MulterFile} file - El objeto de archivo de Multer.
     * @returns {Promise<string>} La URL completa del archivo guardado.
     */
    async upload(userId, file) {
        if (!file || !file.buffer) {
            throw new Error("El objeto 'file' es inválido o no contiene un buffer.");
        }

        // 1. Generar un nombre de archivo único para evitar colisiones
        const fileExtension = path.extname(file.originalname);
        // Usamos el fieldname para identificar el tipo de documento, más un timestamp
        const baseName = `${userId}_${file.fieldname}_${Date.now()}`; 
        const fileName = baseName + fileExtension;
        
        // 2. Definir la ruta completa donde se guardará el archivo
        const filePath = path.join(this.uploadDir, fileName);

        try {
            // 3. Escribir el buffer binario en el disco de forma asíncrona
            await fs.promises.writeFile(filePath, file.buffer);
            
            // 4. Construir la URL de acceso que se guardará en la base de datos
            const fileUrl = this.baseUrl + fileName;
            
            console.log(`[LocalStorage]: Archivo ${fileName} guardado con éxito en: ${filePath}`);

            return fileUrl;
        } catch (error) {
            console.error(`[LocalStorage]: Error al escribir el archivo ${fileName}:`, error);
            throw new Error(`Fallo al guardar el archivo: ${error.message}`);
        }
    }

    /**
     * Obtiene la RUTA ABSOLUTA al archivo dado su nombre (para usar con res.sendFile).
     * @param {string} filename - El nombre del archivo guardado (ej: 123_estatutoSocial_1678.pdf).
     * @returns {Promise<string>} La RUTA ABSOLUTA al archivo.
     * @throws {Error} Si el archivo no existe.
     */
    async getFile(filename) { // 👈 Este es el método modificado
        if (!filename) {
            throw new Error("El nombre del archivo (filename) no puede ser nulo.");
        }

        // 1. Construir la ruta absoluta
        const filePath = path.join(this.uploadDir, filename);

        try {
            // 2. Verificar si el archivo existe
            // Usar fs.constants.F_OK para verificar accesibilidad (es más ligero que stat)
            await fs.promises.access(filePath, fs.constants.F_OK); 
            
            console.log(`[LocalStorage]: Archivo encontrado. Devolviendo ruta: ${filePath}`);

            // 3. Devolver la ruta absoluta
            return filePath; 
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`[LocalStorage]: Archivo no encontrado: ${filename}`);
                throw new Error(`Archivo no encontrado`);
            }
            console.error(`[LocalStorage]: Error al intentar acceder al archivo ${filename}:`, error);
            throw new Error(`Error al acceder al archivo`);
        }
    }

    
}

export default new LocalStorage();
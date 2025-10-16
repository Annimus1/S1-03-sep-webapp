import multer from 'multer';
import path from 'path';

const UPLOAD_DIR = 'uploads'; // <- ruta donde se van a guardar los datos

// const storage = multer.memoryStorage(); / multer.diskStorage()
const storage = multer.memoryStorage({
    // Define el directorio donde se guardarán los archivos
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); 
    },
    
    // Define el nombre que tendrá el archivo guardado
    filename: (req, file, cb) => {
        // Genera un nombre único: nombre_campo-timestamp.extensión
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Obtiene .pdf
        // Por ejemplo: estatutoSocial-1678886400000-123456789.pdf
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

// Instancia de Multer
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50 }, // Límite de 50MB por archivo (opcional)
    fileFilter: (req, file, cb) => {
        // Asegurar que solo se acepten PDFs
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            // Rechazar el archivo
            cb(new Error(`El archivo ${file.originalname} no es un PDF válido.`), false);
        }
    }
});

export default upload;
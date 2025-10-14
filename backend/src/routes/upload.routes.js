import { Router } from 'express';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Ruta POST para la subida de archivos
router.post('/upload', upload.single("archivo"), function (req, res, next) {
    console.log("archivo:", req.body)
    console.log("archivo:", req.file)
    res.json(req.file)
})


export default router;

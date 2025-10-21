import { Router } from 'express';
import { uploadCreditFiles } from '../controllers/credit.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { filesCreditMiddleware } from '../middlewares/upload.middleware.js';

const router = Router();


router.post('/upload', authenticateToken, filesCreditMiddleware, uploadCreditFiles)
export default router;

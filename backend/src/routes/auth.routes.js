import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validateRegister } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/', validateRegister, authController);

export default router;

import { Router } from 'express';
import { authController, authLoginController } from '../controllers/auth.controller.js';
import { validateRegister, validationLogin } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', validateRegister, authController);


// 422 -> datos invalidos
// 401 -> credenciales invalidas
// 200 -> todo ok 
router.post('/login', validationLogin, authLoginController)

export default router;

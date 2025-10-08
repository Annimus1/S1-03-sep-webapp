const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/auth.controller');
const { validateRegister } = require('../middlewares/validation.middleware');

// Aplica el middleware antes del controlador
router.post('/register', validateRegister, registerUser);

module.exports = router;

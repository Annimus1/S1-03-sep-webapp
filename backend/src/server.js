import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

// Importar swagger
import swaggerUi from 'swagger-ui-express'; // Importar swagger-ui-express
import swaggerSpec from '../swagger.js';

// Importar los módulos locales
import authRoutes from './routes/auth.routes.js';
import creditRoutes from './routes/credit.routes.js';
import uploadRoutes from './routes/upload.routes.js';
// --- 1. CONFIGURACIÓN INICIAL ---
const app = express();

// --- 2. MIDDLEWARES GLOBALES Y DE SEGURIDAD ---
// CORS
const corsOptions = {
    // Usar variable de entorno para el origen del frontend
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

// Helmet: Mejora la seguridad con varios headers HTTP
app.use(helmet());

// Middleware para parsear el body de peticiones JSON
//app.use(express.json()); 

// --- 3. MONTAJE DE RUTAS ---
// Montar la interfaz de usuario de Swaggerq
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Montar router
app.use('/api/v1', uploadRoutes);
app.use('/api/v1/credit', creditRoutes);
app.use('/api/v1/auth',express.json(), authRoutes); 

// Ruta de prueba simple
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API del Proyecto funcionando. ¡Bienvenido!',
        version: 'v1'
    });
});

// --- 4. MANEJO DE ERRORES Y RUTAS NO ENCONTRADAS ---
// Middleware para manejar rutas 404 (Debe ir antes del error handler)
app.use((req, res) => {
    res.status(404).json({error: `Ruta No Encontrada: ${req.originalUrl}`})
});


// Exportar la instancia de la aplicación Express
export default app;

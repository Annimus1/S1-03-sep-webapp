import 'dotenv/config'; // 1. Cargar variables de entorno desde .env
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import CacheSingleton from './database/CacheSingleton.js';
import DatabaseSingleton from './database/DatabaseSingleton.js';
import app from './server.js';


// Define el puerto, usando la variable de entorno o el 3001 por defecto
const PORT = process.env.PORT || 5001;

/**
 * Función principal para iniciar la aplicación.
 */
async function startServer() {
    try {
        // 2. CONEXIÓN A LA BASE DE DATOS Y CACHÉ (Fail-Fast)
        // Intenta conectar a MongoDB y Redis usando los Singletons. 
        // Si fallan, el Singleton ejecutará un 'process.exit(1)'.
        await DatabaseSingleton.connect();
        await CacheSingleton.connect(); 

        // Crear el servidor HTTP a partir de Express
        const server = http.createServer(app);

        // Crear instancia de Socket.io y configurar CORS
        const io = new SocketServer(server, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:5173",
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        // Escuchar eventos de conexión
        io.on('connection', (socket) => {
            console.log(`🔌 Cliente conectado: ${socket.id}`);

            socket.on('disconnect', () => {
                console.log(`❌ Cliente desconectado: ${socket.id}`);
            });
        });

        // Guardar la instancia en app para usarla en rutas
        app.set('io', io);


        // 3. INICIAR EL SERVIDOR EXPRESS
        server.listen(PORT, () => {
            console.log('----------------------------------------------------');
            console.log(`✨ Servidor Express escuchando en el puerto ${PORT}`);
            console.log(`🌐 Accede a la API en: http://localhost:${PORT}/`);
            console.log(`🌐 Accede a la Documentacion en: http://localhost:${PORT}/api/v1/docs/`);
            console.log('----------------------------------------------------');
        });

    } catch (error) {
        // En caso de que la lógica de inicialización falle antes del fail-fast
        console.error('❌ Error fatal al iniciar la aplicación:', error.message);
        // Usar un código de salida distinto de cero para indicar fallo
        process.exit(1); 
    }
}

// Ejecutar la función de inicio
startServer();
import 'dotenv/config'; // 1. Cargar variables de entorno desde .env
import CacheSingleton from './database/CacheSingleton.js';
import DatabaseSingleton from './database/DatabaseSingleton.js';
import app from './server.js';

// Define el puerto, usando la variable de entorno o el 3001 por defecto
const PORT = process.env.PORT || 3001;

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

        // 3. INICIAR EL SERVIDOR EXPRESS
        app.listen(PORT, () => {
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
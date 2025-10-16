import mongoose from 'mongoose';

/**
 * Clase que implementa el patrón Singleton para la conexión a MongoDB.
 * Garantiza que solo exista una instancia de conexión Mongoose en toda la aplicación.
 */
class DatabaseSingleton {
    
    // Almacena la única instancia de esta clase.
    static instance = null;
    
    // Almacena el objeto de conexión de Mongoose.
    connection = null;

    /**
     * El constructor es privado para forzar el uso de la instancia única.
     * Si ya existe una instancia, la retorna.
     */
    constructor() {
        if (DatabaseSingleton.instance) {
            return DatabaseSingleton.instance;
        }
        DatabaseSingleton.instance = this;
    }

    /**
     * Conecta a MongoDB o retorna la conexión existente.
     * Implementa el principio Fail-Fast.
     * @returns {Promise<mongoose.Connection>} El objeto de conexión.
     */
    async connect() {
        // 1. Reutilizar la conexión si ya está establecida
        if (this.connection && this.connection.readyState === 1) {
            console.log('🔌 MongoDB ya está conectado. Reutilizando instancia.');
            return this.connection;
        }

        // 2. Obtener la URI
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            console.error('❌ Error: MONGO_URI no está definido en el entorno.');
            process.exit(1); // Fail-Fast
        }

        try {
            // 3. Establecer la nueva conexión
            const options = {};
            
            this.connection = await mongoose.connect(MONGO_URI, options);
            console.log('🔌 Conectado a MongoDB satisfactoriamente.');
            
            // Manejo de eventos de conexión después del inicio
            this.connection.connection.on('error', (err) => {
                console.error('❌ Error de conexión post-inicialización:', err);
            });

            return this.connection;

        } catch (error) {
            // 4. Manejo de errores 
            console.error('❌ Error fatal al conectar con MongoDB:', error.message);
            // Termina el proceso si no se puede conectar a la DB (ADR 007)
            process.exit(1); 
        }
    }
}

// Exportar la instancia única (Singleton) para ser usada en toda la aplicación.
export default new DatabaseSingleton();
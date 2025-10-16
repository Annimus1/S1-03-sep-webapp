import { createClient } from 'redis';

/**
 * Clase que implementa el patrón Singleton para la conexión a Redis.
 * Centraliza el cliente de Redis y asegura una única instancia.
 */
class CacheSingleton {
    // Almacena la única instancia de esta clase.
    static instance = null;
    
    // Almacena el objeto del cliente Redis.
    client = null;
    
    /**
     * El constructor es privado para forzar el uso de la instancia única.
    */
   constructor() {
        if (CacheSingleton.instance) {
            return CacheSingleton.instance;
        }
        
        const REDIS_URI = process.env.REDIS_URI;
        if (!REDIS_URI) {
            console.error('❌ Error: REDIS_URI no está definido en el entorno.');
            process.exit(1); // Fail-Fast por falta de configuración
        }

        // Crea el cliente Redis
        this.client = createClient({ url: REDIS_URI });

        // Manejo de eventos de error
        this.client.on('error', (err) => {
            console.error('❌ Error fatal de conexión a Redis:', err.message);
            // Si el error ocurre durante el inicio, el proceso debe terminar
            if (!this.client.isReady) {
                process.exit(1); 
            }
        });

        CacheSingleton.instance = this;
    }

    /**
     * Conecta al servidor Redis.
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.client.isReady) {
            console.log('⚡ Redis ya está conectado. Reutilizando instancia.');
            return;
        }
        
        try {
            await this.client.connect();
            console.log('⚡ Conectado a Redis satisfactoriamente.');
        } catch (error) {
             // El evento 'error' anterior ya debería manejar el Fail-Fast, 
             // pero capturamos por si acaso.
            console.error('❌ Fallo al iniciar la conexión Redis:', error.message);
            process.exit(1); // Fail-Fast
        }
    }

    /**
     * Obtiene un valor de la caché.
     * @param {string} key
     * @returns {Promise<string | null>}
     */
    async get(key) {
        if (!this.client.isReady) return null;
        return this.client.get(key);
    }

    /**
     * Establece un valor en la caché con un tiempo de expiración.
     * @param {string} key
     * @param {string} value
     * @param {number} expiryInSeconds Tiempo de expiración (por defecto: 1 hora)
     * @returns {Promise<string | null>}
     */
    async set(key, value, expiryInSeconds = 3600) {
        if (!this.client.isReady) return null;
        // NX: solo establecer si la clave no existe (opcional)
        return this.client.set(key, value, { EX: expiryInSeconds });
    }
    
    /**
     * Elimina una clave de la caché. Útil para el Logout/Revocación de JWT.
     * @param {string} key
     * @returns {Promise<number>} Número de claves eliminadas
     */
    async del(key) {
        if (!this.client.isReady) return 0;
        return this.client.del(key);
    }

    /**
     * Cierra la conexión al servidor Redis. 🔑 CLAVE para las pruebas.
     * @returns {Promise<void>}
     */
    async quit() {
        if (this.client.isReady) {
            await this.client.quit();
            CacheSingleton.instance = null; 
            console.log('⚡ Conexión a Redis Singleton cerrada.');
        }
    }
}

// Exportar la instancia única (Singleton)
export default new CacheSingleton();
//import SupabaseStorage from '../services/supabase.service.js'; // Adaptador por defecto
import LocalStorage from '../services/localStorage.service.js'; // Adaptador alternativo para pruebas
class StorageRepository {
    static instance = null;
    adapter = null;

    constructor() {
        if (StorageRepository.instance) {
            // Este caso NUNCA debería ejecutarse si se usa getInstance() correctamente
            throw new Error("Usa StorageRepository.getInstance() para obtener la instancia única.");
        }
        this.adapter = LocalStorage;
    }

    static getInstance() {
        if (!StorageRepository.instance) {
            StorageRepository.instance = new StorageRepository();
        }
        return StorageRepository.instance;
    }

    setAdapter(adapter) {
        if (!adapter || typeof adapter.upload !== 'function' || typeof adapter.getFile !== 'function') {
            throw new Error("El adaptador debe ser un objeto con un método 'upload'.");
        }
        this.adapter = adapter;
        console.log(`StorageRepository: Adaptador cambiado a ${adapter.constructor.name}`);
    }

    async upload(userId, file) {
        // Llama al método del adaptador actual (Supabase, Firebase, etc.)
        return await this.adapter.upload(userId, file);
    }

    async getFile(filename){
        return await this.adapter.getFile(filename);
    }
}

export default StorageRepository.getInstance();
import { createClient } from '@supabase/supabase-js';
import path from 'path';

/**
 * @typedef {object} MulterFile
 * @property {string} originalname - Nombre original del archivo.
 * @property {string} fieldname - Nombre del campo del formulario.
 * @property {string} mimetype - Tipo MIME del archivo.
 * @property {Buffer} buffer - El contenido binario del archivo (gracias a memoryStorage).
 * @property {number} size - El tamaño del archivo.
 */
class SupabaseStorage {

  constructor() {
    this.supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY)
  }

  /**
 * Sube un archivo a un bucket de Supabase Storage, asignándole un nombre único.
 *
 * @async
 * @param {string} userId - El ID único del usuario, utilizado como nombre de la carpeta de destino en el bucket.
 * @param {object} file - El objeto del archivo a subir (generalmente proveniente de Multer o similar).
 * @param {Buffer} file.buffer - Los datos binarios del archivo.
 * @param {string} file.originalname - El nombre original del archivo (para extraer la extensión).
 * @param {string} file.fieldname - El nombre del campo del formulario (útil para identificar el tipo de documento).
 * @param {string} file.mimetype - El tipo MIME del archivo (ej: 'image/jpeg', 'application/pdf').
 * @returns {Promise<string>} La ruta completa (fullPath) del archivo dentro del bucket de Supabase (ej: 'nombre_unico.pdf').
 * @throws {Error} Si el objeto 'file' es inválido (no tiene buffer) o si la subida a Supabase falla.
 */
  async upload(userId, file) {
    if (!file || !file.buffer) {
      throw new Error("El objeto 'file' es inválido o no contiene un buffer.");
    }

    // 1. Generar un nombre de archivo único para evitar colisiones
    const fileExtension = path.extname(file.originalname);
    // Usamos el fieldname para identificar el tipo de documento, más un timestamp
    const baseName = `${userId}_${file.fieldname}_${Date.now()}`;
    const fileName = baseName + fileExtension;

    const { data, error } = await this.supabase.storage.from('documents')
      .upload(
        fileName,
        file.buffer,
        {
          contentType: file.mimetype,
          upsert: false
        });

    if (error) {
      console.error(`[SupabaseStorage]: Error al escribir el archivo ${fileName}:`, error);
      throw new Error(`Fallo al guardar el archivo: ${error.message}`);
    } else {
      console.log(data)
      return `${process.env.API_URL}/uploads/${data.path}`;
    }
  }

  /**
   * Obtiene la URL de acceso público para un archivo específico en el bucket 'documents'.
   * Esta función asume que el archivo está guardado en la raíz del bucket con el 'filename' como ruta.
   * * @async
   * @param {string} filename - El nombre único del archivo que actúa como su ruta en el bucket.
   * @returns {Promise<string>} La URL pública del archivo.
   * @throws {Error} Si el nombre del archivo es nulo o si no se puede generar la URL pública (archivo no encontrado).
   */
  async getFile(filename) {
    if (!filename) {
      throw new Error("El nombre del archivo (filename) no puede ser nulo.");
    }

    const { data, error } = this.supabase.storage
      .from('documents')
      .getPublicUrl(filename);

    if (error) {
      console.error(`[SupabaseStorage]: Error al obtener URL para ${filename}:`, error);
      throw new Error(`Error al acceder al archivo: ${error.message}`);
    }

    if (!data || !data.publicUrl) {
      console.log("No se pudo generar URL para archivo:", filename);
      throw new Error("Archivo no encontrado o acceso denegado.");
    }

    return { type: "URL", value: data.publicUrl };
  }
}

export default new SupabaseStorage();
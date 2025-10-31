import StorageRepository from '../repositories/storage.repository.js';
import UserRepository from '../repositories/user.repository.js';

export const validateAccountFiles = async (req, res) => {
    const ID = req.user.id;
    const files = Object.keys(req.files).map(key => req.files[key][0]);
    const errors = [];
    const updatedInfo = {};

    // Crear un array de Promesas para subir todos los archivos concurrentemente
    const uploadPromises = files.map(async file => {
        try {
            const keyName = file.fieldname;

            const url = await StorageRepository.upload(ID, file);

            updatedInfo[keyName] = url;
        }
        catch (error) {
            console.error(`Error procesando archivo ${file.fieldname}:`, error);
            errors.push({ status: "error", message: `Error mientras procesaba ${file.fieldname}` });
            return null;
        }
    });

    try {
        await Promise.all(uploadPromises);

        // Verificar si hubo errores de subida
        if (errors.length > 0) {
            return res.status(422).json({
                errors
            });
        }

        if (Object.keys(updatedInfo).length > 0) {
            await UserRepository.updateUser(ID, updatedInfo);
        }

        // Verificar si todos los campos ya estan llenos (no son null)
        const requiredFields = [
            'estatutoSocial',
            'actaDesignacionAutoridades',
            'poderRepresentante',
            'inscripcionFiscal',
            'comprobanteDomicilioFiscal',
            'certificadoPyMes',
            'DeclaracionJurada',
            'DNI',
            'comprobanteDomicilioPersonal'
        ];


        let user = await UserRepository.findByEmail(req.user.email);
        const allFieldsArePresent = requiredFields.every(field => user[field]);

        if (allFieldsArePresent) {
            user = await UserRepository.updateUser(ID, { datosVerificados: true });
        }


        res.status(200).json({
            message: 'Archivos subidos correctamente.',
            filesUpdated: Object.keys(updatedInfo),
            datosVerificados: user.datosVerificados
        });

    } catch (dbError) {
        // Captura errores si falló la única llamada a UserRepository.updateUser
        console.error('Error al actualizar el usuario en la DB:', dbError);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor al actualizar la información del usuario.'
        });
    }
}

export const singleResourceController = async (req, res) => {
    try {
        const filename = req.params.resource;
        const { type, value } = await StorageRepository.getFile(filename);

        if (type === 'URL') {
            // Si viene de Supabase
            res.redirect(302, value);
        } else if (type === 'LOCAL_PATH') {
            // Si viene de LocalStorage
            res.sendFile(value);
        }

        return;
    }
    catch (error) {
        const isNotFound = error.message.includes('Archivo no encontrado');
        const status = isNotFound ? 404 : 500;

        res.status(status).json({ status: 'error', message: `${error.message}` });
        return;
    }
}
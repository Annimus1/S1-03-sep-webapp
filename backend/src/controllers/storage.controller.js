import UserRepository from '../repositories/user.repository.js';
import StorageRepository from '../repositories/storage.repository.js';

export const validateAccountFiles = async (req, res) => {
    const ID = req.user.id;
    const fileKeys = Object.keys(req.files);
    const files = [];
    const errors = [];


    fileKeys.forEach(key => {
        files.push(req.files[key][0]);
    })

    files.map(async file => {
        try {
            const keyName = file.fieldname // <-obtiene la key actual
            const url = await StorageRepository.upload(req.user.id, file); // genera el Path del archivo
            const updatedField = {
                [keyName] : url 
            };

            await UserRepository.updateUser(ID, updatedField);

        }
        catch (error) {
            console.log(error)
            errors.push({ status: "error", message: `Error mientras procesaba ${file.fieldname}` })
        }
        finally{
            console.log(await UserRepository.findByEmail(req.user.email))
        }
    })

    if (errors.length > 0) {
        res.status(422).json({ errors });
        return;
    }

    res.status(200).json({
        message: 'Archivos procesados correctamente.',
        files: Object.keys(req.files) // Indica qué archivos se recibieron
    });
}

export const singleResourceController = async (req,res)=>{
    try{
        const filename = req.params.resource;
        const absolutePath = await StorageRepository.getFile(filename);   
        res.sendFile(absolutePath);
        return;
    }
    catch(error){
        const isNotFound = error.message.includes('Archivo no encontrado');
        const status = isNotFound ? 404 : 500;
        
        res.status(status).json({status:'error', message:`${error.message}`});
        return;
    }
}
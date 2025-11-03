import UserRepository from "../repositories/user.repository.js";

/**
 * Controlador que obtiene un usuario por su ID y responde en JSON.
 *
 * @async
 * @param {import('express').Request} req - Objeto Request de Express. Debe incluir `req.params.id` con el ID del usuario.
 * @param {import('express').Response} res - Objeto Response de Express.
 * @returns {Promise<void>} Responde:
 *   - 200 y el objeto usuario cuando se encuentra.
 *   - 404 y `{ status: "error", message: "Usuario no encontrado." }` cuando no existe.
 *
 * @example
 * // GET /users/:id
 * // => res.status(200).json(user) || res.status(404).json({ status: "error", message: "Usuario no encontrado." })
 *
 * @throws {Error} Propaga errores lanzados por `UserRepository.findById`. Asegúrate de tener middleware de manejo de errores.
 */
export const userController = async (req, res) => {

    const paramId = req.params.id;

    const user = await UserRepository.findById(paramId);
    if (!user){
        res.status(404).json({status:"error", message:"Usuario no encontrado."})
        return;
    }
    
    res.status(200).json(user);
    return
}
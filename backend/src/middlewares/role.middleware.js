import CreditRepository from '../repositories/credit.repository.js';

export const authenticateCreditandRole = async (req, res, next) => {
    const id = req.user.id;
    const role = req.user.role;
    const paramId = req.params.id
    const credit = await CreditRepository.findById(paramId);
    if(!credit){
        res.status(404).send({error:"No se encontró el crédito", message:""});
        return;
    }
    try{
        const creditUserId = credit.userId?._id?.toString() || credit.userId?.toString();
        if(id == creditUserId || role == 'asesor'){
            next();
            return;
        }
        res.status(403).send({error:"Fobidden", message:"No esta autorizado a ver este crédito"});
    }catch (err) {
    console.error("[authenticateCreditandRole] Error:", err);
    return res.status(500).json({
      error: "Error interno",
      message: err.message
    });
  }
};


export const authenticateRoleAsesor = async (req, res, next) => {
    const id = req.user.id;
    const role = req.user.role;
    
    if(role == 'asesor'){
        next();
        return;
    }

    res.status(403).send({error:"Forbidden", message:"No esta autorizado a ver estos créditos"});
}

import { UserAvatar } from "../../../../globals/components/atomos/UserAvatar";
import { VerifyButton } from "../atomos/VerifyButton";
import { InfoRow } from "../moleculas/InfoRow";
import { UserContext } from "../../../../stores/UserContext.jsx";
import { useContext } from "react";

export const UserInfoCard = () => {
  const {user, isLoading} = useContext(UserContext);   

  if(isLoading){ 
    return (
      <div style={{
        background: 'white',
        borderRadius: '40px',
        padding: '28px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center' // Añadido para mejor visualización
      }}>
        Cargando datos ...
      </div>
    );
  }
  
  return (
    <div style={{
      background: 'white',
      borderRadius: '40px',
      padding: '28px',
      margin: '0 auto',
      width: '100%',
    }}>
      <UserAvatar />
      <div style={{marginTop: '-25px'}}>
        <InfoRow 
          // Usar los datos del Context (user.nombres) o el valor de la prop (name) como fallback
          leftLabel="Nombre"
          leftValue={user?.user?.nombres} 
          rightLabel="Empresa"
          rightValue={user?.user?.companyName}
        />
      </div>
      
      <div style={{marginTop: '-25px'}}>
        <InfoRow 
          leftLabel="Email"
          leftValue={user?.user?.email } // Uso de encadenamiento opcional (?) para seguridad
          rightLabel="Score"
          rightValue={'100 pts'} // Asumiendo que 'score' también podría venir del usuario
        />
      </div>
      
      <div style={{marginTop: '-10px'}}>
        <VerifyButton />
      </div>
    </div>
  );
};
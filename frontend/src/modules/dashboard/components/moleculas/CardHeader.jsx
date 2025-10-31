import { StatusIcon } from "../atomos/StatusIcon";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const CardHeader = ({ 
  title, 
  showButton = false, 
  buttonText = 'Ver mi solicitud',
  onButtonClick 
}) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '12px'
  }}>
    <h5 style={{
      color: '#2C3E50',
      fontSize: '18px',
      fontWeight: '600',
      margin: 0
    }}>
      {title}
    </h5>
    
    {showButton && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <StatusIcon type="eye" />
        <BotonAnimado 
          variante="naranja"
          onClick={onButtonClick}
        >
          {buttonText}
        </BotonAnimado>
      </div>
    )}
  </div>
);
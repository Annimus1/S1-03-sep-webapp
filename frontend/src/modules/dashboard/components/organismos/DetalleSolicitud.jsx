import { GridContainer } from "../../../../globals/components/atomos/GridContainer";
import { LabelDetalle } from "../atomos/LabelDetalle";
import { StatusIcon } from "../atomos/StatusIcon";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const DetalleSolicitud = ( { height = '100%', columns = '1fr 1fr', buttonText, onButtonClick} ) => (
  <div style={{
    backgroundColor: '#5BE2C580',
    borderRadius: '40px',
    padding: '24px',
    height: height
  }}>
    <h5 style={{
      color: '#2C3E50',
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '10px'
    }}>Detalle de solicitud</h5>
    
    <GridContainer columns={columns} gap="0px">
      <div style={{ padding: '5px' }}>
        <LabelDetalle text = "Miguel Solis"/>
        <LabelDetalle text = "Amount" valor="00.00"/>
      </div>
      <div style={{ padding: '5px' }  }>
        <LabelDetalle text = "ID de la solicitud" valor="000000"/>
        <LabelDetalle text = "Estado" valor="Pendiente"/>
      </div>
    </GridContainer>
    <div style={{ display: 'flex',alignItems: 'center', justifyContent:'center', marginTop: '16px'}}>
      <StatusIcon type="eye" />
      <BotonAnimado 
        variante="naranja"
        onClick={onButtonClick}
        height="20px"
      >
        Ver Detalles
      </BotonAnimado>
    </div>  
  </div>
);
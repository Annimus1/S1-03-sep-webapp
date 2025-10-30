import { useEffect, useState } from "react";
import BotonTablaAmortizacion from "../../../formulario/components/organismos/BotonTablaAmortizacion";


export const ProximosPagosCard = ({height = '100%'}) => {
  const [credito, setCredito] = useState(null);
  useEffect(()=>{
    try{
      const localStorageCredit = JSON.parse(window.localStorage.getItem('creditInfo'));
      const credit = localStorageCredit?.credit;
      if(credit) setCredito(credit);
    }
    catch(err){}
  },[]);
  return (
  <div style={{
    background: 'linear-gradient(135deg, #7FE8D8 0%, #5EDCC6 100%)',
    borderRadius: '40px',
    padding: '24px',
    height: height
  }}>
    <div style={{display:'flex', padding:'5px'}}>
    <h5 style={{
      color: '#2C3E50',
      fontSize: '19px',
      fontWeight: '700',
      marginBottom: '10px'
    }}>Próximos pagos</h5>

    {
      credito &&
      <BotonTablaAmortizacion type={"table"} monto={credito.monto_credito} meses={credito.plazos} fechaInicio={new Date(credito.updatedAt)}/>
    }
    </div>

    <p style={{
      color: '#2C3E50',
      fontSize: '14px',
      margin: 0
    }}>Tabla de amortización detallada</p>
  </div>
)};
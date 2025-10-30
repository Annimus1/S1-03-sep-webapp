import { ModuloAmortizacion } from "./TablaAmortizacion";
import styles from '../../../visualizarDocumentos/styles/DocumentosAdjuntados.module.css';
import { ModuloAmortizacionDashboard } from "./TablaAmortizacionDasboard";

export default function BotonTablaAmortizacion ({ type = "button", monto, meses, fechaInicio}) {

  return(
    <>
    {type == 'button' && <ModuloAmortizacion monto={monto} meses={meses} fechaInicioPrestamo={fechaInicio}/>}
    {type == 'table' && <ModuloAmortizacionDashboard monto={monto} meses={meses} fechaInicioPrestamo={fechaInicio}/>}
    </>
  );
}


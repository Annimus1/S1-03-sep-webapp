import { InfoRow } from "../moleculas/InfoRow";
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';


export const PaymentSummary = ({ pagoMensual, capitalTotal, interesesTotales, ultimoPago }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        margin: '0 0 8px 0',
        fontSize: '14px',
        fontWeight: '500',
        color: '#666'
      }}>
        Pago Mensual
      </h3>
      
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '24px'
      }}>
        USD ${pagoMensual}
      </div>

      <InfoRow label="Capital Total" value={`$${capitalTotal}`} />
      <InfoRow label="Intereses Totales" value={`$${interesesTotales}`} />
      <InfoRow label="Último Pago" value={ultimoPago} />

      <p style={{
        fontSize: '12px',
        color: '#666',
        lineHeight: '1.5',
        marginTop: '16px',
        marginBottom: '24px'
      }}>
        *Los valores mostrados no constituyen una oferta formal y podrían variar según evaluación comercial
      </p>

      <BotonAnimado ancho="completo" variante="morado">
        Descargar detalle
      </BotonAnimado>
    </div>
  );
};
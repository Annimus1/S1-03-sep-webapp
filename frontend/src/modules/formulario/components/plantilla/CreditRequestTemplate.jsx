import { CreditForm } from "../organismos/CreditForm";
import { PaymentSummary } from "../organismos/PaymentSummary";
import { useState } from "react";

export const CreditRequestTemplate = () => {
  const [monto, setMonto] = useState(25000);
  const [plazoAnios, setPlazoAnios] = useState(6);
  const [tasaInteres, setTasaInteres] = useState(20);
  const [fechaInicio, setFechaInicio] = useState('10 / 2025');
  const [fechaInicioInput, setFechaInicioInput] = useState('2025-10');
  const [selectedAmount, setSelectedAmount] = useState('25K');

  // Calcular pago mensual
  const calcularPagoMensual = () => {
    const meses = plazoAnios * 12;
    const tasaMensual = tasaInteres / 100 / 12;
    
    if (tasaMensual === 0) {
      return (monto / meses).toFixed(2);
    }
    
    const pago = (monto * tasaMensual * Math.pow(1 + tasaMensual, meses)) / 
                 (Math.pow(1 + tasaMensual, meses) - 1);
    return pago.toFixed(2);
  };

  // Calcular total a pagar
  const calcularTotalPagar = () => {
    const meses = plazoAnios * 12;
    return (calcularPagoMensual() * meses).toFixed(2);
  };

  // Calcular intereses totales
  const calcularInteresesTotales = () => {
    return (calcularTotalPagar() - monto).toFixed(2);
  };

  // Calcular fecha del último pago
  const calcularUltimoPago = () => {
    const [mes, anio] = fechaInicio.split(' / ');
    const mesInicio = parseInt(mes);
    const anioInicio = parseInt(anio);
    
    const mesesTotales = plazoAnios * 12;
    const mesUltimo = (mesInicio + mesesTotales - 1) % 12 || 12;
    const anioUltimo = anioInicio + Math.floor((mesInicio + mesesTotales - 1) / 12);
    
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${meses[mesUltimo - 1]} ${anioUltimo}`;
  };

  const formatearNumero = (numero) => {
    return Number(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div style={{
      backgroundColor: '#F3F4F6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#93E8D3',
        borderRadius: '24px',
        padding: '80px 48px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start'
        }}>
          <CreditForm 
            monto={monto}
            setMonto={setMonto}
            plazoAnios={plazoAnios}
            setPlazoAnios={setPlazoAnios}
            tasaInteres={tasaInteres}
            setTasaInteres={setTasaInteres}
            fechaInicio={fechaInicio}
            setFechaInicio={setFechaInicio}
            fechaInicioInput={fechaInicioInput}
            setFechaInicioInput={setFechaInicioInput}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
          />
          <PaymentSummary 
            pagoMensual={formatearNumero(calcularPagoMensual())}
            capitalTotal={formatearNumero(monto)}
            interesesTotales={formatearNumero(calcularInteresesTotales())}
            ultimoPago={calcularUltimoPago()}
          />
        </div>
      </div>
    </div>
  );
};
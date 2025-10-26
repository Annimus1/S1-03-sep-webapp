import { useState } from 'react';
import { Input } from '../atomos/Input';
import { AmountSelector } from '../moleculas/AmountSelector';
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';

export const CreditForm = ({ monto, setMonto, plazoAnios, setPlazoAnios, tasaInteres, setTasaInteres, fechaInicio, setFechaInicio, fechaInicioInput, setFechaInicioInput, selectedAmount, setSelectedAmount, setPasoActual }) => {
  
  const handleMontoChange = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '');
    setMonto(Number(valor) || 0);
    setSelectedAmount('');
  };

  const handleAmountSelect = (amount) => {
    const valores = {
      '2.5K': 2500,
      '12.5K': 12500,
      '25K': 25000,
      '40K': 40000,
      '55.5K': 55500
    };
    setMonto(valores[amount]);
    setSelectedAmount(amount);
  };

  const handleFechaChange = (e) => {
    const valor = e.target.value; // Formato: "2025-10"
    setFechaInicioInput(valor);
    
    if (valor) {
      const [anio, mes] = valor.split('-');
      setFechaInicio(`${mes} / ${anio}`);
    }
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div>
        <h2 style={{
          margin: '0 0 24px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#1F2937'
        }}>
          Monto Solicitado
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#1F2937',
            fontWeight: '500'
          }}>
            Monto del Crédito
          </label>
          <Input
            value={`$ ${monto.toLocaleString()}`}
            onChange={handleMontoChange}
            prefix="USD"
          />
        </div>

        <AmountSelector
          selectedAmount={selectedAmount}
          onSelectAmount={handleAmountSelect}
        />
      </div>

      <div>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          color: '#1F2937',
          fontWeight: '500'
        }}>
          Plazo del crédito (anual)
        </label>
        <Input
          value={plazoAnios}
          onChange={(e) => setPlazoAnios(Number(e.target.value) || 1)}
          suffix="años"
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#1F2937',
            fontWeight: '500'
          }}>
            Taza de interés anual
          </label>
          <Input
            value={tasaInteres}
            onChange={(e) => setTasaInteres(Number(e.target.value) || 0)}
            suffix="%"
          />
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#1F2937',
            fontWeight: '500'
          }}>
            Fecha de inicio
          </label>
          <Input
            type="month"
            value={fechaInicioInput}
            onChange={handleFechaChange}
          />
        </div>
      </div>

      <BotonAnimado ancho="completo" variante="naranja" onClick={() => { setPasoActual(1); }}>
        Iniciar mi solicitud crédito PyME
      </BotonAnimado>
    </div>
  );
};
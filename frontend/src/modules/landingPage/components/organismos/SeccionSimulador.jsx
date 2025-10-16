import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

/**
 * Calculadora interactiva de crédito
 * Permite a los usuarios simular su crédito con diferentes montos y plazos
 */
export const SeccionSimulador = () => {
  // Estados para controlar los valores del simulador
  const [monto, setMonto] = useState(25000); // Monto del crédito solicitado
  const [meses, setMeses] = useState(12); // Plazo en meses
  const [tasaInteres] = useState(20); // Tasa de interés anual (fija)
  
  /**
   * Calcula el pago mensual usando la fórmula de amortización
   * Fórmula: P = (M * r * (1 + r)^n) / ((1 + r)^n - 1)
   * Donde: P = pago, M = monto, r = tasa mensual, n = número de meses
   */

  const calcularPago = () => {
    const tasaMensual = tasaInteres / 100 / 12; // Convierte tasa anual a mensual
    const pago = (monto * tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
    return pago.toFixed(2);
  };
  
  /**
   * Calcula el total a pagar (pago mensual * número de meses)
   */
  const calcularTotal = () => {
    return (calcularPago() * meses).toFixed(2);
  };
  
  /**
   * Calcula los intereses totales (total a pagar - monto prestado)
   */
  const calcularIntereses = () => {
    return (calcularTotal() - monto).toFixed(2);
  };
  
  return (
    <section style={{ backgroundColor: '#7FDED2', padding: '50px 0' }}>
      <div className="container">
        <div style={{ 
          backgroundColor: '#1a4a4a', 
          borderRadius: 30, 
          padding: 'clamp(20px, 5vw, 60px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, marginBottom: 30 }}>
            Simulador de Crédito simple
          </h3>
          
          <div className="row">
            {/* Columna izquierda: Formulario de simulación */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              {/* Input para el monto del crédito */}
              <div className="mb-3">
                <label style={{ color: 'white', marginBottom: 10, fontSize: '14px' }}>Monto del Crédito</label>
                <div className="input-group">
                  <span className="input-group-text" style={{ borderRadius: '10px 0 0 10px' }}>USD</span>
                  <input 
                    type="text" 
                    className="form-control form-control-lg"
                    value={`$ ${monto.toLocaleString()}`}
                    onChange={(e) => {
                      // Extrae solo los números del input
                      const valor = e.target.value.replace(/[^0-9]/g, '');
                      setMonto(Number(valor) || 0);
                    }}
                    style={{ borderRadius: '0 10px 10px 0' }}
                  />
                </div>
              </div>
              
              {/* Botones de montos rápidos predefinidos */}
              <div className="row g-2 mb-3">
                <div className="col-6 col-sm-3">
                  <button 
                    className={`btn w-100 ${monto === 2500 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(2500)}
                  >
                    2.5K
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button 
                    className={`btn w-100 ${monto === 12500 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(12500)}
                  >
                    12.5K
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button 
                    className={`btn w-100 ${monto === 25000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(25000)}
                  >
                    25K
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button 
                    className={`btn w-100 ${monto === 40000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(40000)}
                  >
                    40K
                  </button>
                </div>
              </div>

              {/* Botón adicional para monto de 55.5K */}
              <div className="mb-3">
                <button 
                  className="btn btn-light w-100"
                  style={{ borderRadius: 10, fontSize: '13px' }}
                  onClick={() => setMonto(55500)}
                >
                  55.5K
                </button>
              </div>
              
              {/* Input para el plazo en meses */}
              <div className="mb-3">
                <label style={{ color: 'white', marginBottom: 10, fontSize: '14px' }}>Plazo del crédito (anual)</label>
                <input 
                  type="number" 
                  className="form-control form-control-lg"
                  value={meses}
                  onChange={(e) => setMeses(Number(e.target.value) || 1)}
                  style={{ borderRadius: 10 }}
                />
              </div>
              
              {/* Input de tasa de interés (solo lectura) */}
              <div className="mb-3">
                <label style={{ color: 'white', marginBottom: 10, fontSize: '14px' }}>Tasa de interés anual</label>
                <div className="input-group">
                  <input 
                    type="number" 
                    className="form-control form-control-lg"
                    value={tasaInteres}
                    readOnly
                    style={{ borderRadius: '10px 0 0 10px' }}
                  />
                  <span className="input-group-text" style={{ borderRadius: '0 10px 10px 0' }}>%</span>
                </div>
              </div>

              {/* Input de fecha de inicio (solo lectura) */}
              <div className="mb-3">
                <label style={{ color: 'white', marginBottom: 10, fontSize: '14px' }}>Fecha de inicio</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg"
                  value="10 / 2025"
                  readOnly
                  style={{ borderRadius: 10 }}
                />
              </div>
            </div>
            
            {/* Columna derecha: Resultados de la simulación */}
            <div className="col-12 col-lg-6">
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: 'clamp(20px, 4vw, 30px)' }}>
                {/* Pago mensual destacado */}
                <div className="mb-3">
                  <h4 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: '#1a3a3a' }}>
                    USD ${calcularPago()}
                  </h4>
                  <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Pago Mensual</p>
                </div>
                
                <hr />
                
                {/* Desglose de información del crédito */}
                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Capital Total</span>
                  <span style={{ fontWeight: 600 }}>${monto.toLocaleString()}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Intereses Totales</span>
                  <span style={{ fontWeight: 600 }}>${calcularIntereses()}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3" style={{ fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Último Pago</span>
                  <span style={{ fontWeight: 600 }}>Oct 2031</span>
                </div>

                {/* Aviso legal */}
                <p style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', marginBottom: 20 }}>
                  *Los valores mostrados no constituyen una oferta formal y están sujetos a evaluación crediticia.
                </p>
                
                {/* Botones de acción */}
                <div className="mb-3">
                <BotonAnimado variante="naranja" ancho="completo">Descargar detalle</BotonAnimado>
                </div>
                <BotonAnimado variante="morado" ancho="completo">Activa tu crédito en minutos</BotonAnimado>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
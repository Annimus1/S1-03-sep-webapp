import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { useNavigate } from "react-router";

/**
 * Calculadora interactiva de crédito
 * Permite a los usuarios simular su crédito con diferentes montos y plazos
 */
export const SeccionSimulador = () => {
  // Estados para controlar los valores del simulador
  const [monto, setMonto] = useState(2500000); // Monto del crédito solicitado
  const [meses, setMeses] = useState(2); // Plazo en meses
  const [tasaInteres] = useState(75); // Tasa de interés anual (fija)
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const navigate = useNavigate();

  const calcularPago = () => {
    const TasaMensual = (tasaInteres / 100) / 12;
    const MesesTotal = meses * 12;
    const denominador = 1 - (1 + TasaMensual) ** -MesesTotal;
    const cuotaFija = (monto * TasaMensual) / denominador;

    return cuotaFija.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getPrimerPago = () => {
    const primerPago = new Date(fechaInicio)

    primerPago.setDate(primerPago.getDate() + 30);

    return `${primerPago.getDate()}/${primerPago.getMonth() + 1}/${primerPago.getFullYear()}`
  }

  const getUltimoPago = () => {
    const ultimoPago = new Date(fechaInicio)
    const newYear = ultimoPago.getFullYear() + meses;
    ultimoPago.setFullYear(newYear);

    return `${ultimoPago.getDate()}/${ultimoPago.getMonth() + 1}/${ultimoPago.getFullYear()}`
  }

  function handleActivaCredit() {
    navigate('/registro')
  }

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
                  <span className="input-group-text" style={{ borderRadius: '10px 0 0 10px' }}>ARS</span>
                  <span className="input-group-text" >$</span>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    value={monto}
                    min={2500000}
                    onChange={(e) => {
                      setMonto(e.target.value);
                    }}
                    style={{ borderRadius: '0 10px 10px 0' }}
                  />
                </div>
              </div>

              {/* Botones de montos rápidos predefinidos */}
              <div className="row g-2 mb-3">
                {/* Elemento 1 */}
                <div className="col">
                  <button
                    className={`btn w-100 ${monto === 2500000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(2500000)}
                  >
                    2.5M
                  </button>
                </div>
                {/* Elemento 2 */}
                <div className="col ">
                  <button
                    className={`btn w-100 ${monto === 12500000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(12500000)}
                  >
                    12.5M
                  </button>
                </div>
                {/* Elemento 3 */}
                <div className="col ">
                  <button
                    className={`btn w-100 ${monto === 25000000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(25000000)}
                  >
                    25M
                  </button>
                </div>
                {/* Elemento 4 */}
                <div className="col ">
                  <button
                    className={`btn w-100 ${monto === 40000000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(40000000)}
                  >
                    40M
                  </button>
                </div>
                {/* Elemento 5 */}
                <div className="col ">
                  <button
                    className={`btn w-100 ${monto === 55500000 ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: 10, fontSize: '13px' }}
                    onClick={() => setMonto(55500000)}
                  >
                    55.5M
                  </button>
                </div>
              </div>

              {/* Input para el plazo en meses */}
              <div className="mb-3">
                <label style={{ color: 'white', marginBottom: 10, fontSize: '14px' }}>Plazo del crédito (anual)</label>
                <div className="input-group">

                  <input
                    type="number"
                    className="form-control form-control-lg"
                    value={meses}
                    min={2}
                    max={8}
                    onChange={(e) => setMeses(Number(e.target.value) || 1)}
                    style={{ borderRadius: '10px 0px 0px 10px' }}
                  />
                  <span className="input-group-text" style={{ borderRadius: '0 10px 10px 0' }}>años</span>
                </div>
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
                    disabled
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
                  value={`${fechaInicio.getDate()}/${fechaInicio.getMonth() + 1}/${fechaInicio.getFullYear()}`}
                  disabled
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
                  <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Pago Mensual (Cuotas fijas)</p>
                  <h4 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: '#1a3a3a' }}>
                    ARS ${calcularPago()}
                  </h4>
                </div>

                <hr />

                {/* Desglose de información del crédito */}
                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Capital Total</span>
                  <span style={{ fontWeight: 600 }}>${monto.toLocaleString()}</span>
                </div>

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Primer Pago</span>
                  <span style={{ fontWeight: 600 }}>{getPrimerPago()}</span>
                </div>

                <div className="d-flex justify-content-between mb-3" style={{ fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Último Pago</span>
                  <span style={{ fontWeight: 600 }}>{getUltimoPago()}</span>
                </div>

                {/* Aviso legal */}
                <p style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', marginBottom: 20 }}>
                  *Los valores mostrados no constituyen una oferta formal y están sujetos a evaluación crediticia.
                </p>

              </div>
            </div>
            {/* Botones de acción */}
            <BotonAnimado variante="naranja" ancho="completo" onClick={handleActivaCredit}>
              Activa tu crédito en minutos
            </BotonAnimado>
          </div>
        </div>
      </div>
    </section>
  );
};
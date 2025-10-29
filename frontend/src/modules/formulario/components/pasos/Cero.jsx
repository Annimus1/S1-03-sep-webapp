import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { useNavigate } from "react-router";
import { ModuloAmortizacion } from '../organismos/TablaAmortizacion';
import { UserContext } from '../../../../stores/UserContext.jsx'
import { ErrorPopup } from '../../../../globals/components/moleculas/ErrorPopUp.jsx';
import axios from 'axios';

export const Cero = ({ setPasoActual }) => {
  // Estados para controlar los valores del simulador
  const [monto, setMonto] = useState(2500000); // Monto del crédito solicitado
  const [meses, setMeses] = useState(6); // Plazo en meses
  const [tasaInteres] = useState(75); // Tasa de interés anual (fija)
  const [fechaActual, _] = useState(new Date());
  const [fechaInicio, setFechaInico] = useState(new Date());
  const { user, logout } = useContext(UserContext)
  const [error, setError] = useState({ isVisible: true, status: 404, message: "Not Found." });
  const navigate = useNavigate();

  const configuracionMoradoSuave = {
    backgroundColor: '#DAD6FE',
    color: '#000000',
    border: '2px solid #DAD6FE',
    hoverBg: '#E8E6FF',
  };

  const obtenerEstiloBoton = (esActivo) => {
    // Definir el estilo base (el que tienen todos los botones)
    const estiloBase = {
      borderRadius: 10,
      fontSize: '13px',
      width: '100%',
      fontWeight: 600,
      transition: 'all 0.3s ease', // Para una transición de color suave
    };

    if (esActivo) {
      return {
        ...estiloBase,
        backgroundColor: configuracionMoradoSuave.backgroundColor, // #DAD6FE
        color: configuracionMoradoSuave.color, // #000000
        border: configuracionMoradoSuave.border,
        boxShadow: configuracionMoradoSuave.shadow,
      };
    } else {
      return {
        ...estiloBase,
        backgroundColor: 'white', // #E8E6FF
        color: 'black',
        border: `2px solid white`, // Borde del color principal
      };
    }
  };

  const calcularPago = () => {
    const TasaMensual = (tasaInteres / 100) / 12;
    const MesesTotal = meses;
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

  useEffect(() => {
    fechaActual.setDate(fechaActual.getDate() + 15);
    setFechaInico(new Date(fechaActual));
  }, [])

  async function handleSubmit() {
    try {

      const token = user?.token;
      const API_URL = import.meta.env.VITE_API_URL;
      const endpoint = `${API_URL}/credit/create`

      // crear objeto
      const data = {
        monto_credito: monto,
        plazos: meses
      }

      // crear peticion
      const response = await axios.post(endpoint, data, { headers: { 'Authorization': `Bearer ${token}` } })

      // recibir respuesta
      if (response.status == 201) {
        console.log(response);
        window.localStorage.setItem('creditInfo', JSON.stringify({credit: response.data.data.credit, PasoActual:1}));
        setPasoActual(1);
      }
    }
    catch (error) {

      // manejar errores
      if (error.status == 401) {
        logout();
        setTimeout(navigate('/login'), 1000);
      }


      else {
        setError({ isVisible: true, status: error.status, message: error.response.data.data.message })
      }
    }
  }

  function handleCloseError() {
    setError({ isVisible: false, status: null, message: "" })
  }
  return (
    <section style={{ padding: '50px 0' }}>
      {error.isVisible && (
        <ErrorPopup
          status={error.status}
          message={error.message}
          onClose={handleCloseError}
        />
      )}
      <div className="container mx-auto">
        <div style={{
          backgroundColor: '#7FDED2',
          borderRadius: 30,
          padding: 'clamp(20px, 5vw, 60px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h3 style={{ placeSelf: 'flex-start', color: 'black', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, marginBottom: 30 }}>
            Monto Solicitado
          </h3>

          <div className="row">
            {/* Columna izquierda: Formulario de simulación */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              {/* Input para el monto del crédito */}
              <div className="mb-3">
                <label style={{ color: 'black', marginBottom: 10, fontSize: '14px' }}>Monto del Crédito</label>
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
                    className={`btn w-100`}
                    style={obtenerEstiloBoton(monto === 2500000)}
                    onClick={() => setMonto(2500000)}
                  >
                    2.5M
                  </button>
                </div>
                {/* Elemento 2 */}
                <div className="col ">
                  <button
                    className={`btn w-100`}
                    style={obtenerEstiloBoton(monto === 12500000)}
                    onClick={() => setMonto(12500000)}
                  >
                    12.5M
                  </button>
                </div>
                {/* Elemento 3 */}
                <div className="col ">
                  <button
                    className={`btn w-100`}
                    style={obtenerEstiloBoton(monto === 25000000)}
                    onClick={() => setMonto(25000000)}
                  >
                    25M
                  </button>
                </div>
                {/* Elemento 4 */}
                <div className="col ">
                  <button
                    className={`btn w-100`}
                    style={obtenerEstiloBoton(monto === 40000000)}
                    onClick={() => setMonto(40000000)}
                  >
                    40M
                  </button>
                </div>
                {/* Elemento 5 */}
                <div className="col ">
                  <button
                    className={`btn w-100`}
                    style={obtenerEstiloBoton(monto === 55500000)}
                    onClick={() => setMonto(55500000)}
                  >
                    55.5M
                  </button>
                </div>
              </div>

              {/* Input para el plazo en meses */}
              <div className="mb-3">
                <label style={{ color: 'black', marginBottom: 10, fontSize: '14px' }}>Plazo del crédito (anual)</label>
                <div className="input-group">

                  <input
                    type="number"
                    className="form-control form-control-lg"
                    value={meses}
                    min={6}
                    max={96}
                    onChange={(e) => setMeses(Number(e.target.value) || 1)}
                    style={{ borderRadius: '10px 0px 0px 10px' }}
                  />
                  <span className="input-group-text" style={{ color: 'gray', background: 'white', borderColor: 'white', borderRadius: '0 10px 10px 0' }}>meses</span>
                </div>
              </div>

              {/* Input de tasa de interés (solo lectura) */}
              <div className="mb-3">
                <label style={{ color: 'black', marginBottom: 10, fontSize: '14px' }}>Tasa de interés anual</label>
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
                <label style={{ color: 'black', marginBottom: 10, fontSize: '14px' }}>Fecha de inicio</label>
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
            <div className="col-12 col-lg-6 mx-auto">
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
                  *El monto seleccionado es una referencia inicial y puede ajustarse según la evaluación crediticia de tu empresa y la documentación presentada. Nuestro objetivo es ofrecerte una opción segura y acorde a tu capacidad de pago.
                </p>

                <ModuloAmortizacion monto={monto} meses={meses} fechaInicioPrestamo={fechaInicio} />

              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <BotonAnimado variante="naranja" className={'fs-5 text-black'} ancho="auto" onClick={handleSubmit}>
            Iniciar mi solicitud crédito PyME
          </BotonAnimado>
        </div>
      </div>
    </section>
  );
};
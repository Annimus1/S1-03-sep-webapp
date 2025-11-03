import { useState } from 'react';
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';
import styles from '../../../visualizarDocumentos/styles/DocumentosAdjuntados.module.css';


export const ModuloAmortizacionDashboard = ({ monto, meses, fechaInicioPrestamo }) => {

  const [mostrarTabla, setMostrarTabla] = useState(false);
  const tna = 0.75; // 75%

  /**
 * Genera el plan de amortización completo (Sistema Francés) con fechas.
 * @param {number} principal - Monto del crédito.
 * @param {number} meses - Plazo total en meses.
 * @param {number} tna - Tasa Nominal Anual (ej: 0.75).
 * @param {Date} fechaInicioPrestamo - La fecha en que inicia el cómputo (ej: fecha de desembolso).
 * @returns {Array<object>} Una tabla de pagos fila por fila.
 */
  const generarTablaAmortizacion = (principal, meses, tna, fechaInicioPrestamo) => {
    // Función auxiliar para redondear a 2 decimales
    const redondear = (num) => Math.round(num * 100) / 100;

    const r = tna / 12;
    let saldoPendiente = principal;
    const tabla = [];

    // Calcular la Cuota Fija (Instalment)
    const denominador = 1 - Math.pow((1 + r), -meses);
    let cuotaFija = redondear((principal * r) / denominador);

    // Iterar para generar cada cuota
    for (let mes = 1; mes <= meses; mes++) {

      // 🔑 Lógica para calcular la FECHA DE PAGO 🔑
      const fechaPago = new Date(fechaInicioPrestamo);
      // Sumamos 'meses' al mes de inicio. JavaScript lo maneja automáticamente.
      fechaPago.setMonth(fechaPago.getMonth() + mes);

      const interes = redondear(saldoPendiente * r);
      let amortizacion = redondear(cuotaFija - interes);

      // Ajuste de la Cuota Final (Saldo 0.00)
      if (mes === meses) {
        amortizacion = saldoPendiente;
        cuotaFija = redondear(amortizacion + interes);
        saldoPendiente = 0;
      } else {
        saldoPendiente = redondear(saldoPendiente - amortizacion);
      }

      tabla.push({
        fechaPago: `${fechaPago.getDate()}/${fechaPago.getMonth() + 1}/${fechaPago.getFullYear()}`,
        mes: mes,
        saldoInicial: redondear(saldoPendiente + amortizacion),
        interes: interes,
        amortizacion: amortizacion,
        cuota: cuotaFija,
        saldoFinal: saldoPendiente,
      });
    }

    return tabla;
  };

  const handleMostrarTabla = () => {
    setMostrarTabla(true);
  };

  // Genera la tabla de datos
  const tablaDePagos = mostrarTabla ? generarTablaAmortizacion(monto, meses, tna, fechaInicioPrestamo) : [];

  // Función de formateo de moneda (según tu contexto: ARS)
  const formatoMoneda = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  };

  // ... Funciones para descargar CSV/PDF 
  const exportarTablaCSV = (tabla) => {

    // Nombres de las columnas (según tu requisito de UI/UX)
    const columns = ["Mes", "Saldo inicial", "Interés", "Amortización", "Cuota", "Saldo final"];

    // Encabezados
    let csv = columns.join(';') + '\n';

    // Datos de las filas
    tabla.forEach(fila => {
      // Obtenemos los valores en el orden de las columnas, usando solo los números para el cálculo
      csv += `${fila.mes};${fila.saldoInicial};${fila.interes};${fila.amortizacion};${fila.cuota};${fila.saldoFinal}\n`;
    });

    // Crear un blob y descargar el archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'plan_amortizacion.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function tableStyle(index) {
    if (index % 2 !== 0) {
      return {
        backgroundColor: '#7FDED2', // Fondo del color morado suave
        color: '#000000',           // Texto en color negro
        borderBottom: '2px solid #7FDED2' // Un borde inferior para delimitar
      }
    }

    return {}
  }
  return (
    <div>
      {/* Botón que activa la tabla */}
      <button
          className={styles.botonIcono}
          onClick={handleMostrarTabla}
          title="Visualizar Tabla"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

      {/* Pop-up / Modal de la Tabla */}
      {/* Pop-up / Modal de la Tabla */}
      {mostrarTabla && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }}>
            {/* Header del Modal */}
            <div style={{
              padding: '32px 40px',
              borderBottom: '1px solid #E5E5E5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: 0
              }}>
                Plan de Pagos ({meses} Meses)
              </h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <BotonAnimado variante="naranja" ancho="auto" onClick={() => exportarTablaCSV(tablaDePagos)}>
                  Exportar CSV
                </BotonAnimado>
                <button
                  onClick={() => setMostrarTabla(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f5f5f5',
                    color: '#666',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0e0e0';
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Contenedor de la Tabla con Scroll */}
            <div style={{ 
              overflowY: 'auto', 
              padding: '0 40px 32px',
              flex: 1
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                marginTop: '24px'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>#</th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>Fecha De Pago</th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>Saldo inicial</th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>Interés</th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>Amortización</th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>Cuota</th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '2px solid #E5E5E5',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 10
                    }}>Saldo final</th>
                  </tr>
                </thead>
                <tbody>
                  {tablaDePagos.map((fila, index) => (
                    <tr key={fila.mes} style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fffe',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e8f9f7'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fffe'}
                    >
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        fontWeight: '600',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{fila.mes}</td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{fila.fechaPago}</td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        textAlign: 'right',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{formatoMoneda(fila.saldoInicial)}</td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        textAlign: 'right',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{formatoMoneda(fila.interes)}</td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        textAlign: 'right',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{formatoMoneda(fila.amortizacion)}</td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        textAlign: 'right',
                        fontWeight: '600',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{formatoMoneda(fila.cuota)}</td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        textAlign: 'right',
                        borderBottom: '1px solid #f0f0f0'
                      }}>{formatoMoneda(fila.saldoFinal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
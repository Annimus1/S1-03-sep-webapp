import { useState } from 'react';
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

export const ModuloAmortizacion = ({ monto, meses, fechaInicioPrestamo }) => {

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
  /**
 * Convierte el array de la tabla de amortización en un archivo PDF.
 * @param {Array<object>} tabla - El array de pagos generado por generarTablaAmortizacion.
 * @param {string} principal - Monto inicial del crédito (para el título).
 * @param {string} meses - Plazo del crédito (para el título).
 */
  const exportarTablaPDF = async (tabla, principal, meses) => {

    // Inicializar jsPDF
    const doc = new jsPDF();

    // Asegúrate de que 'doc' tiene el método autoTable ANTES de usarlo
    if (typeof doc.autoTable !== 'function') {
      console.error("ERROR: jspdf-autotable no se ha cargado correctamente.");
      // Opcional: Podrías recargar el plugin aquí si fuera necesario
      return;
    }

    // Función de formateo de moneda (la misma que usas en el renderizado)
    const formatoMoneda = (valor) => {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(valor);
    };

    // 1. Encabezados de la Tabla (Headers)
    const headers = [
      "Fecha de Pago",
      "Saldo Inicial",
      "Interés",
      "Amortización",
      "Cuota",
      "Saldo Final"
    ];

    // 2. Datos de las Filas (Formato de strings)
    const data = tabla.map(fila => [
      // Convertir la fecha a formato legible
      fila.fechaPago,
      // Formatear todos los valores monetarios
      formatoMoneda(fila.saldoInicial),
      formatoMoneda(fila.interes),
      formatoMoneda(fila.amortizacion),
      formatoMoneda(fila.cuota),
      formatoMoneda(fila.saldoFinal),
    ]);

    // 3. Título del Documento
    doc.setFontSize(14);
    doc.text("Plan de Amortización (Sistema Francés)", 14, 20);

    doc.setFontSize(10);
    doc.text(`Monto: ${formatoMoneda(principal)} | Plazo: ${meses} Meses | TNA: 75%`, 14, 27);

    // 4. Generar la Tabla con jspdf-autotable
    doc.autoTable({
      startY: 35, // Inicia la tabla debajo del título
      head: [headers],
      body: data,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: 'right' // Alinea los números a la derecha
      },
      headStyles: {
        fillColor: [86, 44, 164], // Usando un color similar a tu variante 'morado'
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Fondo gris claro para filas alternas
      },
      columnStyles: {
        0: { halign: 'center' } // Centrar la columna de fechas/mes
      }
    });

    // 5. Descargar el archivo
    doc.save(`plan-pagos-${meses}-meses.pdf`);
  };

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
      <BotonAnimado variante="moradoSuave" className={'fs-5'} ancho="completo" onClick={handleMostrarTabla}>
        Ver Detalle
      </BotonAnimado>

      {/* Pop-up / Modal de la Tabla */}
      {mostrarTabla && (
        <div className="modal-backdrop bg-white">
          <div className="modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3 p-5">
              <h3 className="fs-4">Plan de Pagos ({meses} Meses)</h3>
              <div className='row mr-5'>

                <BotonAnimado variante="naranja" ancho="auto" onClick={() => exportarTablaCSV(tablaDePagos)}>
                  Exportar CSV
                </BotonAnimado>
                <BotonAnimado variante="moradoSuave" className={'text-white mx-2'} ancho="auto" onClick={() => setMostrarTabla(false)}>X</BotonAnimado>
              </div>
            </div>

            {/* Contenedor de la Tabla con Scroll (según tu requisito) */}
            <div style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
              <table className="table table-striped table-sm ml-5">
                <thead>
                  <tr className="text-dark">
                    <th className='px-5'>#</th>
                    <th >Fecha De Pago</th>
                    <th>Saldo inicial</th>
                    <th>Interés</th>
                    <th>Amortización</th>
                    <th>Cuota</th>
                    <th>Saldo final</th>
                  </tr>
                </thead>
                <tbody>
                  {tablaDePagos.map(fila => (
                    <tr key={fila.mes} >
                      <td style={tableStyle(fila.mes)} className='px-5'>{fila.mes}</td>
                      <td style={tableStyle(fila.mes)}>{fila.fechaPago}</td>
                      <td style={tableStyle(fila.mes)}>{formatoMoneda(fila.saldoInicial)}</td>
                      <td style={tableStyle(fila.mes)}>{formatoMoneda(fila.interes)}</td>
                      <td style={tableStyle(fila.mes)}>{formatoMoneda(fila.amortizacion)}</td>
                      <td style={tableStyle(fila.mes)}>{formatoMoneda(fila.cuota)}</td>
                      <td style={tableStyle(fila.mes)}>{formatoMoneda(fila.saldoFinal)}</td>
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
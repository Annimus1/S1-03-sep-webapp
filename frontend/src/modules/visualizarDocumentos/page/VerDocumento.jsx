import { DocumentosAdjuntados } from "../components/plantilla/DocumentosAdjuntados";

const VerDocumento = () => {
  const handleVisualizarPDF = (url, nombre) => {
    console.log(`Visualizar: ${nombre} - ${url}`);
    // Aquí abrirías el PDF en un modal o nueva ventana
    window.open(url, "_blank");
  };

  const handleDescargarPDF = (url, nombre) => {
    console.log(`Descargar: ${nombre} - ${url}`);
    // Aquí descargarías el PDF
    const link = document.createElement("a");
    link.href = url;
    link.download = nombre;
    link.click();
  };

  const datosPaginas = [
    // PÁGINA 1
    {
      secciones: [
        {
          titulo: "1. Información Crediticia y Bancaria",
          columnas: 2,
          documentos: [
            {
              nombre: "Constancia de CBU o cuenta receptora",
              estado: "completado",
              pdfUrl: "/docs/cbu.pdf",
              pdfDescargarUrl: "/docs/cbu.pdf",
              disponible: true,
            },
            {
              nombre: "Referencias bancarias",
              estado: "completado",
              pdfUrl: "/docs/referencias.pdf",
              pdfDescargarUrl: "/docs/referencias.pdf",
              disponible: true,
            },
            {
              nombre: "Informe crediticio",
              estado: "completado",
              pdfUrl: "/docs/informe.pdf",
              pdfDescargarUrl: "/docs/informe.pdf",
              disponible: true,
            },
            {
              nombre: "Referencias comerciales",
              estado: "completado",
              pdfUrl: "/docs/comerciales.pdf",
              pdfDescargarUrl: "/docs/comerciales.pdf",
              disponible: true,
            },
            {
              nombre: "Certificado de libre deuda bancaria",
              estado: "completado",
              pdfUrl: "/docs/certificado.pdf",
              pdfDescargarUrl: "/docs/certificado.pdf",
              disponible: true,
            },
            {
              nombre: "Detalle de créditos y líneas vigentes",
              estado: "completado",
              pdfUrl: "/docs/detalle.pdf",
              pdfDescargarUrl: "/docs/detalle.pdf",
              disponible: true,
            },
            {
              nombre: "Declaración de no estar en concurso o quiebra",
              estado: "completado",
              pdfUrl: "/docs/declaracion.pdf",
              pdfDescargarUrl: "/docs/declaracion.pdf",
              disponible: true,
            },
            {
              nombre: "Historial de cumplimiento de préstamos anteriores",
              estado: "completado",
              pdfUrl: "/docs/historial.pdf",
              pdfDescargarUrl: "/docs/historial.pdf",
              disponible: true,
            },
          ],
        },
      ],
    },
    // PÁGINA 2
    {
      secciones: [
        {
          titulo: "2. Garantías (Reales o Personales)",
          columnas: 2,
          documentos: [
            {
              nombre: "Título de propiedad del bien ofrecido",
              estado: "completado",
              pdfUrl: "/docs/titulo.pdf",
              pdfDescargarUrl: "/docs/titulo.pdf",
              disponible: true,
            },
            {
              nombre: "Comprobantes de ingresos del garante",
              estado: "completado",
              pdfUrl: "/docs/ingresos.pdf",
              pdfDescargarUrl: "/docs/ingresos.pdf",
              disponible: true,
            },
            {
              nombre: "Informe registral actualizado",
              estado: "rechazado",
              pdfUrl: null,
              pdfDescargarUrl: null,
              disponible: false,
            },
            {
              nombre: "Pagaré o documento de deuda firmado",
              estado: "completado",
              pdfUrl: "/docs/pagare.pdf",
              pdfDescargarUrl: "/docs/pagare.pdf",
              disponible: true,
            },
            {
              nombre: "Tasación o valuación oficial del bien",
              estado: "completado",
              pdfUrl: "/docs/tasacion.pdf",
              pdfDescargarUrl: "/docs/tasacion.pdf",
              disponible: true,
            },
            {
              nombre: "Cesión de derechos de cobro o SGR",
              estado: "rechazado",
              pdfUrl: null,
              pdfDescargarUrl: null,
              disponible: false,
            },
            {
              nombre: "Seguro del bien",
              estado: "completado",
              pdfUrl: "/docs/seguro.pdf",
              pdfDescargarUrl: "/docs/seguro.pdf",
              disponible: true,
            },
            {
              nombre: "Aval solidario o fianza de socios",
              estado: "completado",
              pdfUrl: "/docs/aval.pdf",
              pdfDescargarUrl: "/docs/aval.pdf",
              disponible: true,
            },
            {
              nombre: "Declaración patrimonial del garante",
              estado: "completado",
              pdfUrl: "/docs/patrimonio.pdf",
              pdfDescargarUrl: "/docs/patrimonio.pdf",
              disponible: true,
            },
          ],
        },
      ],
    },
    // PÁGINA 3
    {
      secciones: [
        {
          titulo:
            "Documentos Adjuntados - Tipo de Crédito: Inversión / Expansión",
          columnas: 2,
          documentos: [
            {
              nombre: "Presupuesto detallado de inversión",
              estado: "completado",
              pdfUrl: "/docs/presupuesto.pdf",
              pdfDescargarUrl: "/docs/presupuesto.pdf",
              disponible: true,
            },
            {
              nombre: "Informe técnico del contador o ingeniero",
              estado: "rechazado",
              pdfUrl: null,
              pdfDescargarUrl: null,
              disponible: false,
            },
            {
              nombre: "Tres cotizaciones de proveedores",
              estado: "rechazado",
              pdfUrl: null,
              pdfDescargarUrl: null,
              disponible: false,
            },
            {
              nombre: "Plan de implementación",
              estado: "completado",
              pdfUrl: "/docs/plan.pdf",
              pdfDescargarUrl: "/docs/plan.pdf",
              disponible: true,
            },
            {
              nombre: "Estudio de factibilidad o ROI",
              estado: "completado",
              pdfUrl: "/docs/roi.pdf",
              pdfDescargarUrl: "/docs/roi.pdf",
              disponible: true,
            },
            {
              nombre: "Licencias o permisos de obra",
              estado: "completado",
              pdfUrl: "/docs/licencias.pdf",
              pdfDescargarUrl: "/docs/licencias.pdf",
              disponible: true,
            },
            {
              nombre: "Plan de mantenimiento del activo",
              estado: "completado",
              pdfUrl: "/docs/mantenimiento.pdf",
              pdfDescargarUrl: "/docs/mantenimiento.pdf",
              disponible: true,
            },
            {
              nombre: "Factura proforma o contrato de compra",
              estado: "completado",
              pdfUrl: "/docs/factura.pdf",
              pdfDescargarUrl: "/docs/factura.pdf",
              disponible: true,
            },
          ],
        },
      ],
    },
  ];

  return (
    <DocumentosAdjuntados
      titulo="Documentos Adjuntados - Información Crediticia, Garantías y Cumplimiento Regulatorio"
      paginas={datosPaginas}
      onVisualizarPDF={handleVisualizarPDF}
      onDescargarPDF={handleDescargarPDF}
    />
  );
};

export default VerDocumento;

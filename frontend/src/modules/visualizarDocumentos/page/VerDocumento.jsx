import { useState, useEffect, useContext, Profiler } from "react";
import axios from "axios";
import { UserContext } from "../../../stores/UserContext";
import { Header } from "../../landingPage/components/organismos/Header";
import { Footer } from "../../auth/components/organismos/Footer";
import { StepperConNavegacion } from "../components/plantilla/StepperConNavegacion";
import { DocumentosAdjuntados } from "../components/plantilla/DocumentosAdjuntados";

// Documentos del paso 0 (Verificación de Identidad) - Profile
const requiredFieldsStep0 = {
  empresa: [
    "estatutoSocial",
    "actaDesignacionAutoridades",
    "inscripcionFiscal",
    "comprobanteDomicilioFiscal",
    "certificadoPyMes",
  ],
  representante: [
    "DNI",
    "comprobanteDomicilioPersonal",
    "DeclaracionJurada",
  ]
};

const friendlyNamesStep0 = {
  estatutoSocial: "Estatuto Social",
  actaDesignacionAutoridades: "Acta de Designación de Autoridades",
  inscripcionFiscal: "Inscripción Fiscal",
  comprobanteDomicilioFiscal: "Comprobante de Domicilio Fiscal",
  DNI: "DNI del Representante",
  comprobanteDomicilioPersonal: "Comprobante de Domicilio Personal",
  DeclaracionJurada: "Declaración Jurada",
  certificadoPyMes: "Certificado PyME",
};

// Documentos del paso 1 (Información Financiera) - Credit
const requiredFieldsStep1Parte1 = [
  "estadosContablesAuditados",
  "estadosContableIntermedios",
  "ddjjImpositivas",
  "comprobanteImpuestos",
  "resumenBancario",
  "ingresosEgresosMensuales",
  "detalleCuentas",
  "inventariosActuales",
];

const requiredFieldsStep1Parte2 = [
  "activosFijos",
  "registroVentasCompras",
  "proyeccionFlujoFondos",
  "planFinancieroCredito",
  "ratiosFinancieros",
  "certificacionContable",
];

const friendlyNamesStep1 = {
  estadosContablesAuditados: "Estados Contables Auditados",
  estadosContableIntermedios: "Estados Contables Intermedios",
  ddjjImpositivas: "Declaraciones Juradas Impositivas",
  comprobanteImpuestos: "Comprobantes de Impuestos",
  resumenBancario: "Resumen de Cuentas Bancarias",
  ingresosEgresosMensuales: "Detalle de Ingresos y Egresos",
  detalleCuentas: "Cuentas por Cobrar y Pagar",
  inventariosActuales: "Inventarios y Valuaciones",
  activosFijos: "Detalle de Activos Fijos",
  registroVentasCompras: "Registro de Ventas y Compras",
  proyeccionFlujoFondos: "Proyección de Flujo de Fondos",
  planFinancieroCredito: "Plan Financiero del Crédito",
  ratiosFinancieros: "Ratios Financieros",
  certificacionContable: "Certificación Contable",
};

// Documentos del paso 2 (Información Operativa) - Credit
const requiredFieldsStep2Parte1 = [
  "principalesClientes",
  "principalesProveedores",
  "contratosComerciales",
  "organigramaPersonal",
  "comprobanteFacturacion",
];

const requiredFieldsStep2Parte2 = [
  "permisosHabilitantes",
  "comprobantePropiedad",
  "fotosEstablecimiento",
  "evidenciaActividadOnline",
  "descripcionMercado",
];

const friendlyNamesStep2 = {
  principalesClientes: "Principales Clientes",
  principalesProveedores: "Principales Proveedores",
  contratosComerciales: "Contratos Comerciales",
  organigramaPersonal: "Organigrama del Personal",
  comprobanteFacturacion: "Facturación Reciente",
  permisosHabilitantes: "Certificados y Permisos",
  comprobantePropiedad: "Comprobante de Propiedad",
  fotosEstablecimiento: "Fotos del Establecimiento",
  evidenciaActividadOnline: "Evidencia de Actividad Online",
  descripcionMercado: "Descripción del Mercado",
};

// Documentos del paso 3 (Propósito del Crédito) - Credit
const requiredFieldsStep3Inversion = [
  "presupuestoInversion",
  "cotizacionProveedores",
  "planImplementacion",
  "estudioFactibilidad",
  "permisosObra",
  "planMantenimiento",
  "facturaProforma",
  "informeTecnico",
];

const requiredFieldsStep3CapitalTrabajo = [
  "detalleFondos",
  "proyeccionFlujoOperativo",
  "gastosOperativos",
  "facturaProforma",
  "evidenciaExpancion",
];

const friendlyNamesStep3 = {
  presupuestoInversion: "Presupuesto de Inversión",
  cotizacionProveedores: "Cotización de Proveedores",
  planImplementacion: "Plan de Implementación",
  estudioFactibilidad: "Estudio de Factibilidad",
  permisosObra: "Permisos de Obra",
  planMantenimiento: "Plan de Mantenimiento",
  facturaProforma: "Factura Proforma",
  informeTecnico: "Informe Técnico",
  detalleFondos: "Detalle de Fondos",
  proyeccionFlujoOperativo: "Proyección de Flujo Operativo",
  gastosOperativos: "Gastos Operativos",
  evidenciaExpancion: "Evidencia de Expansión",
};

// Documentos del paso 4 (Validación Crediticia) - Credit

const requiredFieldsStep4Parte1 = [
  "constanciaCBU",
  "certificadoLibreDeuda",
  "historialPrestamos",
  "referenciasComerciales",
  "informeCrediticio",
  "detalleCreditos",
  "referenciasBancarias",
  "ddjjQuiebra",
];

const requiredFieldsStep4Parte2 = [
  "tituloPropiedad",
  "tasaOficial",
  "avalSolidario",
  "comprobanteGarantes",
  "cesionSGR",
  "informeRegistral",
  "seguro",
  "declaracionPatrimonialGarante",
  "documentoDeuda",
];

const requiredFieldsStep4Parte3 = [
  "ddjjOrigenLicito",
  "ddjjBeneficiarioFinal",
  "consentimientoAnalisis",
  "constanciaPoliticasInternas",
];

const requiredFieldsStep4Parte4 = ["firmaDigital"];

// Nombres amigables para mostrar al usuario
const friendlyNamesStep4 = {
  constanciaCBU: "Constancia de CBU",
  certificadoLibreDeuda: "Certificado de Libre Deuda",
  historialPrestamos: "Historial de Préstamos",
  referenciasComerciales: "Referencias Comerciales",
  informeCrediticio: "Informe Crediticio",
  detalleCreditos: "Detalle de Créditos",
  referenciasBancarias: "Referencias Bancarias",
  ddjjQuiebra: "Declaración Jurada de Quiebra",
  tituloPropiedad: "Título de Propiedad",
  tasaOficial: "Tasa Oficial",
  avalSolidario: "Aval Solidario",
  comprobanteGarantes: "Comprobante de Garantes",
  cesionSGR: "Cesión SGR",
  informeRegistral: "Informe Registral",
  seguro: "Seguro",
  declaracionPatrimonialGarante: "Declaración Patrimonial del Garante",
  documentoDeuda: "Documento de Deuda",
  ddjjOrigenLicito: "Declaración Jurada de Origen Lícito de Fondos",
  ddjjBeneficiarioFinal: "Declaración Jurada de Beneficiario Final",
  consentimientoAnalisis: "Consentimiento para Análisis Crediticio",
  constanciaPoliticasInternas: "Constancia de Políticas Internas",
  firmaDigital: "Firma Digital",
};

const VerDocumento = () => {
  const { user } = useContext(UserContext);
  const [pasoActual, setPasoActual] = useState(0);
  const [profile, setProfile] = useState(null);
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfURL, setPdfURL] = useState(null);
  const [key, setKey] = useState(0); // 👈 Key para forzar re-render del componente DocumentosAdjuntados
  const API_URL = import.meta.env.VITE_API_URL;
  const storedCredit = JSON.parse(localStorage.getItem("creditInfo"));
  const creditoSeleccionado = JSON.parse(localStorage.getItem("creditoSeleccionado")).id;

  useEffect(() => {

    let creditoID = null;

    if ( user.role === 'asesor') {
      creditoID = creditoSeleccionado;
    } else {
      creditoID = storedCredit.credit._id;
    }

    

    const fetchData = async () => {
      try {
        const userId = user.id || user._id;

        console.table({ creditoID, userId });

        const creditResp = await axios.get(`${API_URL}/credit/${creditoID}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        console.log("✅ Datos obtenidos:", creditResp.data);

        const profileResp = await axios.get(`${API_URL}/profile/${creditResp.data.data.credit.userId._id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        setProfile(profileResp.data);
        setCredit(creditResp.data.data.credit);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const pasos = [
    "Verificación de Identidad",
    "Información financiera",
    "Información operativa",
    "Propósito del crédito",
    "Validación Crediticia",
  ];

  const handleStepChange = (nuevoPaso) => {
    setPasoActual(nuevoPaso);
    setKey(prev => prev + 1); // 👈 Incrementa la key para forzar re-render y reiniciar paginación
  };

  const handlePDF = async (url, nombre = null) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);

      if (nombre) {
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = nombre;
        link.click();
        window.URL.revokeObjectURL(link.href);
      } else {
        setPdfURL(fileURL);
      }
    } catch (err) {
      console.error(err);    }
  };

  const handleVisualizarPDF = (url) => handlePDF(url);
  const handleDescargarPDF = (url, nombre) => handlePDF(url, nombre);
  const handleCerrarModal = () => setPdfURL(null);

  const getDatosPaginas = () => {
    if (pasoActual === 0 && profile) {
      return [
        {
          secciones: [
            {
              titulo: "Documentos de la Empresa",
              columnas: 2,
              documentos: requiredFieldsStep0.empresa.map((field) => ({
                nombre: friendlyNamesStep0[field] || field,
                estado: profile[field] ? "completado" : "pendiente",
                pdfUrl: profile[field] || null,
                pdfDescargarUrl: profile[field] || null,
                disponible: !!profile[field],
              })),
            },
          ],
        },
        {
          secciones: [
            {
              titulo: "Documentos del Representante Legal",
              columnas: 2,
              documentos: requiredFieldsStep0.representante.map((field) => ({
                nombre: friendlyNamesStep0[field] || field,
                estado: profile[field] ? "completado" : "pendiente",
                pdfUrl: profile[field] || null,
                pdfDescargarUrl: profile[field] || null,
                disponible: !!profile[field],
              })),
            },
          ],
        },
      ];
    } else if (pasoActual === 1 && credit) {
      return [
        {
          secciones: [
            {
              titulo: "Información Financiera - Parte 1",
              columnas: 2,
              documentos: requiredFieldsStep1Parte1.map((field) => ({
                nombre: friendlyNamesStep1[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
        {
          secciones: [
            {
              titulo: "Información Financiera - Parte 2",
              columnas: 2,
              documentos: requiredFieldsStep1Parte2.map((field) => ({
                nombre: friendlyNamesStep1[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
      ];
    } else if (pasoActual === 2 && credit) {
      return [
        {
          secciones: [
            {
              titulo: "Información Operativa - Parte 1",
              columnas: 2,
              documentos: requiredFieldsStep2Parte1.map((field) => ({
                nombre: friendlyNamesStep2[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
        {
          secciones: [
            {
              titulo: "Información Operativa - Parte 2",
              columnas: 2,
              documentos: requiredFieldsStep2Parte2.map((field) => ({
                nombre: friendlyNamesStep2[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
      ];
    } else if (pasoActual === 3 && credit) {
      const tieneDocumentosInversion = 
        requiredFieldsStep3Inversion.filter(
          field => credit[field] !== null && credit[field] !== undefined
        ).length > 1;


      if (tieneDocumentosInversion) {
        return [
          {
            secciones: [
              {
                titulo: "Documentos de Crédito de Inversión",
                columnas: 2,
                documentos: requiredFieldsStep3Inversion.map((field) => ({
                  nombre: friendlyNamesStep3[field] || field,
                  estado: credit[field] ? "completado" : "pendiente",
                  pdfUrl: credit[field] || null,
                  pdfDescargarUrl: credit[field] || null,
                  disponible: !!credit[field],
                })),
              },
            ],
          },
        ];
      } else {
        return [
          {
            secciones: [
              {
                titulo: "Documentos de Capital de Trabajo",
                columnas: 2,
                documentos: requiredFieldsStep3CapitalTrabajo.map((field) => ({
                  nombre: friendlyNamesStep3[field] || field,
                  estado: credit[field] ? "completado" : "pendiente",
                  pdfUrl: credit[field] || null,
                  pdfDescargarUrl: credit[field] || null,
                  disponible: !!credit[field],
                })),
              },
            ],
          },
        ];
      }
    } else if (pasoActual === 4 && credit) {
      return [
        {
          secciones: [
            {
              titulo: "Información Crediticia y Bancaria",
              columnas: 2,
              documentos: requiredFieldsStep4Parte1.map((field) => ({
                nombre: friendlyNamesStep4[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
        {
          secciones: [
            {
              titulo: "Garantías",
              columnas: 2,
              documentos: requiredFieldsStep4Parte2.map((field) => ({
                nombre: friendlyNamesStep4[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
        {
          secciones: [
            {
              titulo: "Documentación Regulatoria",
              columnas: 2,
              documentos: requiredFieldsStep4Parte3.map((field) => ({
                nombre: friendlyNamesStep4[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
        {
          secciones: [
            {
              titulo: "Firma Digital",
              columnas: 2,
              documentos: requiredFieldsStep4Parte4.map((field) => ({
                nombre: friendlyNamesStep4[field] || field,
                estado: credit[field] ? "completado" : "pendiente",
                pdfUrl: credit[field] || null,
                pdfDescargarUrl: credit[field] || null,
                disponible: !!credit[field],
              })),
            },
          ],
        },
      ];
    }
    return [];
  };

  const datosPaginas = getDatosPaginas();

  if (loading) return <p>Cargando documentos...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header ruta="/dashboard" textoWindows="Volver a mi espacio" textoMovil="Volver" />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
        <StepperConNavegacion
          currentStep={pasoActual}
          steps={pasos}
          onStepChange={handleStepChange}
        />

        <div style={{ marginTop: "60px", width: "100%" }}>
          <DocumentosAdjuntados
            key={key} // 👈 Agrega la key aquí para forzar el re-render
            titulo="Documentos Adjuntados"
            paginas={datosPaginas}
            onVisualizarPDF={handleVisualizarPDF}
            onDescargarPDF={handleDescargarPDF}
          />
        </div>
      </main>

      <Footer />

      {pdfURL && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ width: "80%", height: "80%", position: "relative" }}>
            <button
              onClick={handleCerrarModal}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10000,
                padding: "5px 10px",
              }}
            >
              Cerrar
            </button>
            <iframe src={pdfURL} title="PDF Viewer" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerDocumento;
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../stores/UserContext";
import { Header } from "../../landingPage/components/organismos/Header";
import { Footer } from "../../auth/components/organismos/Footer";
import { StepperConNavegacion } from "../components/plantilla/StepperConNavegacion";
import { DocumentosAdjuntados } from "../components/plantilla/DocumentosAdjuntados";

const requiredFields = [
  "estatutoSocial",
  "actaDesignacionAutoridades",
  "inscripcionFiscal",
  "comprobanteDomicilioFiscal",
  "DNI",
  "comprobanteDomicilioPersonal",
  "DeclaracionJurada",
  "certificadoPyMes",
];

const friendlyNames = {
  estatutoSocial: "Estatuto Social",
  actaDesignacionAutoridades: "Acta de Designación de Autoridades",
  inscripcionFiscal: "Inscripción Fiscal",
  comprobanteDomicilioFiscal: "Comprobante de Domicilio Fiscal",
  DNI: "DNI del Representante",
  comprobanteDomicilioPersonal: "Comprobante de Domicilio Personal",
  DeclaracionJurada: "Declaración Jurada",
  certificadoPyMes: "Certificado PyME",
};

const VerDocumento = () => {
  const { user } = useContext(UserContext);
  const [pasoActual, setPasoActual] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfURL, setPdfURL] = useState(null); // Para el modal
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user?.token) return;

    const fetchProfile = async () => {
      try {
        const userId = user.id || user._id;
        const response = await axios.get(`${API_URL}/profile/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, API_URL]);

  const pasos = [
    "Verificación de Identidad",
    "Información financiera",
    "Información operativa",
    "Propósito del crédito",
    "Validación Crediticia",
  ];

  const handleStepChange = (nuevoPaso) => setPasoActual(nuevoPaso);
  const handleComplete = () => alert("¡Has completado todos los pasos!");

  // Visualizar PDF en modal
  const handleVisualizarPDF = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      setPdfURL(fileURL); // abrir modal
    } catch (err) {
      console.error(err);
      alert("No se pudo abrir el archivo.");
    }
  };

  const handleCerrarModal = () => {
    setPdfURL(null);
  };

  // Descargar PDF con axios
  const handleDescargarPDF = async (url, nombre) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = nombre;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      alert("No se pudo descargar el archivo. Verifica tus permisos.");
    }
  };

  const datosPaginas = profile
    ? [
        {
          secciones: [
            {
              titulo: "Documentos Obligatorios",
              columnas: 2,
              documentos: requiredFields.map((field) => ({
                nombre: friendlyNames[field] || field,
                estado: profile[field] ? "completado" : "pendiente",
                pdfUrl: profile[field] || null,
                pdfDescargarUrl: profile[field] || null,
                disponible: !!profile[field],
              })),
            },
          ],
        },
      ]
    : [];

  if (loading) return <p>Cargando documentos...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header ruta="/dashboard" textoWindows="Volver a mi espacio" textoMovil="Volver" />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
        <StepperConNavegacion currentStep={pasoActual} steps={pasos} onStepChange={handleStepChange} onComplete={handleComplete} />

        <div style={{ marginTop: "60px", width: "100%" }}>
          <DocumentosAdjuntados
            titulo="Documentos Adjuntados"
            paginas={datosPaginas}
            onVisualizarPDF={handleVisualizarPDF}
            onDescargarPDF={handleDescargarPDF}
          />
        </div>
      </main>

      <Footer />

      {/* Modal PDF */}
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
            <iframe
              src={pdfURL}
              title="PDF Viewer"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerDocumento;

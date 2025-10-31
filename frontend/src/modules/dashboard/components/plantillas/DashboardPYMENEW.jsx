import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "../../../../globals/hooks/useMediaQuery";
import { GridContainer } from "../../../../globals/components/atomos/GridContainer";
import { NotificationCard } from "../moleculas/NotificationCard";
import { QuickAccessButtons } from "../moleculas/QuickAccessButtons";
import { ProcessCard } from "../organismos/ProcessCard";
import { UserInfoCard } from "../organismos/UserInfoCard";
import { CreditStatusCard } from "../organismos/CreditStatusCard";
import { SupportCard } from "../organismos/SupportCard";
import { StartApplicationCardActivo } from "../organismos/StartApplicationCardActivo";
import { SolicitudDetallesModal } from "../moleculas/SolicitudDetallesModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../../stores/UserContext.jsx";
import { ProximosPagosCard } from "../organismos/ProximosPagosCard.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export const DashboardPYMENEW = () => {
  const [showDetallesModal, setShowDetallesModal] = useState(false);
  const [creditInfo, setCreditInfo] = useState(null);
  const [creditInfoBackend, setCreditInfoBackend] = useState(null);
  const [datosVerificados, setDatosVerificados] = useState(null);
  const { user, isLoading } = useContext(UserContext);
  const [procesoSolicitud, setProcesoSolicitud] = useState(0);
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [noti, setnoti] = useState(null);

  // 🖥️ Detectar tamaños de pantalla
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  // 📐 Definir columnas según el tamaño de pantalla
  const mainColumns = isDesktop ? "60% 40%" : "1fr";
  const innerColumns = isTablet ? "1fr 1fr" : "1fr";
  const heightBotom = creditInfo ? "48px" : "33px";

  const RevisarAprobado=[
    { message: "Tu credito ha sido aprobado. Revisa tu gmail", backgroundColor: "#A0E7D4", type: "success" },
    { message: "Espera de 24h a 48h hábiles para el desembolso del dinero", backgroundColor: "#A0E7D4", type: "success" },
  ];

  const RevisarRechazado=[
    { message: "Tu credito ha sido rechazado. Revisa tu gmail", backgroundColor: "#f35f45ff", type: "error" },
  ];

  const NoTieneCredito = [
    { message: "No tienes un crédito activo", backgroundColor: "#f35f45ff", type: "error" },
  ];

  const faltanDocumentos = [
    { message: "Faltan documentos", backgroundColor: "rgba(244, 211, 94, 1)", type: "error" },
  ];

  const EnRevision=[
    { message: "En espera de aprobación", backgroundColor: "#A0E7D4", type: "success" },
  ];


  // --------------------------
  // 1) Cargar creditInfo desde localStorage (una vez)
  // --------------------------
  useEffect(() => {
    const storedCreditInfo = localStorage.getItem("creditInfo");
    if (storedCreditInfo) {
      try {
        const parsed = JSON.parse(storedCreditInfo);
        setCreditInfo(parsed);
      } catch (error) {
        console.error("❌ Error al parsear creditInfo:", error);
      }
    }
  }, []);


  // --------------------------
  // 2) Obtener datosVerificados del profile (cuando user esté disponible)
  // --------------------------
  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user?.id || !user?.token) return;
      try {
        const response = await axios.get(`${API_URL}/profile/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDatosVerificados(response.data.datosVerificados);
      } catch (error) {
        console.error("❌ Error al obtener el perfil:", error.response?.data || error.message);
        // en caso de error dejamos datosVerificados en false para no bloquear la UI
        setDatosVerificados(false);
      }
    };

    fetchPerfil();
  }, [user]);

    useEffect(() => {

      if (!creditInfo?.credit) return;
      if (!user?.id || !user?.token) return;
    const fetchCredit = async () => {
      try {
        const datacredit = await axios.get(`${API_URL}/credit/${creditInfo?.credit?._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "json",
        });
        setCreditInfoBackend(datacredit.data.data);
      } catch (error) {
        console.error("❌ Error al obtener crédito:", error.response?.data || error.message);
      }
    };
    fetchCredit();
  }, [user, creditInfo]);


  // --------------------------
  // 3) Lógica: si creditInfo.PasoActual === 1 y datosVerificados === true => saltar a 2
  //    - Se ejecuta cuando cambie creditInfo o datosVerificados
  // --------------------------
  useEffect(() => {
    // esperando que creditInfo y datosVerificados tengan valor (no null/undefined)
    if (!creditInfo) return;
    if (datosVerificados === null) return; // aún no sabemos

    // Normalizamos nombres: aquí asumo que usas "PasoActual" (mayúscula P).
    const paso = creditInfo.PasoActual ?? creditInfo.pasoActual ?? null;

    if (paso === 1 && datosVerificados === true) {

      const updatedInfo = { ...creditInfo, PasoActual: 2 };
      setCreditInfo(updatedInfo);
      try {
        localStorage.setItem("creditInfo", JSON.stringify(updatedInfo));
      } catch (err) {
        console.error("❌ Error guardando creditInfo actualizado:", err);
      }
    }
  }, [creditInfo, datosVerificados]);

  useEffect(() => {
    if (!creditInfo?.PasoActual) return;

    if (creditInfo.PasoActual == 1 || creditInfo.PasoActual == 2) {
      setProcesoSolicitud(1);
    } else if (creditInfo.PasoActual == 3 || creditInfo.PasoActual == 4 || creditInfo.PasoActual == 5) {
      setProcesoSolicitud(3);
    } else if (creditInfo.PasoActual == 6) {
      setProcesoSolicitud(5);
    } else if (creditInfo.PasoActual == 7) {
      setProcesoSolicitud(6);
    }
    if (creditInfoBackend?.credit.estatus == "aprobado") {
      setProcesoSolicitud(8);
    }
    if (creditInfoBackend?.credit.estatus == "rechazado") {
      setProcesoSolicitud(7);
    }
  }, [creditInfoBackend, creditInfo]);

  // --------------------------
  // Datos de ejemplo de la solicitud (puedes reemplazarlos)


    useEffect(() => {
    if (!creditInfoBackend) {
      setnoti(NoTieneCredito);
    } else {
      setnoti(faltanDocumentos);

      if (creditInfoBackend?.credit.estatus == "revision") {
        setnoti(EnRevision);
      }

      if (creditInfoBackend?.credit.estatus == "aprobado" ) {
        setnoti(RevisarAprobado);
      }

      if (creditInfoBackend?.credit.estatus == "rechazado") {
        setnoti(RevisarRechazado);
      }
    }
  }, [creditInfoBackend]);
  // --------------------------
  const fecha = new Date();
  const solicitudData = {
    nombreEmpresa: user.companyName,
    contacto: user.email,
    fecha: `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
  };

  // --------------------------
  // Handlers
  // --------------------------
  const handleVerSolicitud = () => {
    setShowDetallesModal(true);
  };

  const handleSubirDocumentos = () => {
    navigate("/formulario");
    setShowDetallesModal(false);
  };

  const handleVerContrato = () => {
    setShowDetallesModal(false);
  };

  // --------------------------
  // Render
  // --------------------------
  
  return (
    <main
      style={{
        margin: "0 auto",
        maxWidth: "1300px",
        padding: isMobile ? "20px" : "30px 50px",
        position: "relative",
      }}
    >
      <GridContainer columns={mainColumns} gap={isMobile ? "20px" : "40px"} style={{ alignItems: "start" }}>
        {/* ========== COLUMNA IZQUIERDA ========== */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", order: isMobile ? 1 : 0 }}>
          {/* Grid interno: Notificaciones + Botones */}
          <GridContainer columns={innerColumns} gap="20px">
            <NotificationCard 
              title="Notificaciones"
              notifications={noti}
            />
            <QuickAccessButtons />
          </GridContainer>

          {/* Avance de la solicitud */}
          {!creditInfo ? (
            <StartApplicationCardActivo
              title="Avance de la solicitud"
              showButton={true}
              buttonText="Iniciar solicitud de crédito PyME"
              onButtonClick={() => navigate("/formulario")}
            />
          ) : (
            <StartApplicationCardActivo
              title="Tu solicitud está en curso"
              showProgress={true}
              // detectamos PasoActual o pasoActual (fallback a 1)
              currentStep={creditInfo.PasoActual ?? creditInfo.pasoActual ?? 1}
              totalSteps={6}
              showViewButton={true}
              viewButtonText="Ver mi solicitud"
              onViewButtonClick={handleVerSolicitud}
              statusMessageColor="#FFD88C"
            >
              <div style={{ marginTop: "15px" }}>
                <p>
                  <strong>Tipo de crédito:</strong> {creditInfo?.credit?.creditType ?? "-"}
                </p>
                <p>
                  <strong>Monto solicitado:</strong>{" "}
                  {creditInfo?.credit?.monto_credito ? `S/ ${Number(creditInfo.credit.monto_credito).toLocaleString()}` : "-"}
                </p>
                <p>
                  <strong>Plazos:</strong> {creditInfo?.credit?.plazos ?? "-"} meses
                </p>
              </div>
            </StartApplicationCardActivo>
          )}

          {/* Proceso de la solicitud */}
          <ProcessCard currentStep={procesoSolicitud} />
        </div>

        {/* ========== COLUMNA DERECHA ========== */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <UserInfoCard />

          <CreditStatusCard height="170px" />

          <GridContainer columns={innerColumns} gap="20px">
            <div style={{ border: '0px black solid' }}>
              <ProximosPagosCard />
            </div>
            <SupportCard heightBotom={heightBotom} />
          </GridContainer>
        </div>
      </GridContainer>

      {/* 🪟 Modal de detalles */}
      {showDetallesModal && (
        <SolicitudDetallesModal
          solicitud={solicitudData}
          onClose={() => setShowDetallesModal(false)}
          onSubirDocumentos={handleSubirDocumentos}
          onVerContrato={handleVerContrato}
        />
      )}
    </main>
  );
};
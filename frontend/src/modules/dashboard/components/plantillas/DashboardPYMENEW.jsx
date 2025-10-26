import { useState } from "react";
import { Placeholder } from "../../../../globals/components/atomos/Placeholder";
import { useMediaQuery } from "../../../../globals/hooks/useMediaQuery";
import { GridContainer } from "../../../../globals/components/atomos/GridContainer";
import { NotificationCard } from "../moleculas/NotificationCard";
import { QuickAccessButtons } from "../moleculas/QuickAccessButtons";
import { StartApplicationCard } from "../moleculas/StartApplicationCard";
import { ProcessCard } from "../organismos/ProcessCard";
import { UserInfoCard } from "../organismos/UserInfoCard";
import { CreditStatusCard } from "../organismos/CreditStatusCard";
import { NewFeatureCard } from "../organismos/NewFeatureCard";
import { SupportCard } from "../organismos/SupportCard";
import { StartApplicationCardActivo } from "../organismos/StartApplicationCardActivo";
import { SolicitudDetallesModal } from "../moleculas/SolicitudDetallesModal";

export const DashboardPYMENEW = () => {
  // Estado para controlar el modal
  const [showDetallesModal, setShowDetallesModal] = useState(false);

  // Detectar tamaños de pantalla
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Definir columnas según el tamaño de pantalla
  const mainColumns = isDesktop ? '60% 40%' : '1fr';
  const innerColumns = isTablet ? '1fr 1fr' : '1fr';

  // Datos de la solicitud
  const solicitudData = {
    nombreEmpresa: "Mobile Tech",
    cuit: "9873 2345",
    proposito: "Capital de Trabajo",
    contacto: "pabloc.admin@mobilet.com",
    fecha: "23/10/2025",
    notificacion: "El asesor necesita un nuevo documento"
  };

  // Handlers
  const handleVerSolicitud = () => {
    setShowDetallesModal(true);
  };

  const handleSubirDocumentos = () => {
    console.log("Subir documentos");
    setShowDetallesModal(false);
    // Aquí rediriges a la página de documentos
  };

  const handleVerContrato = () => {
    console.log("Ver contrato");
    setShowDetallesModal(false);
    // Aquí abres el contrato
  };

  return (
    <main style={{ 
      margin: '0 auto',
      maxWidth: '1300px',
      padding: isMobile ? '20px' : '30px 50px',
      position: 'relative' // Para que el modal se posicione correctamente
    }}>
      
      <GridContainer 
        columns={mainColumns}
        gap={isMobile ? '20px' : '40px'}
        style={{ alignItems: 'start' }}
      >
        
        {/* ========== COLUMNA IZQUIERDA ========== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', order: isMobile ? 1 : 0 }}>
          
          {/* Grid interno: Notificaciones + Documentos */}
          <GridContainer columns={innerColumns} gap="20px">
            <NotificationCard
              notifications={[
                {
                  message: 'Tu solicitud ha sido aprobada',
                  backgroundColor: '#A0E7D4',
                  type: 'success'
                },
                {
                  message: 'Falta documentación',
                  backgroundColor: '#FFB8B8',
                  type: 'error'
                }
              ]}
            />
            <QuickAccessButtons />
          </GridContainer>
          
          {/* Avance de la solicitud */}
          <StartApplicationCardActivo 
            title="Avance de la solicitud"
            showProgress={true}
            currentStep={3}
            totalSteps={5}
            showViewButton={true}
            viewButtonText="Ver mi solicitud"
            statusMessage="El asesor necesito un nuevo documento"
            statusMessageColor="#FFD88C"
            height="128px"
            onViewButtonClick={handleVerSolicitud}
          />
          
          {/* Proceso de la solicitud */}
          <ProcessCard />
          
        </div>
        
        {/* ========== COLUMNA DERECHA ========== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Info del usuario */}
          <UserInfoCard />
          
          {/* Tu crédito actual */}
          <CreditStatusCard height="170px" />
          
          {/* Grid interno: Pronto + Soporte */}
          <GridContainer columns={innerColumns} gap="20px">
            <NewFeatureCard />
            <SupportCard />
          </GridContainer>
          
        </div>
        
      </GridContainer>

      {/* Modal de detalles - flotante en el medio */}
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
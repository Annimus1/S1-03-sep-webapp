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
export const DashboardPYMENEW = () => {
  // Detectar tamaños de pantalla
  const isDesktop = useMediaQuery('(min-width: 992px)');   // >= 992px
  const isTablet = useMediaQuery('(min-width: 768px)');    // >= 768px
  const isMobile = useMediaQuery('(max-width: 767px)');    // <= 767px

  // Definir columnas según el tamaño de pantalla
  const mainColumns = isDesktop ? '60% 40%' : '1fr';  // Desktop: 2 cols, Mobile: 1 col
  const innerColumns = isTablet ? '1fr 1fr' : '1fr';  // Tablet+: 2 cols, Mobile: 1 col

  return (
    <main style={{ 
      margin: '0 auto',
      maxWidth: '1600px',
      padding: isMobile ? '20px' : '30px 50px' 
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
            height="auto"
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
    </main>
  );
};
import { Placeholder } from "../../../../globals/components/atomos/Placeholder";
import { useMediaQuery } from "../../../../globals/hooks/useMediaQuery";
import { GridContainer } from "../../../../globals/components/atomos/GridContainer";
import { NotificationCard } from "../moleculas/NotificationCard";
import { QuickAccessButtons } from "../moleculas/QuickAccessButtons";
import { ProcessCard } from "../organismos/ProcessCard";
import { SupportCard } from "../organismos/SupportCard";
import { StartApplicationCardActivo } from "../organismos/StartApplicationCardActivo";
import { NewFeatureCard } from "../organismos/NewFeatureCard";
import { DetalleSolicitud } from "../organismos/DetalleSolicitud";
import { BandejaSolicitudesPage } from "./BandejaSolicitudesPage";

export const DashboardASESOR = () => {
  // Detectar tamaños de pantalla
  const isDesktop = useMediaQuery('(min-width: 992px)');   // >= 992px
  const isTablet = useMediaQuery('(min-width: 768px)');    // >= 768px
  const isMobile = useMediaQuery('(max-width: 767px)');    // <= 767px

  // Definir columnas según el tamaño de pantalla
  const mainColumns = isDesktop ? '60% 40%' : '1fr';  // Desktop: 2 cols, Mobile: 1 col
  const innerColumns = isTablet ? '1fr 1fr' : '1fr';  // Tablet+: 2 cols, Mobile: 1 col
  const detailColumns = isTablet ? '57.5% 40%' : '1fr';  // Tablet+: 2 cols, Mobile: 1 col

  return (
    <main style={{ 
      margin: '0 auto',
      maxWidth: '1300px',
      padding: isMobile ? '5px' : '30px 50px'
    }}>
      
      <GridContainer 
        columns={mainColumns}
        gap={isMobile ? '20px' : '40px'}
        style={{ alignItems: 'start' }}
      >
        
        {/* ========== COLUMNA IZQUIERDA ========== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', order: isMobile ? 1 : 0 }}>
          
          {/* Grid interno: Notificaciones + Documentos */}
          <GridContainer columns='1fr' gap="20px">
            <NotificationCard columns={innerColumns}
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
          </GridContainer>
          
          {/* Avance de la solicitud */}
          <GridContainer columns={detailColumns} gap="20px">
            <DetalleSolicitud columns={innerColumns}/>
            <QuickAccessButtons/>
          </GridContainer>
          
          {/* Proceso de la solicitud */}
          <BandejaSolicitudesPage />
          
        </div>
        
        {/* ========== COLUMNA DERECHA ========== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* INFO DEL ASESOR */}
          <Placeholder>
            <h3 style={{ textAlign: 'center', paddingTop: '80px', color: '#888' }}>
              Avance de la solicitud (Próximamente)
            </h3>
          </Placeholder>
          
          {/* Grid interno: Pronto + Soporte */}
          <GridContainer columns={innerColumns} gap="20px">
            <NewFeatureCard />
            <SupportCard text1="Chat con otros asesores" text2="Contacto administración"/>
          </GridContainer>
          
        </div>
        
      </GridContainer>
    </main>
  );
};
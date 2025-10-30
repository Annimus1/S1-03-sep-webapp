import { useMediaQuery } from "../../../../globals/hooks/useMediaQuery";
import { GridContainer } from "../../../../globals/components/atomos/GridContainer";
import { NotificationCard } from "../moleculas/NotificationCard";
import { QuickAccessButtons } from "../moleculas/QuickAccessButtons";
import { SupportCard } from "../organismos/SupportCard";
import { NewFeatureCard } from "../organismos/NewFeatureCard";
import { DetalleSolicitud } from "../organismos/DetalleSolicitud";
import { BandejaSolicitudesPage } from "./BandejaSolicitudesPage";
import { SolicitudesTemplate } from "../plantilla/SolicitudesTemplate";
import { useState } from "react";
import { SolicitudDetallesModalASESOR } from "../moleculas/SolicitudDetallesModalASESOR.jsx";


export const DashboardASESOR = () => {
  const [showDetallesModal, setShowDetallesModal] = useState(false);
  // estado globar para compartir entre componentes hijo
  const [ asesorData, setAsesorData ] = useState({
    detallesSolicitud: {nombre:'', id:'', cantidad:0, estado:''},
    stats: {pendientes: 0 , evaluacion: 0, total: 0, aprobados: 0, rechazados: 0}
  });
  // Detectar tamaños de pantalla
  const isDesktop = useMediaQuery('(min-width: 992px)');   // >= 992px
  const isTablet = useMediaQuery('(min-width: 768px)');    // >= 768px
  const isMobile = useMediaQuery('(max-width: 767px)');    // <= 767px

  // Definir columnas según el tamaño de pantalla
  const mainColumns = isDesktop ? '60% 40%' : '1fr';  // Desktop: 2 cols, Mobile: 1 col
  const innerColumns = isTablet ? '1fr 1fr' : '1fr';  // Tablet+: 2 cols, Mobile: 1 col
  const detailColumns = isTablet ? '57.5% 40%' : '1fr';  // Tablet+: 2 cols, Mobile: 1 col

  const handleVerSolicitud = () => {
    setShowDetallesModal(true);
  };

  

    const solicitudData = {
    nombreEmpresa: "Mobile Tech",
    cuit: "9873 2345",
    proposito: "Capital de Trabajo",
    contacto: "pabloc.admin@mobilet.com",
    fecha: "23/10/2025",
    notificacion: "El asesor necesita un nuevo documento",
  };

  // Calculando porcentajes basados en 32 solicitudes totales
  const statusData = [
    {
      label: 'aprobados',
      percentage: (asesorData.stats.aprobados/asesorData.stats.total)*100, // ~20 de 32
      color: '#2d5f4f'
    },
    {
      label: 'rechazados',
      percentage: (asesorData.stats.rechazados/asesorData.stats.total)*100, // ~5 de 32
      color: '#8b3a3a'
    },
    {
      label: 'recaudacion',
      percentage: (asesorData.stats.pendientes/asesorData.stats.total)*100, // ~7 de 32
      color: '#1e5a7d'
    }
  ];

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
          <GridContainer columns='77% 20%' gap="20px" >
            <DetalleSolicitud columns={innerColumns} asesorData={asesorData} onButtonClick={handleVerSolicitud}/>
            <QuickAccessButtons/>
          </GridContainer>
          
          {/* Proceso de la solicitud */}
          <BandejaSolicitudesPage setAsesorData={setAsesorData} asesorData={asesorData}/>
          
        </div>
        
        {/* ========== COLUMNA DERECHA ========== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* STATS? */}
          <SolicitudesTemplate   
            pendientes={asesorData.stats.pendientes}
            tiempoPromedio="2 días"
            enEvaluacion={asesorData.stats.evaluacion}
            totales={asesorData.stats.total} 
            statusData={statusData} 
          />
          
          {/* Grid interno: Pronto + Soporte */}
          <GridContainer columns={innerColumns} gap="20px">
            <NewFeatureCard />
            <SupportCard text1="Chat con otros asesores" text2="Contacto administración" heightBotom="38px"/>
          </GridContainer>
          
        </div>
        
      </GridContainer>
      {/* 🪟 Modal de detalles */}
      {showDetallesModal && (
        <SolicitudDetallesModalASESOR
          solicitud={asesorData.detallesSolicitud}
          onClose={() => setShowDetallesModal(false)}
          onSubirDocumentos={() => {alert('APROBADO')}}
          onVerContrato={() => {alert('RECHAZADO')}}
        />
      )}
    </main>
  );
};
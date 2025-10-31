import React from 'react';
import { GlobalVisionSection } from '../organismos/GlobalVisionSection';
import { GridContainer } from '../../../../globals/components/atomos/GridContainer';
import { StatCard } from '../atomos/StatCard';
import { useMediaQuery } from '../../../../globals/hooks/useMediaQuery';

export const SolicitudesTemplate = ({
  pendientes,
  tiempoPromedio,
  enEvaluacion,
  totales,
  statusData,
}) => {
  // 💡 Responsividad con tu hook
  const isSmallMobile = useMediaQuery('(max-width: 576px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const styles = {
    container: {
      backgroundColor: '#ffffffff',
      margin: '0 auto',
      borderRadius: '40px',
      padding: isSmallMobile ? '2rem' : '2rem',
      width: '100%',
    },
  };

  const columns = isMobile ? '1fr' : '1fr 1fr';
  const marginBottom = isMobile ? '0.75rem' : '1.8rem';

  return (
    <div style={styles.container}>
      <GridContainer columns={columns} gap="2px">
        <StatCard
          // recaudacion
          title="Solicitudes pendientes (recaudacion)"
          value={pendientes}
          marginBottom={marginBottom}
        />
        <StatCard
          title="Tiempo promedio de aprobación"
          value={tiempoPromedio}
        />
        <StatCard
          title="Solicitudes en evaluación"
          value={enEvaluacion}
        />
        <StatCard
          title="Solicitudes totales"
          value={totales}
        />
      </GridContainer>

      <GlobalVisionSection statusData={statusData} />
    </div>
  );
};

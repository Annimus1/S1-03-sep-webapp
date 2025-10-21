import React from 'react';
import { StatusRow } from '../moleculas/StatusRow';
import { useMediaQuery } from '../../../../globals/hooks/useMediaQuery';

export const GlobalVisionSection = ({ statusData }) => {

  const isMobile = useMediaQuery('(max-width: 768px)');

  const styles = {
    section: {
      maxWidth: '900px',
      margin: '0 auto',
    },
    title: {
      fontSize: isMobile ? '1.1rem' : '1.25rem',
      fontWeight: '400',
      color: '#1a1a1a',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      marginTop: '2rem',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Visión global de solicitudes</h2>
      <div style={styles.list}>
        {statusData.map((status, index) => (
          <StatusRow
            key={index}
            label={status.label}
            percentage={status.percentage}
            color={status.color}
          />
        ))}
      </div>
    </div>
  );
};

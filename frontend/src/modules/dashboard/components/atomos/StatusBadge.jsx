export const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'Pendiente': {
        background: '#6c757d',
        color: 'white'
      },
      'Aprobado': {
        background: '#1e5a47',
        color: 'white'
      },
      'Rechazado': {
        background: '#8b2b2b',
        color: 'white'
      },
      'En revisión': {
        background: '#1a4d7a',
        color: 'white'
      },
      'En pausa': {
        background: '#d4a337',
        color: '#2c2c2c'
      }
    };
    return configs[status] || configs['Pendiente'];
  };

  const config = getStatusConfig(status);
  const styles = {
    badge: {
      background: config.background,
      color: config.color,
      padding: '8px 24px',
      borderRadius: '20px',
      fontSize: '0.95rem',
      fontWeight: '500',
      display: 'inline-block',
      whiteSpace: 'nowrap'
    }
  };

  return <span style={styles.badge}>{status}</span>;
};
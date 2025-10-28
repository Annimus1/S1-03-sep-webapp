export const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'aprobado': {
        background: '#1e5a47',
        color: 'white'
      },
      'rechazado': {
        background: '#8b2b2b',
        color: 'white'
      },
      'revision': {
        background: '#1a4d7a',
        color: 'white'
      },
      'recaudacion de documentos': {
        background: '#d4a337',
        color: '#2c2c2c'
      }
    };
    return configs[status] || configs['recaudacion de documentos'];
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

  return <span style={styles.badge}>{status.split(' ')[0]}</span>;
};
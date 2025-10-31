export const NotificationIcon = ({ type = 'warning' }) => {
  const colors = {
    warning: '#2C3E50',
    info: '#2C3E50',
    success: '#2C3E50',
    error: '#2C3E50'
  };

  return (
    <div style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill={colors[type]}>
        <circle cx="12" cy="12" r="10" fill="none" stroke={colors[type]} strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" stroke={colors[type]} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill={colors[type]} />
      </svg>
    </div>
  );
};
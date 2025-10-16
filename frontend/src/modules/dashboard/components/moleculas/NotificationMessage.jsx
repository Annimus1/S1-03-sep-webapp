export const NotificationMessage = ({ 
  children, 
  backgroundColor = '#FFD88C',
  textColor = '#2C3E50'
}) => (
  <div style={{
    backgroundColor: backgroundColor,
    borderRadius: '25px',
    padding: '2px 24px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }}>
    <p style={{
      color: textColor,
      fontSize: '15px',
      fontWeight: '600',
      margin: 0
    }}>
      {children}
    </p>
  </div>
);
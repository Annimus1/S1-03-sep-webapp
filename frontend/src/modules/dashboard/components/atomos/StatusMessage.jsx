
export const StatusMessage = ({ children, backgroundColor = '#FFD88C' }) => (
  <div style={{
    backgroundColor: backgroundColor,
    borderRadius: '20px',
    padding: '6px 20px',
    display: 'inline-block',
  }}>
    <p style={{
      color: '#2C3E50',
      fontSize: '12px',
      fontWeight: '600',
      margin: 0
    }}>
      {children}
    </p>
  </div>
);
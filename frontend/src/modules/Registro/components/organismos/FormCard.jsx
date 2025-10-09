export const FormCard = ({ children, title, showBackButton, onBack, errorMessage }) => (
  <div style={{
    backgroundColor: '#a8e6d8',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
  }}>
    {title && (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        {showBackButton && (
          <button
            onClick={onBack}
            style={{
              background: '#0d5047',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#0a3d36'}
            onMouseLeave={(e) => e.target.style.background = '#0d5047'}
          >
            ←
          </button>
        )}
        <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>{title}</h3>
      </div>
    )}
    {errorMessage && (
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '20px',
        color: '#856404',
        fontSize: '14px'
      }}>
        {errorMessage}
      </div>
    )}
    {children}
  </div>
);
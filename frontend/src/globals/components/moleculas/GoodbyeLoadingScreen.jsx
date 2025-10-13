export const GoodbyeLoadingScreen = ({ userName }) => (
  <div className="d-flex flex-column align-items-center justify-content-center" 
    style={{ 
      minHeight: '60vh',
      animation: 'fadeIn 0.5s ease-in'
    }}>
    <div style={{
      background: '#1a4d5c',
      color: 'white',
      padding: '24px 48px',
      borderRadius: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 12px rgba(26, 77, 92, 0.3)',
      animation: 'slideDown 0.5s ease-out'
    }}>
      <h2 className="mb-0" style={{ fontSize: '24px', fontWeight: '600' }}>
        ¡Hasta pronto, {userName}!
      </h2>
    </div>
    <p className="text-muted" style={{ fontSize: '14px' }}>
      Gracias por confiar en <strong>Kredia</strong>. Nos vemos pronto para seguir impulsando tu crédito.
    </p>
  </div>
);
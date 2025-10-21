export const NewFeatureCard = ({height = '100%'}) => (
  <div style={{
    background: 'linear-gradient(135deg, #7FE8D8 0%, #5EDCC6 100%)',
    borderRadius: '40px',
    padding: '24px',
    height: height
  }}>
    <h5 style={{
      color: '#2C3E50',
      fontSize: '19px',
      fontWeight: '700',
      marginBottom: '10px'
    }}>¡Pronto nueva función!</h5>
    <p style={{
      color: '#2C3E50',
      fontSize: '14px',
      margin: 0
    }}>Sistema de contabilidad para PyME's</p>
  </div>
);
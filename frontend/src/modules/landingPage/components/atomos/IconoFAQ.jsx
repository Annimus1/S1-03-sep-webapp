/**
 * Ícono de expansión (+/-) para las preguntas frecuentes
 * @param {boolean} estaAbierto - Indica si el FAQ está expandido o no
 */
export const IconoFAQ = ({ estaAbierto }) => (
  <div style={{
    width: 32,
    height: 32,
    backgroundColor: '#1a3a3a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    flexShrink: 0,
    transition: 'transform 0.3s ease'
  }}>
    {estaAbierto ? '−' : '+'}
  </div>
);
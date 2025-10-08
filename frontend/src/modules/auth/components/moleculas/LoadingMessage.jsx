
/**
 * Componente LoadingMessage
 * Mensaje informativo durante el estado de carga
 * 
 * @param {string} text - Mensaje a mostrar
 * @returns {JSX.Element} Mensaje con fondo turquesa y bordes redondeados
 */
export const LoadingMessage = ({ text }) => (
  <div style={{
    background: '#5BE2C580',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(79, 209, 197, 0.3)'
  }}>
    {text}
  </div>
);
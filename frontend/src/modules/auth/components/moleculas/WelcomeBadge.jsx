import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente WelcomeBadge
 * Badge de bienvenida con gradiente oscuro y bordes redondeados
 * 
 * @param {string} text - Texto a mostrar en el badge
 * @returns {JSX.Element} Badge estilizado con gradiente verde oscuro
 */

export const WelcomeBadge = ({ text }) => (
  <div style={{
    background: 'linear-gradient(135deg, #2C5F5D 0%, #1A3F3D 100%)',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(44, 95, 93, 0.3)',
    marginBottom: '24px',
    display: 'inline-block'
  }}>
    {text}
  </div>
);
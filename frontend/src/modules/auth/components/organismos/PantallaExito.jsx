import { WelcomeBadge } from "../moleculas/WelcomeBadge";

/**
 * Componente PantallaExito
 * Pantalla de éxito que se muestra después de un login exitoso
 * 
 * @param {string} userName - Nombre del usuario que inició sesión
 * @returns {JSX.Element} Pantalla de éxito con mensaje de bienvenida
 */
export const PantallaExito = ({ userName }) => (
  <div style={{
    textAlign: 'center',
    maxWidth: '450px',
    width: '100%',
    margin: '0 auto'
  }}>
    <WelcomeBadge text={`¡Bienvenido de vuelta, ${userName}!`} />
    <p style={{
      color: '#718096',
      fontSize: '16px',
      marginTop: '20px'
    }}>
      Redirigiendo a tu panel...
    </p>
  </div>
);
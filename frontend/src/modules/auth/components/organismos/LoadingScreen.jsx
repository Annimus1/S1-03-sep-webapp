import { LoadingMessage } from "../moleculas/LoadingMessage";
import { AnimacionCarga } from "../../../../globals/components/atomos/AnimacionCarga";

/**
 * Componente LoadingScreen
 * Pantalla que se muestra durante la validación de credenciales
 * Incluye spinner animado y mensaje de carga
 * 
 * @param {string} userName - Nombre del usuario (no usado actualmente, preparado para futuro)
 * @returns {JSX.Element} Pantalla de carga con spinner
 */

export const LoadingScreen = ({ userName }) => (
  <div style={{
    background: 'linear-gradient(135deg, #B2F5EA 0%, #81E6D9 100%)',
    borderRadius: '32px',
    padding: '60px 40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    maxWidth: '450px',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center'
  }}>
    <AnimaciónCarga />
    <LoadingMessage text="Validando tus credenciales..." />
  </div>
);
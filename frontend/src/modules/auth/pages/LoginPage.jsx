import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonAnimado } from '../../../globals/components/atomos/BotonAnimado'
import { PantallaExito } from '../components/organismos/PantallaExito';
import { LoginCard } from '../components/organismos/LoginCard';
import { Logo } from '../../../globals/components/atomos/Logo';

/**
 * Componente LoginPage
 * Página principal del módulo de autenticación
 * Maneja tres estados: formulario normal, carga y éxito
 * 
 * Estados gestionados:
 * - email: valor del campo de email
 * - password: valor del campo de contraseña
 * - error: mensaje de error de validación
 * - loading: estado de carga durante la autenticación
 * - success: indica si el login fue exitoso
 * 
 * @returns {JSX.Element} Página completa de login con header, formulario y footer
 */

const LoginPage = () => {
  // Estado del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   * Maneja el envío del formulario de login
   * Valida los campos, simula la autenticación y maneja los estados de carga/éxito
   */
  const handleSubmit = () => {
    setError('');
    
    // Validación básica: verifica que ambos campos tengan contenido
    if (!email || !password) {
      setError('Verifica tu correo o contraseña e inténtalo nuevamente.');
      return;
    }

    // Simula el proceso de login con timeout
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Simula redirección al dashboard después de 2 segundos
      setTimeout(() => {
        alert('Redirigiendo al dashboard...');
      }, 2000);
    }, 2000); // Simula 2 segundos de procesamiento
  };

  /**
   * Maneja el clic en "¿Olvidaste tu contraseña?"
   * En producción, esto abriría un modal o redigiría a una página de recuperación
   */
  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)', // Fondo gris claro
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header con logo y botón de registro */}
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center py-3 mb-4">
          <Logo />
          <BotonAnimado variant="secondary" onClick={() => alert('Ir a registro')}>
            ¿Aún no tienes tu cuenta? Regístrate
          </BotonAnimado>
        </div>
      </div>

      {/* Contenido principal - Renderizado condicional según el estado */}
      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          {success ? (
            // Estado 3: Login exitoso
            <PantallaExito userName="Usuario" />
          ) : loading ? (
            // Estado 2: Validando credenciales
            <LoadingScreen />
          ) : (
            // Estado 1: Formulario de login
            <LoginCard
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={handleSubmit}
              onForgotPassword={handleForgotPassword}
              error={error}
              loading={loading}
            />
          )}
        </div>
      </div>

      {/* Footer con copyright y enlaces */}
      <div className="text-center py-3" style={{ color: '#718096', fontSize: '14px' }}>
        Copyright @2025 Kredia{' '}
        <a href="#" style={{ color: '#553C9A', textDecoration: 'none', fontWeight: '600' }}>
          Términos y Condiciones
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
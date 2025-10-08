import 'bootstrap/dist/css/bootstrap.min.css';
import { WelcomeBadge } from '../moleculas/WelcomeBadge';
import { FormFieldLogin } from '../moleculas/FormFieldLogin';

/**
 * Componente LoginCard
 * Tarjeta completa del formulario de login
 * Incluye campos de email y contraseña, manejo de errores y estados de carga
 * 
 * @param {string} email - Valor del campo de email
 * @param {string} password - Valor del campo de contraseña
 * @param {function} onEmailChange - Manejador de cambios del email
 * @param {function} onPasswordChange - Manejador de cambios de contraseña
 * @param {function} onSubmit - Función para enviar el formulario
 * @param {function} onForgotPassword - Función para recuperar contraseña
 * @param {string} error - Mensaje de error (si existe)
 * @param {boolean} loading - Estado de carga
 * @returns {JSX.Element} Tarjeta completa del formulario de login
 */

export const LoginCard = ({
  email, 
  password, 
  onEmailChange, 
  onPasswordChange, 
  onSubmit,
  onForgotPassword,
  error,
  loading   
}) => (
  <div>
    <div className="text-center mb-4">
      <WelcomeBadge text="¡Bienvenido a tu espacio!" />
    </div>

    <div style={{
      background: 'linear-gradient(135deg, #B2F5EA 0%, #81E6D9 100%)',
      borderRadius: '32px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      maxWidth: '450px',
      width: '100%',
      margin: '0 auto'
    }}>

    <FormFieldLogin
      label="Correo electrónico"
      type="email"
      placeholder="tuempresa@correo.com"
      value={email}
      onChange={onEmailChange}
      helpText="Usa el correo con el que creaste tu cuenta."
      errorText={error}
      disabled={loading}
    />

    <FormFieldLogin
      label="Contraseña"
      type="password"
      placeholder="••••••••••••"
      value={password}
      onChange={onPasswordChange}
      helpText="Tu información está cifrada y protegida"
      disabled={loading}
    />

    <div className="text-center mb-3">
      <p style={{ fontSize: '12px', color: '#4A5568', marginBottom: '12px' }}>
        *Tu información está protegida con tecnología KYC y cifrado de nivel bancario.
      </p>

      // RECORDAR CAMBIAR ESTE Campo A UN BOTÓN SIN RELLENO

      <div>
        ¿Olvidaste tu contraseña?
      </div>

      // RECORDAR CAMBIAR ESTE Campo A UN BOTÓN SIN RELLENO
    </div>

    </div>
    
    // RECORDAR CAMBIAR ESTE Campo A UN BOTÓN CON POSICION RELARTIVA

    <div>
      ¿Olvidaste tu contraseña?
    </div>

    // RECORDAR CAMBIAR ESTE Campo A UN BOTÓN CON POSICION RELARTIVA

  </div>
);
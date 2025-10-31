import 'bootstrap/dist/css/bootstrap.min.css';
import { Logo } from '../atomos/Logo';
/**
 * Footer de la página con información legal
 */
export const Footer = () => (
  <footer style={{ backgroundColor: '#1a4a4a', padding: '30px 0'}}>
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <Logo isWhite={true} maxWidth={80} />
        <p style={{ color: 'white', margin: 0, fontSize: '14px', textAlign: 'center' }}>
          © 2025 Kredia - Todos los derechos reservados
        </p>
      </div>
    </div>
  </footer>
);
import 'bootstrap/dist/css/bootstrap.min.css';
import { Logo } from '../../../../globals/components/atomos/Logo';

/**
 * Barra de navegación superior con logo y botón de ingreso
 */
export const Header = () => (
  <nav className="navbar navbar-light bg-white py-3 shadow-sm">
    <div className="container-fluid px-3 px-md-5 d-flex justify-content-between align-items-center">
      <Logo />
      {/* Botón de ingreso a la cuenta */}
      <button 
        className="btn"
        style={{ 
          backgroundColor: '#7B1FA2', 
          border: 'none', 
          color: 'white', 
          borderRadius: 25, 
          padding: '10px 20px', 
          fontWeight: 600, 
          fontSize: '13px',
          whiteSpace: 'nowrap'
        }}
      >
        Ingresa a tu espacio
      </button>
    </div>
  </nav>
);
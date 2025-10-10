import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../../stores/UserContext';
import { Logo } from '../../../globals/components/atomos/Logo';

// ============================================
// ÁTOMOS (Atoms)
// ============================================

const UserIconSmall = () => (
  <div className="user-icon-small">
    <div className="user-icon-circle-small"></div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', onClick }) => (
  <button 
    className={`custom-btn custom-btn-${variant} ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const LogoutButton = ({ onClick }) => (
  <button className="logout-btn" onClick={onClick} title="Cerrar sesión">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  </button>
);

// ============================================
// MOLÉCULAS (Molecules)
// ============================================

const UserProfileCard = ({ user }) => (
  <div className="user-profile-card">
    <div className="user-avatar-large">
      <div className="user-avatar-circle"></div>
    </div>
    
    <div className="user-info">
      <div className="info-row">
        <div className="info-item">
          <label>Nombre</label>
          <p>{user?.nombre || 'Usuario'}</p>
        </div>
      </div>
      
      <div className="info-row">
        <div className="info-item">
          <label>Email</label>
          <p>{user?.email || 'email@example.com'}</p>
        </div>
        <div className="info-item">
          <label>Score</label>
          <p>405 pts</p>
        </div>
      </div>
      
      <Button variant="outline" className="verify-btn">
        Verificar mi cuenta
      </Button>
    </div>
  </div>
);

// ============================================
// ORGANISMOS (Organisms)
// ============================================

const Header = ({ onLogout }) => (
  <header className="main-header">
    <div className="container">
      <div className="header-content">
        <Logo />
        <div className="header-actions">
          <UserIconSmall />
          <LogoutButton onClick={onLogout} />
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="main-footer">
    <div className="container">
      <div className="footer-content">
        <Logo isWhite={true} maxWidth="100px" />
        <p className="copyright">@2025 Kredia - Todos los derechos reservados</p>
      </div>
    </div>
  </footer>
);

// ============================================
// PÁGINA PRINCIPAL
// ============================================

const Dashboard = () => {

  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      window.location.href = '/';
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: #f5f5f8;
        }

        /* ====== HEADER ====== */
        
        .main-header {
          background: white;
          padding: 16px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* ====== LOGO ====== */
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #5dd9c1 0%, #4cc9ae 100%);
          border-radius: 8px;
          position: relative;
        }

        .logo-icon::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 8px;
          width: 24px;
          height: 14px;
          border-left: 3px solid white;
          border-bottom: 3px solid white;
          transform: rotate(-5deg);
        }

        .logo-icon::before {
          content: '';
          position: absolute;
          top: 8px;
          right: 8px;
          width: 18px;
          height: 18px;
          border-top: 3px solid white;
          border-right: 3px solid white;
          transform: rotate(45deg);
        }

        .logo-text {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
        }

        /* ====== USER ICON HEADER ====== */
        
        .user-icon-small {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #b8a4d8 0%, #9b87c7 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .user-icon-small:hover {
          transform: scale(1.05);
        }

        .user-icon-circle-small {
          width: 24px;
          height: 24px;
          border: 3px solid white;
          border-radius: 50%;
          position: relative;
        }

        .user-icon-circle-small::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 16px;
          border: 3px solid white;
          border-radius: 16px 16px 0 0;
          border-bottom: none;
        }

        /* ====== LOGOUT BUTTON ====== */
        
        .logout-btn {
          width: 44px;
          height: 44px;
          background: #ff6b6b;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          color: white;
        }

        .logout-btn:hover {
          background: #ff5252;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }

        .logout-btn:active {
          transform: scale(0.95);
        }

        /* ====== USER PROFILE CARD ====== */
        
        .user-profile-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          display: flex;
          gap: 24px;
          max-width: 700px;
          margin: 40px auto;
        }

        .user-avatar-large {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #b8a4d8 0%, #9b87c7 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-avatar-circle {
          width: 52px;
          height: 52px;
          border: 5px solid white;
          border-radius: 50%;
          position: relative;
        }

        .user-avatar-circle::after {
          content: '';
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 36px;
          border: 5px solid white;
          border-radius: 36px 36px 0 0;
          border-bottom: none;
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .info-item label {
          display: block;
          font-size: 13px;
          color: #999;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .info-item p {
          margin: 0;
          font-weight: 600;
          color: #1a1a2e;
          font-size: 15px;
        }

        /* ====== BUTTON ====== */
        
        .custom-btn {
          border: none;
          padding: 10px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }

        .custom-btn-outline {
          background: white;
          color: #6c5ce7;
          border: 2px solid #6c5ce7;
        }

        .custom-btn-outline:hover {
          background: #6c5ce7;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
        }

        .verify-btn {
          margin-top: 8px;
          align-self: flex-start;
        }

        /* ====== FOOTER ====== */
        
        .main-footer {
          background: #0d3a3e;
          color: white;
          padding: 24px 0;
          margin-top: 60px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-content .logo-text {
          color: white;
        }

        .copyright {
          margin: 0;
          font-size: 14px;
        }

        /* ====== MAIN CONTENT ====== */
        
        .main-content {
          min-height: calc(100vh - 180px);
          padding: 20px 0;
        }

        /* ====== RESPONSIVE ====== */
        
        @media (max-width: 768px) {
          .user-profile-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 24px;
          }

          .info-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .verify-btn {
            align-self: center;
          }

          .footer-content {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .logo-text {
            font-size: 22px;
          }

          .header-actions {
            gap: 12px;
          }

          .user-icon-small {
            width: 44px;
            height: 44px;
          }

          .logout-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 576px) {
          .user-profile-card {
            margin: 20px 16px;
          }

          .logo-text {
            font-size: 24px;
          }

          .user-avatar-large {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>

      <Header onLogout={handleLogout} />
      
      <main className="main-content">
        <div className="container">
          <UserProfileCard user={user?.user} />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;
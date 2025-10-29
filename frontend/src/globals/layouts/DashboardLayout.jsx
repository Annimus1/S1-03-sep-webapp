import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../components/organismo/Footer';
import { Header } from '../../modules/dashboard/components/organismos/Header';
import { UserContext } from '../../stores/UserContext';
import { GoodbyeLoadingScreen } from '../../globals/components/moleculas/GoodbyeLoadingScreen';

const DashboardLayout = () => {
  const { user, logout } = useContext(UserContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <>
        <Header onLogout={handleLogout} />
        <main style={{ flex: 1, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
          {isLoggingOut ? (
            <div
              style={{
                flex: 1,
                padding: '20px',
                backgroundColor: '#f5f5f5',
                height: '100%'
              }}
            >
              <GoodbyeLoadingScreen userName={user?.nombres || 'Usuario'} />
            </div>
          ) : (
            <Outlet />
          )}
        </main>

        {!isMobile && <Footer />}
      </>
    </div>
  );
};

export default DashboardLayout;
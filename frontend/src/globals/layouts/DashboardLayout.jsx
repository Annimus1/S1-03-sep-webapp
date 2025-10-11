import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Organismo/Footer';
import { Header } from '../../modules/dashboard/components/organismos/Header';
import { UserContext } from '../../stores/UserContext';
import { WelcomeLoadingScreen } from '../components/moleculas/WelcomeLoadingScreen';
import { GoodbyeLoadingScreen } from '../components/moleculas/GoodbyeLoadingScreen';

const DashboardLayout = () => {
  const { user, logout } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    setTimeout(() => {
      logout();
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onLogout={handleLogout} />

      <main style={{ flex: 1, overflow: 'auto' }}>
        {isLoggingOut ? (
          <GoodbyeLoadingScreen userName={user?.user?.nombre || 'Usuario'} />
        ) : isLoading ? (
          <WelcomeLoadingScreen  userName={user?.user?.nombre || 'Usuario'} />
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
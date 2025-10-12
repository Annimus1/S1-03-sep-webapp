import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Footer } from '../components/organismo/Footer';
import { Header } from '../../modules/dashboard/components/organismos/Header';
import { UserContext } from '../../stores/UserContext';
import { WelcomeLoadingScreen } from '../components/moleculas/WelcomeLoadingScreen';
import { GoodbyeLoadingScreen } from '../components/moleculas/GoodbyeLoadingScreen';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const Navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async  () => {
    setIsLoggingOut(true);
    await delay(2000);
    Navigate('/');
    logout();
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

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Organismo/Footer';
import { Header } from '../../modules/landingPage/components/organismos/Header';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

        <main style={{ flex: 1 }}>
          {/* El contenido de las rutas hijas se renderiza aquí */}
          <Outlet />
        </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
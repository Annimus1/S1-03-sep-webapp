import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './modules/landingPage/pages/LandingPage';
import MainLayout from './globals/layouts/MainLayout';
import LoginPage from './modules/auth/pages/LoginPage';
import LayaoutAuth from './modules/auth/layouts/LayaoutAuth';
import KrediaRegistro from './modules/Registro/pages/Registro';
import Dashboard from './modules/dashboard/pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import { UserProvider } from './stores/UserContext';
import { Navigate } from 'react-router-dom';
import './styles/index.css';
import DashboardLayout  from './globals/layouts/DashboardLayout';
import Formulario from './modules/formulario/page/Formulario';
import VerDocumento from './modules/visualizarDocumentos/page/VerDocumento';
import PrivateFormulario from './routes/PrivateFormulario';
import VerificarCuenta from './modules/verificarCuenta/pages/VerificarCuenta';

const App = () => {
  return (
    <UserProvider>
      <div style={{ fontFamily: 'Nunito, sans-serif' }}>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            <Route element={<LayaoutAuth />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/*" element={<Navigate to="/login" replace />} />
            </Route>

            <Route path="/registro" element={<KrediaRegistro />} />
            <Route path="/registro/*" element={<Navigate to="/registro" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />

            <Route path="/formulario" element={
                  <PrivateFormulario>
                    <Formulario />
                  </PrivateFormulario>
                }/>

            <Route path="/verificarCuenta" element={
                  <PrivateFormulario>
                    <VerificarCuenta />
                  </PrivateFormulario>
                }/>

            <Route path="/documentos" element={
                  <PrivateFormulario>
                    <VerDocumento />
                  </PrivateFormulario>
                }/>    

            {/* 🔒 Ruta privada con MainLayout */}
            <Route element={< DashboardLayout />}>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
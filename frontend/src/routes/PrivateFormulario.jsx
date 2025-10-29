import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../stores/UserContext';

const PrivateFormulario = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // 1️⃣ Verificar primero si hay usuario en contexto
      if (user && user.token) {
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

      // 2️⃣ Si no hay usuario, buscar token en localStorage
      const token = localStorage.getItem('token');
      if (token) {
        console.log("🔑 Token encontrado en localStorage:", token);
        setIsAuthenticated(true);
      } else {
        console.warn("🚫 No hay token en localStorage ni usuario activo");
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [user]);

  // 🕓 Mostrar nada mientras verifica (puedes poner un loader)
  if (isChecking) return null;

  // 🚷 Si no hay autenticación, redirigir
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Si hay token o user, renderizar el contenido protegido
  return children;
};

export default PrivateFormulario;
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../stores/UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Si no hay usuario, redirige a login
  if (!user) {

    console.log('No hay usuario');

    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra el componente protegido
  return children;
};

export default PrivateRoute;

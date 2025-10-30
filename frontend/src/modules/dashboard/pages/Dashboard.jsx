import { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../../stores/UserContext';
import { WelcomeLoadingScreen } from '../../../globals/components/moleculas/WelcomeLoadingScreen';
import { DashboardPYMENEW } from '../components/plantillas/DashboardPYMENEW';
import { DashboardASESOR } from '../components/plantillas/DashboardASESOR';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        height: '100%',
      }}
    >
      {
      isLoading &&
        <WelcomeLoadingScreen userName={user?.nombres || 'Usuario'} />
      }

      {
        !isLoading && user?.role != 'asesor' &&  <DashboardPYMENEW/>
      }

      {
        !isLoading && user?.role == 'asesor' &&  <DashboardASESOR/>
      }
      
    </main>
  );
};

export default Dashboard;

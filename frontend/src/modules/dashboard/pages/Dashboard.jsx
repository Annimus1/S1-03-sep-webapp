import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../../stores/UserContext';
import { UserProfileCard } from '../components/moleculas/UserProfileCard';

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);

  return (  
    <main style={{
      flex: 1,      
      padding: '20px', 
      backgroundColor: '#f5f5f5',
      height: '100%',
    }}>
      
      <UserProfileCard user={user?.user} />

    </main>
  );
};

export default Dashboard;

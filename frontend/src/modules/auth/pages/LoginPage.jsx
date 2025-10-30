import React, { useState, useEffect, useContext, use } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonAnimado } from '../../../globals/components/atomos/BotonAnimado';
import { PantallaExito } from '../components/organismos/PantallaExito';
import { LoginCard } from '../components/organismos/LoginCard';
import { Logo } from '../../../globals/components/atomos/Logo';
import style from './LoginPage.module.css';
import { AnimacionCarga } from '../../../globals/components/atomos/AnimacionCarga';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { UserContext } from "../../../stores/UserContext";
import { Footer } from '../components/organismos/Footer';
import { Header } from '../../landingPage/components/organismos/Header';

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [esCelular, setEsCelular] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setEsCelular(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    document.title = 'Kredia - Login'
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Verifica tu correo o contraseña e inténtalo nuevamente.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });

      if (response.status === 200) {
        const userData = response.data.user;
        setSuccess(true);
        setUser(userData);
        console.log('✅ Usuario autenticado:', userData);
        localStorage.setItem('data', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);

        console.log('✅ Token guardado en localStorage');
        console.log(userData)

        navigate('/dashboard');
      } else {
        setError('Respuesta inesperada del servidor.');
      }

    } catch (err) {
      console.error('❌ Error en login:', err.response?.data || err.message);

      if (err.response?.status === 401) {
        setError('Credenciales inválidas. Verifica tu correo y contraseña.');
      } else if (err.response?.status === 400 || err.response?.status === 422) {
        setError('Faltan datos o son inválidos.');
      } else {
        setError('Ocurrió un error interno. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
  };

  useEffect( () => {
    const data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    if (data) {
      navigate('/dashboard');
    }
  })


  return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',

          display: 'flex',
          flexDirection: 'column',
        }}
      >
      {/* HEADER */}
      <Header ruta="/registro" textoWindows="¿Aún no tienes tu cuenta? Regístrate" textoMovil="Regístrate"/>

      {/* CONTENIDO CENTRAL CENTRADO */}
      <div
        className="container d-flex justify-content-center align-items-center flex-grow-1"
      >
        <div style={{ width: '100%' }} className={style.anchoLogin}>
          {success ? (
            <PantallaExito userName="Usuario" />
          ) : loading ? (
            <AnimacionCarga />
          ) : (
            <LoginCard
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={handleSubmit}
              onForgotPassword={handleForgotPassword}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default LoginPage;

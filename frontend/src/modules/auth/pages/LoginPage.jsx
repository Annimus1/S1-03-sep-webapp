import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonAnimado } from '../../../globals/components/atomos/BotonAnimado';
import { PantallaExito } from '../components/organismos/PantallaExito';
import { LoginCard } from '../components/organismos/LoginCard';
import { Logo } from '../../../globals/components/atomos/Logo';
import style from './LoginPage.module.css';
import { Footer } from '../components/organismos/Footer';
import { AnimacionCarga } from '../../../globals/components/atomos/AnimacionCarga';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [esCelular, setEsCelular] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setEsCelular(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = () => {
    setError('');
    if (!email || !password) {
      setError('Verifica tu correo o contraseña e inténtalo nuevamente.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        alert('Redirigiendo al dashboard...');
      }, 2000);
    }, 2000);
  };

  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* HEADER */}
      <div className="navbar navbar-light bg-white shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center px-3 px-md-5 flex-wrap">
          <Logo />
          <BotonAnimado
            variante="moradoSuave"
            tamaño="xs"
            onClick={() => alert('Ir a registro')}
            className="text-center text-wrap"
            style={{ whiteSpace: 'normal', maxWidth: '180px' }}
          >
            {esCelular ? (
              <>
                ¿Aún no tienes
                <br />
                tu cuenta? Regístrate
              </>
            ) : (
              '¿Aún no tienes una cuenta? Regístrate'
            )}
          </BotonAnimado>
        </div>
      </div>

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

import 'bootstrap/dist/css/bootstrap.min.css';
import { Logo } from '../../../../globals/components/atomos/Logo';
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';
import { useState, useEffect } from 'react';

/**
 * Barra de navegación superior con logo y botón de ingreso
 */
export const Header = ({texto = 'Ingresar a mi cuenta', textoMovil = 'Ingresar', direccionar='/login'}) => {

  const [tamanioBoton, setTamanioBoton] = useState('m');

  useEffect(() => {
    const actualizarTamanio = () => {
      const width = window.innerWidth;
      
      if (width < 576) {
        // móviles pequeños
        setTamanioBoton('xs');
      } else if (width < 768) {
        // móviles grandes
        setTamanioBoton('s');
      } else if (width < 992) {
        // tablets
        setTamanioBoton('m');
      } else {
        // desktop
        setTamanioBoton('l');
      }
    };

    // Ejecutar al montar
    actualizarTamanio();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', actualizarTamanio);

    // Limpiar listener
    return () => window.removeEventListener('resize', actualizarTamanio);
  }, []);


  return (
    <nav className="navbar navbar-light bg-white py-3 shadow-sm">
      <div className="container-fluid px-3 px-md-5 d-flex justify-content-between align-items-center flex-nowrap">
        <Logo />
        
        {/* Botón de ingreso a la cuenta */}
        <BotonAnimado
          tamaño={tamanioBoton}
          variante="moradoSuave"
          onClick={() => window.location.href = direccionar}
          ancho="auto"
        >
          {/* Texto completo en desktop, abreviado en móvil */}
          <span className="d-none d-md-inline">{texto}</span>
          <span className="d-md-none">{textoMovil}</span>
        </BotonAnimado>
      </div>
    </nav>
  );
};
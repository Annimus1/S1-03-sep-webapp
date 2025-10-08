
import React, { useState } from 'react';

/**
 * Componente de botón con animaciones hover y click
 * 
 * @param {string} children - Texto del botón
 * @param {string} variante - Tipo de botón: 'naranja', 'moradoSuave', 'morado'
 * @param {string} tamaño - Tamaño del botón: 'xs', 's', 'm', 'l'
 * @param {function} onClick - Función a ejecutar al hacer clic
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} deshabilitado - Si el botón está deshabilitado
 * @param {string} ancho - Controla el ancho: 'auto' (inline) o 'completo' (100%)
 */
export const BotonAnimado = ({ 
  children, 
  variante = 'naranja',
  tamaño = 'm',
  onClick, 
  className = '',
  deshabilitado = false,
  ancho = 'auto'
}) => {
  const [estaPresionado, setEstaPresionado] = useState(false);

  // Configuración de tamaños
  const configuracionTamaños = {
    xs: {
      padding: '6px 16px',
      fontSize: '12px',
      borderRadius: 18
    },
    s: {
      padding: '8px 20px',
      fontSize: '13px',
      borderRadius: 20
    },
    m: {
      padding: '12px 30px',
      fontSize: '14px',
      borderRadius: 25
    },
    l: {
      padding: '14px 40px',
      fontSize: '16px',
      borderRadius: 30
    }
  };

  // Configuración de estilos para cada variante
  const configuracionEstilos = {
    naranja: {
      backgroundColor: '#F39C12',
      color: '#FFFFFF',
      border: '2px solid #F39C12',
      borderColor: '#F39C12', 
      hoverBg: '#FFBE58',
      hoverColor: '#F39C12',
      hoverBorder: '#F39C12',
      activeBg: '#FFBE58',
      shadow: '0 4px 15px rgba(243, 156, 18, 0.3)',
      hoverShadow: '0 6px 20px rgba(243, 156, 18, 0.5)',
      activeShadow: '0 2px 8px rgba(243, 156, 18, 0.4)'
    },
    moradoSuave: {
      backgroundColor: 'transparent',
      color: '#000000',
      border: '2px solid #DAD6FE',
      borderColor: '#DAD6FE',
      hoverBg: '#E8E6FF',
      hoverColor: '#000000',
      hoverBorder: '#DAD6FE',
      activeBg: '#E8E6FF',
      shadow: '0 2px 8px rgba(218, 214, 254, 0.3)',
      hoverShadow: '0 4px 12px rgba(218, 214, 254, 0.5)',
      activeShadow: '0 1px 4px rgba(218, 214, 254, 0.4)'
    },
    morado: {
      backgroundColor: '#562CA4',
      color: '#FFFFFF',
      border: '2px solid #562CA4',
      borderColor: '#562CA4',
      hoverBg: '#8752EB',
      hoverColor: '#562CA4',
      hoverBorder: '#562CA4',
      activeBg: '#8752EB',
      shadow: '0 4px 15px rgba(86, 44, 164, 0.3)',
      hoverShadow: '0 6px 20px rgba(86, 44, 164, 0.5)',
      activeShadow: '0 2px 8px rgba(86, 44, 164, 0.4)'
    }
  };

  const estilos = configuracionEstilos[variante];
  const estilosTamaño = configuracionTamaños[tamaño];

  // Estilos base del botón
  const estiloBoton = {
    backgroundColor: estilos.backgroundColor,
    color: estilos.color,
    border: estilos.border,
    borderRadius: estilosTamaño.borderRadius,
    padding: estilosTamaño.padding,
    fontSize: estilosTamaño.fontSize,
    fontWeight: 600,
    cursor: deshabilitado ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: estilos.shadow,
    opacity: deshabilitado ? 0.5 : 1,
    transform: estaPresionado ? 'scale(0.95)' : 'scale(1)',
    whiteSpace: 'nowrap',
    display: ancho === 'completo' ? 'block' : 'inline-block',
    width: ancho === 'completo' ? '100%' : 'auto',
    textAlign: 'center'
  };

  // Manejadores de eventos
  const manejarMouseDown = () => {
    if (!deshabilitado) {
      setEstaPresionado(true);
    }
  };

  const manejarMouseUp = () => {
    setEstaPresionado(false);
  };

  const manejarClick = (e) => {
    if (!deshabilitado && onClick) {
      onClick(e);
    }
  };

  return (
    <>
      {/* Estilos CSS para las animaciones hover */}
      <style>
        {`
          .boton-animado-${variante}-${tamaño} {
            position: relative;
            overflow: hidden;
          }

          .boton-animado-${variante}-${tamaño}::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }

          .boton-animado-${variante}-${tamaño}:hover::before {
            width: 200%;
            height: 200%;
          }

          .boton-animado-${variante}-${tamaño}:hover {
            background-color: ${estilos.hoverBg} !important;
            color: ${estilos.hoverColor} !important;
            border-color: ${estilos.hoverBorder} !important;
            box-shadow: ${estilos.hoverShadow} !important;
            transform: translateY(-2px) scale(1.02);
          }

          .boton-animado-${variante}-${tamaño}:active {
            background-color: ${estilos.activeBg} !important;
            border-color: ${estilos.hoverBorder} !important;
            box-shadow: ${estilos.activeShadow} !important;
            transform: translateY(0) scale(0.98);
          }

          .boton-animado-${variante}-${tamaño}:disabled:hover {
            transform: none;
            background-color: ${estilos.backgroundColor} !important;
            box-shadow: ${estilos.shadow} !important;
          }

          /* Animación de ripple al hacer clic */
          @keyframes ripple {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(4);
              opacity: 0;
            }
          }

          .boton-animado-${variante}-${tamaño} .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 20px;
            height: 20px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          }
        `}
      </style>

      <button
        className={`boton-animado-${variante}-${tamaño} ${className}`}
        style={estiloBoton}
        onClick={manejarClick}
        onMouseDown={manejarMouseDown}
        onMouseUp={manejarMouseUp}
        onMouseLeave={manejarMouseUp}
        disabled={deshabilitado}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </button>
    </>
  );
};
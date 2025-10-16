import React from 'react'

export const AnimacionCarga = ({ tamaño = 100, color = '#7B1FA2' }) => {
  // Genera 8 líneas en círculo (360° / 8 = 45° entre cada línea)
  const lineas = Array.from({ length: 8 }, (_, indice) => {
    const rotacion = indice * 45;
    const retrasoAnimacion = indice * 0.125;

    return (
      <div
        key={indice}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `rotate(${rotacion}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            width: tamaño * 0.05, // ancho proporcional
            height: tamaño * 0.35, // largo proporcional
            backgroundColor: color,
            borderRadius: tamaño * 0.05,
            transform: 'translateX(-50%)',
            animation: `fadeInOut 1s ease-in-out infinite`,
            animationDelay: `${retrasoAnimacion}s`,
            opacity: 0.2
          }}
        />
      </div>
    );
  });

  return (
    <>
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% {
              opacity: 0.2;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Contenedor que ocupa todo el espacio y centra el spinner */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Spinner */}
        <div
          style={{
            position: 'relative',
            width: tamaño,
            height: tamaño,
          }}
        >
          {lineas}
        </div>
      </div>
    </>
  );
};

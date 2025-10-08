export const AnimacionCarga = ({ tamaño = 60, color = '#7B1FA2' }) => {

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
        {/* Línea individual */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            width: 4,
            height: '35%',
            backgroundColor: color,
            borderRadius: 4,
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
      {/* Definición de la animación CSS */}
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
      
      {/* Contenedor del spinner */}
      <div
        style={{
          position: 'relative',
          width: tamaño,
          height: tamaño,
          display: 'inline-block'
        }}
      >
        {lineas}
      </div>
    </>
  );
};
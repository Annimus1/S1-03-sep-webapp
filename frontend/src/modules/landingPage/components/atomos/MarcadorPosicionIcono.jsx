/**
 * MarcadorPosicionIcono - Placeholder temporal para imágenes e íconos
 * Se usa mientras no se tienen las imágenes finales del diseño
 * @param {number} size - Tamaño del marcador en píxeles
 */

export const MarcadorPosicionIcono = ({ size = 60 }) => (
  <div style={{ 
    width: size, 
    height: size, 
    backgroundColor: '#1a3a3a', 
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  }}>
    {/* Ícono SVG de imagen genérica */}
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  </div>
);
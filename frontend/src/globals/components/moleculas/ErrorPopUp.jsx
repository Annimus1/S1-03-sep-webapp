// Estilo de superposición (backdrop) y contenedor del modal
const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo gris oscuro semitransparente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050, // Alto para asegurar que esté sobre todo
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px', // Bordes suaves como en tu diseño
    padding: '30px',
    width: '90%',
    maxWidth: '450px', // Tamaño fijo para pop-up
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // Sombra para efecto flotante
  }
};

export const ErrorPopup = ({ status, message, onClose }) => {
  
  // Clase de Bootstrap para el borde rojo de error
  const borderColor = '#dc3545'; // Color rojo estándar de Bootstrap 'danger'

  return (
    <div style={modalStyles.backdrop}>
      <div style={{...modalStyles.card, borderTop: `6px solid ${borderColor}`}}>
        
        {/* Encabezado: Status y Botón de Cierre */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h4 className="text-danger" style={{ fontWeight: 700, margin: 0 }}>
            {/* Ícono de advertencia para estética */}
            <span style={{ marginRight: '10px' }}>🚨</span> Error ({status})
          </h4>
          
          {/* Botón de Cierre (Clase nativa de Bootstrap para icono X) */}
          <button 
            type="button" 
            className="btn-close" 
            aria-label="Cerrar" 
            onClick={onClose}
          ></button>
        </div>

        {/* Separador visual */}
        <hr style={{ borderColor: '#f8d7da', margin: '15px 0' }} />

        {/* Mensaje de Error */}
        <p className="text-secondary" style={{ fontSize: '15px', lineHeight: 1.5 }}>
          {message || "Ha ocurrido un error inesperado al procesar la solicitud. Por favor, inténtalo de nuevo."}
        </p>

        {/* Footer: Botón de Acción Principal (Cerrar) */}
        <div className="d-grid mt-4">
          <button 
            className="btn btn-danger" 
            onClick={onClose}
            style={{ borderRadius: '8px', fontWeight: 600 }}
          >
            Aceptar y Cerrar
          </button>
        </div>
        
      </div>
    </div>
  );
};
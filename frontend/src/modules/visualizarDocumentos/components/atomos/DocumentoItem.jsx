import styles from "../../styles/DocumentosAdjuntados.module.css";
export const DocumentoItem = ({ 
  nombre, 
  estado = "completado", // "completado" | "pendiente" | "rechazado"
  pdfUrl, 
  pdfDescargarUrl,
  disponible = true,
  onVisualizarPDF,
  onDescargarPDF
}) => {
  
  const handleVisualizar = () => {
    if (disponible && pdfUrl && onVisualizarPDF) {
      onVisualizarPDF(pdfUrl, nombre);
    }
  };

  const handleDescargar = () => {
    if (disponible && pdfDescargarUrl && onDescargarPDF) {
      onDescargarPDF(pdfDescargarUrl, nombre);
    }
  };

  // Íconos según estado
  const getIconoEstado = () => {
    switch (estado) {
      case "completado":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "pendiente":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#F59E0B"/>
            <path d="M12 7v5M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "rechazado":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#EF4444"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.documentoItem}>
      {/* Ícono de estado */}
      <div className={styles.iconoEstado}>
        {getIconoEstado()}
      </div>

      {/* Nombre del documento */}
      <span className={`${styles.nombreDocumento} ${!disponible ? styles.noDisponible : ''}`}>
        {nombre}
      </span>

      {/* Botones de acción */}
      <div className={styles.acciones}>
        {/* Botón visualizar */}
        <button
          className={styles.botonIcono}
          onClick={handleVisualizar}
          disabled={!disponible || !pdfUrl}
          title="Visualizar PDF"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        {/* Botón descargar */}
        <button
          className={styles.botonIcono}
          onClick={handleDescargar}
          disabled={!disponible || !pdfDescargarUrl}
          title="Descargar PDF"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
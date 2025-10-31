import styles from "../../styles/DocumentosAdjuntados.module.css";


export const Paginacion = ({ paginaActual, totalPaginas, onCambioPagina }) => {
  return (
    <div className={styles.paginacion}>
      {/* Botón anterior */}
      <button
        className={styles.botonPaginacion}
        onClick={() => onCambioPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Números de página */}
      {[...Array(totalPaginas)].map((_, index) => {
        const numeroPagina = index + 1;
        return (
          <button
            key={numeroPagina}
            className={`${styles.numeroPagina} ${paginaActual === numeroPagina ? styles.activo : ''}`}
            onClick={() => onCambioPagina(numeroPagina)}
          >
            {numeroPagina}
          </button>
        );
      })}

      {/* Botón siguiente */}
      <button
        className={styles.botonPaginacion}
        onClick={() => onCambioPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};
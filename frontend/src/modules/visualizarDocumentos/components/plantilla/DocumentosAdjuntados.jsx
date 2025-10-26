import { SeccionDocumentos } from "../moleculas/SeccionDocumentos";
import { Paginacion } from "../orgnanismos/Paginacion";
import styles from "../../styles/DocumentosAdjuntados.module.css";
import React, {useState} from "react";
export const DocumentosAdjuntados = ({ 
  titulo,
  paginas,
  onVisualizarPDF,
  onDescargarPDF
}) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const paginaData = paginas[paginaActual - 1] || {};

  return (
    <div className={styles.containerPrincipal}>
      {/* Título principal */}
      <h2 className={styles.tituloPrincipal}>{titulo}</h2>

      {/* Contenido de la página actual */}
      <div className={styles.contenidoPagina}>
        {paginaData.secciones?.map((seccion, index) => (
          <SeccionDocumentos
            key={index}
            titulo={seccion.titulo}
            documentos={seccion.documentos.map(doc => ({
              ...doc,
              onVisualizarPDF,
              onDescargarPDF
            }))}
            columnas={seccion.columnas || 2}
          />
        ))}
      </div>

      {/* Paginación (solo si hay más de 1 página) */}
      {paginas.length > 1 && (
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={paginas.length}
          onCambioPagina={setPaginaActual}
        />
      )}
    </div>
  );
};
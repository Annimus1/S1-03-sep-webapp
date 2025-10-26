import { DocumentoItem } from "../atomos/DocumentoItem";
import styles from "../../styles/DocumentosAdjuntados.module.css";


export const SeccionDocumentos = ({ titulo, documentos, columnas = 1 }) => {
  return (
    <div className={styles.seccionDocumentos}>
      <h3 className={styles.tituloSeccion}>{titulo}</h3>
      <div 
        className={styles.gridDocumentos}
        style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}
      >
        {documentos.map((doc, index) => (
          <DocumentoItem key={index} {...doc} />
        ))}
      </div>
    </div>
  );
};
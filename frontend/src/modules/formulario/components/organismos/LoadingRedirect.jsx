import React, { useEffect } from "react";
import { AnimacionCarga } from "../../../../globals/components/atomos/AnimacionCarga";
import styles from "./LoadingRedirect.module.css";

export const LoadingRedirect = ({ onComplete }) => {
  useEffect(() => {
    // Simular redirección después de 3 segundos
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinnerWrapper}>
        <AnimacionCarga tamaño={80} color="#7C3AED" />
      </div>

      <h2 className={styles.title}>Redirigiendo a un entorno seguro...</h2>
      <p className={styles.subtitle}>
        Si la página no carga automáticamente, haz clic en el botón de abajo.
      </p>

      <button className={styles.manualButton} onClick={onComplete}>
        Ir a la de firma digital
      </button>
    </div>
  );
};
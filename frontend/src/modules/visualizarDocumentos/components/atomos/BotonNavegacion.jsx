import styles from "../../styles/StepperNavegacion.module.css";

export const BotonNavegacion = ({ direccion, onClick, disabled }) => {
  const isAnterior = direccion === "anterior";
  
  return (
    <button
      className={styles.botonNavegacion}
      onClick={onClick}
      disabled={disabled}
    >
      {isAnterior ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M14 8l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};
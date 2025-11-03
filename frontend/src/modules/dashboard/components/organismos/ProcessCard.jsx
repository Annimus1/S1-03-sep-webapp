import { ProcessStepItem } from "../moleculas/ProcessStepItem";
import styles from './processCard.module.css';

export const ProcessCard = ({ currentStep = 1 }) => (
  
  <div
    style={{
      backgroundColor: '#DAD6FE',
      borderRadius: '60px',
      padding: '24px 40px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <h5
      style={{
        color: '#2C3E50',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '24px'
      }}
    >
      Proceso de la solicitud
    </h5>

    <div className={styles.gridContainer}>
      {[
        "Iniciar solicitud",
        "Subir documentos solicitados",
        "Firma digital de contrato",
        "Enviar solicitud",
        "Revisión de solicitud y documentos",
        "Resolución del asesor",
        "Crédito rembolsado"
      ].map((text, index) => {
        const stepNumber = index + 1;
        return (
          <ProcessStepItem
            key={stepNumber}
            number={stepNumber.toString()}
            text={text}
            completed={stepNumber < currentStep}       // pasos anteriores completados
            active={stepNumber === currentStep}        // paso actual activo
          />
        );
      })}

      <div className={styles.infoBox}>
        <p>Aquí encontrarás el "paso a paso" para crear tu solicitud</p>
      </div>
    </div>
  </div>
);

import { ProcessStepItem } from "../moleculas/ProcessStepItem";
import styles from './ProcessCard.module.css';

export const ProcessCard = () => (
  <div
    style={{
      backgroundColor: '#DAD6FE',
      borderRadius: '20px',
      padding: '24px 30px',
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
      <ProcessStepItem number="1" text="Iniciar solicitud" completed={false} />
      <ProcessStepItem number="2" text="Subir documentos solicitados" completed={false} />
      <ProcessStepItem number="3" text="Firma digital de contrato" completed={false} />
      <ProcessStepItem number="4" text="Enviar solicitud" completed={false} />
      <ProcessStepItem number="5" text="Revisión de solicitud y documentos" completed={false} />
      <ProcessStepItem number="6" text="Resolución del asesor" completed={false} />
      <ProcessStepItem number="7" text="Crédito rembolsado" completed={false} />

      <div className={styles.infoBox}>
        <p>Aquí encontrarás el "paso a paso" para crear tu solicitud</p>
      </div>
    </div>
  </div>
);

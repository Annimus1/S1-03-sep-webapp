import styles from "../../styles/StepperNavegacion.module.css";
import { StepCircle } from "../atomos/StepCircle.jsx";

export const StepItem = ({ number, label, isActive, isCompleted }) => {
  return (
    <div className={styles.stepItem}>
      <StepCircle number={number} isActive={isActive} isCompleted={isCompleted} />
      <div className={`${styles.stepLabel} ${isActive ? styles.activeLabel : ""}`}>
        {label}
      </div>
    </div>
  );
};
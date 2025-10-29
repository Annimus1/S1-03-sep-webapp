import styles from "../../styles/StepperNavegacion.module.css";
import { MiniCircle } from "../atomos/StepCircle.jsx";

export const StepConnector = ({ completedCount }) => {
  return (
    <div className={styles.stepConnector}>
      <MiniCircle isActive={completedCount >= 1} />
      <MiniCircle isActive={completedCount >= 2} />
      <MiniCircle isActive={completedCount >= 3} />
    </div>
  );
};
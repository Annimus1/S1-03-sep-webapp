import styles from "../../styles/StepperNavegacion.module.css";

export const MiniCircle = ({ isActive }) => {
  return (
    <div className={`${styles.miniCircle} ${isActive ? styles.active : ''}`} />
  );
};
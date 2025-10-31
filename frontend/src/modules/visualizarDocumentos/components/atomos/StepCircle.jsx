import styles from "../../styles/StepperNavegacion.module.css";

export const StepCircle = ({ number, isActive, isCompleted }) => {
  const getClassName = () => {
    if (isCompleted) return `${styles.stepCircle} ${styles.completed}`;
    if (isActive) return `${styles.stepCircle} ${styles.active}`;
    return styles.stepCircle;
  };

  return <div className={getClassName()}>{number}</div>;
};

export const MiniCircle = ({ isActive }) => {
  return (
    <div className={`${styles.miniCircle} ${isActive ? styles.active : ''}`} />
  );
};
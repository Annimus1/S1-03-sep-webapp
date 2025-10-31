import styles from "./ToggleButton.module.css";

export const ToggleButton = ({ label, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.toggleButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
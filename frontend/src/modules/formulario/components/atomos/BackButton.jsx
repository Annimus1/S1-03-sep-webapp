import styles from "./BackButton.module.css";

export const BackButton = ({ onClick }) => {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

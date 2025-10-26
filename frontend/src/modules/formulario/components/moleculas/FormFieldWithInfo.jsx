import { InfoIcon } from "../atomos/InfoIcon";
import styles from "./FormFieldWithInfo.module.css";

export const FormFieldWithInfo = ({ label, required, info, children }) => {
  return (
    <div className={styles.formFieldWithInfo}>
      <div className={styles.fieldHeader}>
        <span className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.requiredAsterisk}>*</span>}
        </span>
        {info && (
          <div className={styles.infoIconWrapper} title={info}>
            <InfoIcon />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

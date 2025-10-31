import { ToggleButton } from "../atomos/ToggleButton";
import styles from "./ToggleButtonGroup.module.css";

export const ToggleButtonGroup = ({ options, selectedOption, onChange }) => {
  return (
    <div className={styles.toggleButtonGroup}>
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          label={option.label}
          isActive={selectedOption === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
};
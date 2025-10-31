import { ProgressBarStats } from "../atomos/ProgressBarStats";

export const StatusRow = ({ label, percentage, color }) => {
  const styles = {
    row: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1.25rem'
    },
    label: {
      fontSize: '1rem',
      color: '#1a1a1a',
      fontWeight: '400',
      minWidth: '120px',
      flexShrink: '0'
    }
  };

  return (
    <div style={styles.row}>
      <div style={styles.label}>{label}</div>
      <ProgressBarStats percentage={percentage} color={color} />
    </div>
  );
};
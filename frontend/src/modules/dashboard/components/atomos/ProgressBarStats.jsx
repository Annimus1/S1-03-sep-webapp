export const ProgressBarStats = ({ percentage, color }) => {
  const styles = {
    container: {
      width: '100%',
      height: '24px',
      backgroundColor: '#e8e8e8',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      flex: '1'
    },
    fill: {
      height: '100%',
      borderRadius: '12px',
      backgroundColor: color,
      width: `${percentage}%`,
      transition: 'width 0.6s ease'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.fill} />
    </div>
  );
};
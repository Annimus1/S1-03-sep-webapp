export const StatCard = ({ title, value, marginBottom = '0.75rem' }) => {
  const styles = {
    card: {
      height: '100%',
      padding: '0.5rem',
    },
    title: {
      fontSize: '0.95rem',
      color: '#666666',
      marginBottom: marginBottom,
      fontWeight: '400',
      lineHeight: '1.4'
    },
    value: {
      fontSize: '2.5rem',
      fontWeight: '500',
      color: '#1a1a1a',
      lineHeight: '1'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
};
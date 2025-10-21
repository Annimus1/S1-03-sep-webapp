export const TableHeader = ({ children }) => {
  const styles = {
    header: {
      fontWeight: '700',
      fontSize: '1.1rem',
      color: '#2c2c2c',
      paddingBottom: '0.5rem'
    }
  };

  return <div style={styles.header}>{children}</div>;
};
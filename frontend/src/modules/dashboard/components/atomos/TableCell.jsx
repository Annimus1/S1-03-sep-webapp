export const TableCell = ({ children, bold = false }) => {
  const styles = {
    cell: {
      fontSize: '1rem',
      color: '#2c2c2c',
      fontWeight: bold ? '600' : '400',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  };

  return <div style={styles.cell}>{children}</div>;
};
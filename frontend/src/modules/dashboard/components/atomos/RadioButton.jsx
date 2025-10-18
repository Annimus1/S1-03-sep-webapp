export const RadioButton = ({ checked, onChange }) => {
  const styles = {
    radio: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: checked ? '6px solid #1e5a47' : '2px solid #dee2e6',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      flexShrink: 0
    }
  };

  return (
    <div style={styles.radio} onClick={onChange}></div>
  );
};

export const InfoRow = ({ label, value }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    }}>
      <span style={{ color: '#666', fontSize: '14px' }}>{label}</span>
      <span style={{ color: '#333', fontSize: '14px', fontWeight: '600' }}>{value}</span>
    </div>
  );
};
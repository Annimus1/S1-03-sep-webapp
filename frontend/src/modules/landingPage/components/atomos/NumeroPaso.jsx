export const NumeroPaso = ({ numero }) => (
  <div style={{
    width: 28,
    height: 28,
    backgroundColor: '#1a3a3a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0
  }}>
    {numero}
  </div>
);
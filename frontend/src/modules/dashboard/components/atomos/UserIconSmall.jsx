export const UserIconSmall = () => (
  <div style={{
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #b8a4d8 0%, #9b87c7 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  }}>
    <div style={{
      width: '24px',
      height: '24px',
      border: '3px solid white',
      borderRadius: '50%',
      position: 'relative'
    }}>
      <div style={{
        content: '',
        position: 'absolute',
        bottom: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '32px',
        height: '16px',
        border: '3px solid white',
        borderRadius: '16px 16px 0 0',
        borderBottom: 'none'
      }}></div>
    </div>
  </div>
);

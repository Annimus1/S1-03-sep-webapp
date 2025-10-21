export const LabelDetalle = ({ text = 'Detalle', fontSize = '15px', color = '#000000', valor = '' }) => (
  <p style={{
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
  }}>
    <span style={{
      color,
      fontSize,
      fontWeight: '600',
      textAlign: 'left'
    }}>
      {text}
    </span>

    {valor && (
      <span style={{
        color: '#2C3E50',
        fontSize: '14px',
        fontWeight: '400',
        textAlign: 'right'
      }}>
        {valor}
      </span>
    )}
  </p>
);

export const EmptyStateMessage = ({ 
  text = 'Aquí podrás visualizar cualquier actualización de tu solicitud' 
}) => (
  <p style={{
    color: '#21255248',
    fontSize: '13px',
    margin: 0
  }}>
    {text}
  </p>
);
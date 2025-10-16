// Falta poner props para notififaciones  


export const NotificationCard = ({height = '100%'}) => {
  return (
    <div
      style={{
        backgroundColor: '#5BE2C5',
        borderRadius: '30px',
        padding: '20px 24px',
        height: height
      }}
    >
      <h6
        style={{
          color: '#000000ff',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '6px'
        }}
      >
        Notificaciones
      </h6>
      <p
        style={{
          color: '#21255248',
          fontSize: '13px',
          margin: 0
        }}
      >
        Aquí podrás visualizar cualquier actualización de tu solicitud
      </p>
    </div>
  );
};

import OjoNO from '../../../../assets/icons/OjoNO.svg';

export const CreditStatusCard = ({ height = '100%'}) => (
  <div
    style={{
      backgroundColor: '#562CA4',
      borderRadius: '40px',
      padding: '24px',
      color: 'white',
      height: height,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >

    <h5
      style={{
        fontSize: '20px',
        fontWeight: '600',
        margin: 0,
        textAlign: 'left',
      }}
    >
      Tu crédito actual
    </h5>


    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <img src={OjoNO} alt="Ojo NO" style={{ width: '25px', height: '25px' }} />
    </div>


    <p
      style={{
        fontSize: '16px',
        margin: '10px 0 0',
        lineHeight: '1.5',
        textAlign: 'center',
      }}
    >
      En esta sección se podrá visualizar tu crédito aprobado
    </p>
  </div>
);

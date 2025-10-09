import { AnimacionCarga } from "../../../../globals/components/atomos/AnimacionCarga";

export const LoadingScreen = ({ message = "Creando tu espacio Kredia", subMessage = "Esto tomará solo unos segundos. Estamos validando tu información y configurando tu acceso a KREDIA." }) => {
  return (
    <>
      <div style={{
        backgroundColor: '#a8e6d8',
        borderRadius: '24px',
        padding: '60px 40px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <AnimacionCarga />
        <h4 style={{ color: '#0d5047', fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          {message}
        </h4>
        <p style={{ color: '#4a5568', fontSize: '15px' }}>{subMessage}</p>
      </div>
    </>
  );
};
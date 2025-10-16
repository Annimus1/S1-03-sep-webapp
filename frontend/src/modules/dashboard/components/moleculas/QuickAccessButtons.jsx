import { DocumentIcon } from "../atomos/DocumentIcon";
import { SignatureIcon } from "../atomos/SignatureIcon";

export const QuickAccessButtons = ({height = '100%'}) => {
  return (
    <div
      style={{
        backgroundColor: '#562CA4',
        borderRadius: '20px',
        padding: '20px 24px',
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
      }}
    >
      {/* ==== BOTÓN DOCUMENTOS ==== */}
      <div style={{ textAlign: 'center', cursor: 'pointer', color: 'white' }}>
        <span
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            marginBottom: '10px',
          }}
        >
          Documentos
        </span>

        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#DAD6FE',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            transition: 'all 0.2s ease',
          }}
        >
          <DocumentIcon />
        </div>
      </div>

      {/* ==== BOTÓN FIRMA DIGITAL ==== */}
      <div style={{ textAlign: 'center', cursor: 'pointer', color: 'white' }}>
        <span
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            marginBottom: '10px',
          }}
        >
          Firma Digital
        </span>

        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#DAD6FE',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            transition: 'all 0.2s ease',
          }}
        >
          <SignatureIcon />
        </div>
      </div>
    </div>
  );
};

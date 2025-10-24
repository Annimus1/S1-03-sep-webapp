import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { BackButton } from "../atomos/BackButton";

export const RegistrationTemplate = ({ children, onBack, onContinue, showContinue = true, isSaving = false }) => {
  return (
    <div className="registration-template">
      <div className="template-header">
        <BackButton onClick={onBack} />
        <p className="header-text">
          Sube los documentos requeridos para verificar tu cuenta y proceder con la solicitud de tu crédito
        </p>
      </div>
      
      <div className="template-content-wrapper">
        <div className="template-content">
          <div className="content-inner">
            {children}
            
            <div className="content-footer">
              <div className="footer-note">
                <span className="required-asterisk">*</span> Obligatorio
                <br />
                <span className="format-note">! Formato PDF para todos los documentos</span>
              </div>
            </div>
          </div>
        </div>
        
        {showContinue && (
          <div className="floating-button-container">
            <BotonAnimado variante="naranja" onClick={onContinue}>
              Continuar
            </BotonAnimado>
          </div>
        )}
        
        {isSaving && (
          <div className="saving-indicator">
              Guardando tu proceso...
          </div>
        )}
      </div>
      
      <style jsx>{`
        .registration-template {
          background: #5BE2C580;
          padding: 20px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%;
        }

        .template-header {
          display: flex;
          align-items: flex-start;
          gap: 40px;
          margin-bottom: 32px;
        }

        .header-text {
          font-size: 13px;
          font-weight: 800;
          text-align: center;
          color: #1a3a3a;
          margin: 0;
          padding-top: 4px;
          max-width: 600px;
        }

        .template-content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .template-content {
          backdrop-filter: blur(10px);
          border-radius: 24px;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
          transition: height 0.3s ease, min-height 0.3s ease;
          min-height: 500px;
          min-width: 1000px;
        }

        .content-inner {
          padding: 0px 80px;
          padding-bottom: 30px;
          display: flex;
          flex-direction: column;
        }

        .template-content::-webkit-scrollbar {
          width: 8px;
        }

        .template-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .template-content::-webkit-scrollbar-thumb {
          background: rgba(30, 90, 90, 0.3);
          border-radius: 4px;
        }

        .template-content::-webkit-scrollbar-thumb:hover {
          background: rgba(30, 90, 90, 0.5);
        }

        .content-footer {
          position: absolute;
          bottom: 20px;
          left: 60px;
          width: 100%;
          margin: 0; /* elimina el margin-top */
          padding: 1rem; /* opcional, para darle espacio interno */
        }

        .footer-note {
          font-size: 13px;
          color: #1a3a3a;
          line-height: 1.6;
        }

        .format-note {
          color: #0f2626;
          font-weight: 500;
        }

        .floating-button-container {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
        }

        .saving-indicator {
          position: absolute;
          bottom: -20px;
          right: -120px;
          z-index: 100;
          border-radius: 9999px; /* Totalmente redondeado */
          background: #115281cc;
          border: 3px solid #044574;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Sombra para profundidad */
          opacity: 1; /* No se ve transparente cuando está disabled */
          color: white;
          padding: 8px 16px;
        }
        .required-asterisk {
          color: #f59e0b;
          font-size: 16px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .registration-template {
            padding: 16px;
          }

          .content-inner {
            padding: 24px;
            padding-bottom: 40px;
          }

          .template-content {
            max-height: calc(100vh - 100px);
          }
          
          .floating-button-container {
            bottom: -18px;
          }
          
          .saving-indicator {
            bottom: -18px;
            right: 0;
          }
        }
      `}</style>
    </div>
  );
};
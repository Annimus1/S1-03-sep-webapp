import { useState } from "react";
import { FormCard } from "../organismos/FormCard.jsx";
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';

export const Step4TermsAndConditions = ({ onAccept, onBack }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <FormCard title="Aceptación de Términos y Condiciones" showBackButton onBack={onBack}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        maxHeight: '320px',
        overflowY: 'auto',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#4a5568'
      }}>
        <p style={{ marginBottom: '16px' }}>
          Al crear una cuenta en KREDIA, usted declara haber leído, comprendido y aceptado los siguientes 
          Términos y Condiciones, los cuales regulan el acceso y uso de nuestra plataforma digital destinada 
          a la solicitud, gestión y seguimiento de créditos para pequeñas y medianas empresas (PyMEs).
        </p>
        
        <h6 style={{ 
          color: '#1a1a1a', 
          fontWeight: '600', 
          marginTop: '16px', 
          marginBottom: '8px', 
          fontSize: '15px' 
        }}>
          1. Objeto del servicio
        </h6>
        <p style={{ marginBottom: '16px' }}>
          KREDIA es una plataforma tecnológica que facilita la gestión digital de solicitudes de crédito 
          empresariales. A través de su cuenta, el usuario podrá registrar información de su empresa, cargar 
          documentos requeridos, firmar digitalmente contratos y realizar seguimiento del estado de su solicitud.
        </p>
        
        <h6 style={{ 
          color: '#1a1a1a', 
          fontWeight: '600', 
          marginTop: '16px', 
          marginBottom: '8px', 
          fontSize: '15px' 
        }}>
          2. Registro y veracidad de la información
        </h6>
        <p>
          Al registrarse, el usuario se compromete a proporcionar información veraz, completa y actualizada 
          sobre su empresa y representante legal. KREDIA no garantiza la aprobación del crédito, ya que dicha 
          decisión depende de la evaluación financiera realizada por los operadores y entidades asociadas.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            style={{ marginRight: '12px', marginTop: '3px', width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span>
            He <strong>leído y acepto</strong> los Términos y Condiciones y la Política de Privacidad.
          </span>
        </label>
      </div>

      <div style={{ textAlign: 'center' }}>
        <BotonAnimado onClick={onAccept} disabled={!accepted}>
          Crear Cuenta
        </BotonAnimado>
      </div>
    </FormCard>
  );
};
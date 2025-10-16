import { InputField } from "../atomos/InputField";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { FormCard } from "../organismos/FormCard";
import styled from "./Step.module.css"

export const Step3LegalRepresentative = ({ formData, onChange, onNext, onBack }) => {
  return (
    <FormCard title="Datos del Representante Legal" showBackButton onBack={onBack}>
      <div className={styled.gridContainerTwo }>
        <InputField
          label="Nombres"
          placeholder="Nombre completo"
          value={formData.repNombres}
          onChange={(e) => onChange('repNombres', e.target.value)}
        />
        <InputField
          label="Apellidos"
          placeholder="Apellidos"
          value={formData.repApellidos}
          onChange={(e) => onChange('repApellidos', e.target.value)}
        />
      </div>

      <div className={styled.gridContainerTwo }>
        <InputField
          label="Número de Identificación personal"
          placeholder="CUIT/RUC/RF/NIT/RUT/DNI"
          value={formData.repDni}
          onChange={(e) => onChange('repDni', e.target.value)}
        />
        <InputField
          label="Cargo dentro de la empresa"
          placeholder="Ej: Gerente General"
          value={formData.repCargo}
          onChange={(e) => onChange('repCargo', e.target.value)}
        />
      </div>

      <InputField
        label="Domicilio personal"
        placeholder="Dirección completa"
        value={formData.repDomicilio}
        onChange={(e) => onChange('repDomicilio', e.target.value)}
      />

      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#1a1a1a', 
          marginBottom: '12px' 
        }}>
          Declaración PEP (persona pública expuesta)
        </label>
        <div style={{ display: 'flex', gap: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px' }}>
            <input
              type="radio"
              name="pep"
              checked={formData.pep === true}
              onChange={() => onChange('pep', true)}
              style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            Sí
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px' }}>
            <input
              type="radio"
              name="pep"
              checked={formData.pep === false}
              onChange={() => onChange('pep', false)}
              style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            No
          </label>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <BotonAnimado onClick={onNext}>Continuar</BotonAnimado>
      </div>
    </FormCard>
  );
};
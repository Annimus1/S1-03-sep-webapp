import { InputField } from "../atomos/InputField";
import { FormCard } from "../organismos/FormCard";
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';
import styled from "./Step.module.css"

export const Step2CompanyData = ({ formData, onChange, onNext, onBack }) => {
  return (
    <FormCard title="Datos de la Empresa" showBackButton onBack={onBack}>
      <div className={styled.gridContainerTwo }>
        <InputField
          label="Razón Social/Nombre comercial"
          placeholder="Empresa S.A."
          value={formData.razonSocial}
          onChange={(e) => onChange('razonSocial', e.target.value)}
        />
        <InputField
          label="Número de identificación"
          placeholder="CUIT/RUC/RF/NIT/RUT/DNI"
          value={formData.nif}
          onChange={(e) => onChange('nif', e.target.value)}
        />
      </div>

      <div className={styled.gridContainerTwo }>
        <InputField
          label="Tipo societario:"
          placeholder="SRL, SA, SAS, EIRL, SPA, etc."
          value={formData.tipoSocietario}
          onChange={(e) => onChange('tipoSocietario', e.target.value)}
        />
        <InputField
          label="Número de registro en Cámara de Comercio"
          placeholder="IGJ / SUNARP / Registro Mercantil"
          value={formData.registroCamara}
          onChange={(e) => onChange('registroCamara', e.target.value)}
        />
      </div>

      <InputField
        label="Domicilio fiscal"
        placeholder="Calle, número, ciudad, país"
        value={formData.domicilioFiscal}
        onChange={(e) => onChange('domicilioFiscal', e.target.value)}
      />

      <InputField
        label="Domicilio comercial"
        placeholder="Calle, número, ciudad, país"
        value={formData.domicilioComercial}
        onChange={(e) => onChange('domicilioComercial', e.target.value)}
      />

      <div className={styled.gridContainerTwo }>
        <InputField
          label="Actividad económica principal"
          placeholder="(CNAE / Código de actividad)"
          value={formData.actividadEconomica}
          onChange={(e) => onChange('actividadEconomica', e.target.value)}
        />
        <InputField
          label="Fecha de constitución"
          type="date"
          value={formData.fechaConstitucion}
          onChange={(e) => onChange('fechaConstitucion', e.target.value)}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <BotonAnimado onClick={onNext}>Continuar</BotonAnimado>
      </div>
    </FormCard>
  );
};
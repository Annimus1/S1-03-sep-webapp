import { InputField } from "../atomos/InputField";
import { FormCard } from "../organismos/FormCard";
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import styled from "./Step.module.css";

export const Step2CompanyData = ({ formData, onChange, onNext, onBack }) => {
  return (
    <FormCard title="Datos de la Empresa" showBackButton onBack={onBack}>
      <div className={styled.gridContainerTwo}>
        <InputField
          label="Nombre comercial"
          placeholder="Ej: Tech Solutions S.A."
          value={formData.nombreComercial}
          onChange={(e) => onChange("nombreComercial", e.target.value)}
        />
        <InputField
          label="CUIT de la empresa"
          placeholder="Ej: 20-12345678-9"
          value={formData.cuitEmpresa}
          onChange={(e) => onChange("cuitEmpresa", e.target.value)}
        />
      </div>

      <div className={styled.gridContainerTwo}>
        <InputField
          label="Tipo societario"
          placeholder="Unipersonal / S.A / S.A.S / S.A.U / S.R.L / S.C"
          value={formData.tipoSocietario}
          onChange={(e) => onChange("tipoSocietario", e.target.value)}
        />
        <InputField
          label="Número de registro en organismo societario"
          placeholder="IGJ / R.P.C / D.P.P.J"
          value={formData.numeroRegistro}
          onChange={(e) => onChange("numeroRegistro", e.target.value)}
        />
      </div>

      <InputField
        label="Domicilio Fiscal"
        placeholder="Calle, número, ciudad, país"
        value={formData.domicilioFiscal}
        onChange={(e) => onChange("domicilioFiscal", e.target.value)}
      />

      <InputField
        label="Domicilio Comercial"
        placeholder="Calle, número, ciudad, país"
        value={formData.domicilioComercial}
        onChange={(e) => onChange("domicilioComercial", e.target.value)}
      />

      <div className={styled.gridContainerTwo}>
        <InputField
          label="Actividad económica principal"
          placeholder="CNAE / Código de actividad"
          value={formData.actividadEconomica}
          onChange={(e) => onChange("actividadEconomica", e.target.value)}
        />
        <InputField
          label="Fecha de constitución"
          type="date"
          value={formData.fechaConstitucion}
          onChange={(e) => onChange("fechaConstitucion", e.target.value)}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <BotonAnimado onClick={onNext}>Continuar</BotonAnimado>
      </div>
    </FormCard>
  );
};
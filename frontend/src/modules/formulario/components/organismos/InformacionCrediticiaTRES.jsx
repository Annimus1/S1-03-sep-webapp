import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const InformacionCrediticiaTRES = ({ formData, setFormData, errors, setErrors }) => {
  const handleFileChange = (fieldName, file, error) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    if (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return (
    <FormSection
      title="Información Crediticia, Garantías y Cumplimiento Regulatorio"
      subtitle="Documentación Regulatoria"
    >
      <FormFieldWithInfo
        label="Declaración jurada de origen lícito de fondos"
        required
      >
        <FileUploadInput
          name="ddjjOrigenLicito"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.ddjjOrigenLicito}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Consentimiento de análisis de información financiera"
        required
      >
        <FileUploadInput
          name="consentimientoAnalisis"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.consentimientoAnalisis}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Declaración de beneficiarios finales actualizada"
        required
      >
        <FileUploadInput
          name="ddjjBeneficiarioFinal"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.ddjjBeneficiarioFinal}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Constancia de políticas internas de cumplimiento"
        required
      >
        <FileUploadInput
          name="constanciaPoliticasInternas"
          placeholder="Solo para sociedades grandes"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.constanciaPoliticasInternas}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};
import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const DocumentosRepresentanteLegal = ({ formData, setFormData, errors, setErrors }) => {
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
    <FormSection title="Documentos del Representante Legal">
      <FileUploadInput
        label="DNI/Cédula de identidad/ Pasaporte"
        name="dniRepresentante"
        placeholder="Que coincida con el ID yaa registrado"
        required={true}
        maxSize={5}
        onChange={handleFileChange}
        error={errors.dniRepresentante}
      />
      
      <FileUploadInput
        label="Comprobante de domicilio personal"
        name="domicilioRepresentante"
        placeholder="Servicio o impuesto a su nombre"
        required={true}
        maxSize={5}
        onChange={handleFileChange}
        error={errors.domicilioRepresentante}
      />
      
      <FormFieldWithInfo
        label="Declaración jurada de beneficiario final"
        required={true}
        info="Documento que identifica a las personas que poseen o controlan la empresa"
      >
        <FileUploadInput
          name="declaracionBeneficiario"
          placeholder=""
          required={false}
          maxSize={5}
          onChange={handleFileChange}
          error={errors.declaracionBeneficiario}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};
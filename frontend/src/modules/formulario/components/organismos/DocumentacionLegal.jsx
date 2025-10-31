import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const DocumentacionLegal = ({ formData, setFormData, errors, setErrors }) => {
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
    <FormSection title="Documentación Legal">
      <FileUploadInput
        label="Contrato o Estatuto Social completo y actualizado"
        name="contratoEstatuto"
        placeholder="Emitido por IGJ o autoridad provincial"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.contratoEstatuto}
      />
      
      <FileUploadInput
        label="Acta de designación de autoridades vigentes"
        name="actaDesignacion"
        placeholder="Gerente, presidente, socio administrador"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.actaDesignacion}
      />
      
      <FileUploadInput
        label="Poder del representante legal"
        name="poderRepresentante"
        placeholder="Si no figura en el estatuto"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.poderRepresentante}
      />
      
      <FileUploadInput
        label="Constancia de inscripción fiscal"
        name="constanciaFiscal"
        placeholder="ARCA"
        required={true}
        maxSize={5}
        onChange={handleFileChange}
        error={errors.constanciaFiscal}
      />
      
      <FileUploadInput
        label="Comprobante de domicilio fiscal"
        name="comprobanteDomicilio"
        placeholder="Factura o constancia ARCA"
        required={true}
        maxSize={5}
        onChange={handleFileChange}
        error={errors.comprobanteDomicilio}
      />
      
      <FormFieldWithInfo
        label="Certificado MiPyME o equivalente"
        required={false}
        info="Certificado que acredita la condición de Micro, Pequeña o Mediana Empresa"
      >
        <FileUploadInput
          name="certificadoMipyme"
          placeholder="ARCA/SEPyME"
          required={false}
          maxSize={5}
          onChange={handleFileChange}
          error={errors.certificadoMipyme}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};
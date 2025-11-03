import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const InformacionCrediticiaUNO = ({ formData, setFormData, errors, setErrors }) => {
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
      subtitle="Información Crediticia y Bancaria"
    >
      <FormFieldWithInfo
        label="Constancia de CBU o cuenta receptora"
        required
      >
        <FileUploadInput
          name="constanciaCBU"
          placeholder="Formato PDF (por ambos lados)"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.constanciaCBU}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Informe crediticio"
        required
      >
        <FileUploadInput
          name="informeCrediticio"
          placeholder="Formato PDF"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.informeCrediticio}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Certificado de libre deuda bancaria"
        required
      >
        <FileUploadInput
          name="certificadoLibreDeuda"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.certificadoLibreDeuda}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Detalle de créditos y líneas vigentes"
        required
      >
        <FileUploadInput
          name="detalleCreditos"
          placeholder="Si no posee deudas"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.detalleCreditos}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Historial de cumplimiento de préstamos anteriores"
        required
      >
        <FileUploadInput
          name="historialPrestamos"
          placeholder="Si no tuvo préstamos"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.historialPrestamos}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Referencias bancarias"
        required
      >
        <FileUploadInput
          name="referenciasBancarias"
          placeholder="Mínimo 2 cuentas"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.referenciasBancarias}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Referencias comerciales"
        required
      >
        <FileUploadInput
          name="referenciasComerciales"
          placeholder="Proveedores o clientes"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.referenciasComerciales}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Declaración de no estar en concurso o quiebra"
        required
      >
        <FileUploadInput
          name="ddjjQuiebra"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.ddjjQuiebra}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};
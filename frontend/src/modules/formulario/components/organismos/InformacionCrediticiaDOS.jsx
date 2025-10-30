import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const InformacionCrediticiaDOS = ({ formData, setFormData, errors, setErrors }) => {
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
      subtitle="Garantías (Reales o Personales)"
    >
      <FormFieldWithInfo
        label="Título de propiedad del bien ofrecido"
        required
      >
        <FileUploadInput
          name="tituloPropiedad"
          placeholder="Formato PDF (por ambos lados)"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.tituloPropiedad}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Informe registral actualizado"
        required
      >
        <FileUploadInput
          name="informeRegistral"
          placeholder="Formato PDF"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.informeRegistral}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Tasación o valuación oficial del bien"
        required
      >
        <FileUploadInput
          name="tasacionBien"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.tasacionBien}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Seguro del bien"
        required
      >
        <FileUploadInput
          name="seguroBien"
          placeholder="Formato PDF"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.seguroBien}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Aval solidario o fianza de socios"
        required
      >
        <FileUploadInput
          name="avalSolidario"
          placeholder="Formato PDF"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.avalSolidario}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Declaración patrimonial del garante"
        required
      >
        <FileUploadInput
          name="declaracionPatrimonial"
          placeholder="Si hay garante"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.declaracionPatrimonial}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Comprobantes de ingresos del garante"
        required
      >
        <FileUploadInput
          name="comprobantesGarante"
          placeholder="Si hay avalista"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.comprobantesGarante}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Pagaré o documento de deuda firmado"
        required
      >
        <FileUploadInput
          name="pagareDeuda"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.pagareDeuda}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Cesión de derechos de cobro o SGR"
        required
      >
        <FileUploadInput
          name="cesionDerechos"
          placeholder=""
          maxSize={10}
          onChange={handleFileChange}
          error={errors.cesionDerechos}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};
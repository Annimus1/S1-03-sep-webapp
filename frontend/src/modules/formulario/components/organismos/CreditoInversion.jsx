import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const CreditoInversion = ({ formData, setFormData, errors, setErrors }) => {
  const handleFileChange = (fieldName, file, error) => {
    setFormData(prev => ({ ...prev, [fieldName]: file }));

    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
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
      title="Tipo de Crédito y Documentación Específica"
      subtitle="Proporciona información adicional que respalde la viabilidad económica del crédito."
    >
      <FileUploadInput
        label="Factura proforma o comprobante de compra"
        name="facturaProforma"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.facturaProforma}
      />

      <FileUploadInput
        label="Detalle de uso de los fondos solicitados"
        name="detalleFondos"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.detalleFondos}
      />

      <FileUploadInput
        label="Proyección de flujo operativo"
        name="proyeccionFlujoOperativo"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.proyeccionFlujoOperativo}
      />

      <FileUploadInput
        label="Gastos operativos (detalle mensual)"
        name="gastosOperativos"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.gastosOperativos}
      />

      <FileUploadInput
        label="Evidencia de expansión o pruebas de mercado"
        name="evidenciaExpancion"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.evidenciaExpancion}
      />
    </FormSection>
  );
};

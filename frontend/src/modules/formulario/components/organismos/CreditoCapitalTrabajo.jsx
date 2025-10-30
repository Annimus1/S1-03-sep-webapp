import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const CreditoCapitalTrabajo = ({ formData, setFormData, errors, setErrors }) => {
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
      subtitle="Adjunta los documentos que respalden la ejecución técnica y legal de tu proyecto."
    >
      <FileUploadInput
        label="Descripción del mercado y competencia"
        name="descripcionMercado"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.descripcionMercado}
      />

      <FileUploadInput
        label="Presupuesto de inversión detallado"
        name="presupuestoInversion"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.presupuestoInversion}
      />

      <FileUploadInput
        label="Cotizaciones de proveedores"
        name="cotizacionProveedores"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.cotizacionProveedores}
      />

      <FileUploadInput
        label="Estudio de factibilidad del proyecto"
        name="estudioFactibilidad"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.estudioFactibilidad}
      />

      <FileUploadInput
        label="Plan de mantenimiento de activos"
        name="planMantenimiento"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.planMantenimiento}
      />

      <FileUploadInput
        label="Informe técnico o evaluación de ingeniería"
        name="informeTecnico"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.informeTecnico}
      />

      <FileUploadInput
        label="Plan de implementación del proyecto"
        name="planImplementacion"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.planImplementacion}
      />

      <FileUploadInput
        label="Permisos y licencias de obra"
        name="permisosObra"
        placeholder="Subir archivo PDF"
        required={false}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.permisosObra}
      />
    </FormSection>
  );
};

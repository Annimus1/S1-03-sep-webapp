import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const InformacionFinancieraDOS = ({ formData, setFormData, errors, setErrors }) => {
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
    <FormSection title="Información Financiera y Contable" subtitle="Ayúdanos a conocer mejor la situación actual de tu empresa.">
      <FormFieldWithInfo
        label="Detalle de activos fijos"
        info="Maquinarias, inmuebles, vehículos, etc."
      >
        <FileUploadInput
          name="detalleActivosFijos"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.detalleActivosFijos}
        />
      </FormFieldWithInfo>

      <FileUploadInput
        label="Registro de ventas y compras"
        name="registroVentasCompras"
        placeholder="Últimos 12 meses (Libro IVA Digital)"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.registroVentasCompras}
      />

      <FileUploadInput
        label="Proyección de flujo de fondos"
        name="proyeccionFlujoFondos"
        placeholder="Cash flow proyectado 12–24 meses"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.proyeccionFlujoFondos}
      />

      <FileUploadInput
        label="Plan financiero del crédito"
        name="planFinancieroCredito"
        placeholder="Uso y retorno estimado"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.planFinancieroCredito}
      />

      <FormFieldWithInfo
        label="Ratios financieros"
        info="Liquidez, endeudamiento, rentabilidad"
      >
        <FileUploadInput
          name="ratiosFinancieros"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.ratiosFinancieros}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Certificación contable"
        info="De no poseer pasivos ocultos"
      >
        <FileUploadInput
          name="certificacionContable"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.certificacionContable}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};

import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";
import { ToggleButtonGroup } from "../moleculas/ToggleButtonGroup";

export const TipoCredito = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors,
  tipoCredito,
  setTipoCredito 
}) => {
  const creditOptions = [
    { value: "inversion", label: "Crédito de Inversión/Expansión" },
    { value: "capital", label: "Crédito Capital de Trabajo" },
  ];

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
      title="Tipo de Crédito y Documentación Específica"
      subtitle=""
    >
      <div style={{ gridColumn: "1 / -1" }}>
        <ToggleButtonGroup
          options={creditOptions}
          selectedOption={tipoCredito}
          onChange={setTipoCredito}
        />
      </div>

      {tipoCredito === "inversion" ? (
        <>
          <FormFieldWithInfo
            label="Presupuesto detallado de inversión"
            info="Maquinaria, tecnología, obras, etc."
            required
          >
            <FileUploadInput
              name="presupuestoInversion"
              placeholder="Maquinaria, tecnología, obras, etc."
              maxSize={10}
              onChange={handleFileChange}
              error={errors.presupuestoInversion}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Tres cotizaciones de proveedores"
            required
          >
            <FileUploadInput
              name="cotizacionesProveedores"
              placeholder="Si supera monto mínimo $5M"
              maxSize={10}
              onChange={handleFileChange}
              error={errors.cotizacionesProveedores}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Plan de implementación o cronograma de ejecución"
            required
          >
            <FileUploadInput
              name="planImplementacion"
              placeholder="Si involucra obras o expansión"
              maxSize={10}
              onChange={handleFileChange}
              error={errors.planImplementacion}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Estudio de factibilidad o ROI"
            required
          >
            <FileUploadInput
              name="estudioFactibilidad"
              placeholder=""
              maxSize={10}
              onChange={handleFileChange}
              error={errors.estudioFactibilidad}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Licencias o permisos de obra"
            required
          >
            <FileUploadInput
              name="licenciasObra"
              placeholder="Si hay construcción"
              maxSize={10}
              onChange={handleFileChange}
              error={errors.licenciasObra}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Plan de mantenimiento del activo"
            required
          >
            <FileUploadInput
              name="planMantenimiento"
              placeholder="Si hay equipamiento"
              maxSize={10}
              onChange={handleFileChange}
              error={errors.planMantenimiento}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Factura proforma o contrato de compra"
            required
          >
            <FileUploadInput
              name="facturaProforma"
              placeholder="Si hay adquisición"
              maxSize={10}
              onChange={handleFileChange}
              error={errors.facturaProforma}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Informe técnico del contador o ingeniero"
            required
          >
            <FileUploadInput
              name="informeTecnico"
              placeholder=""
              maxSize={10}
              onChange={handleFileChange}
              error={errors.informeTecnico}
            />
          </FormFieldWithInfo>
        </>
      ) : (
        <>
          <FormFieldWithInfo
            label="Detalle del uso de fondos"
            required
          >
            <FileUploadInput
              name="detalleUsoFondos"
              placeholder=""
              maxSize={10}
              onChange={handleFileChange}
              error={errors.detalleUsoFondos}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Proyección de flujo operativo con y sin crédito"
            required
          >
            <FileUploadInput
              name="proyeccionFlujo"
              placeholder=""
              maxSize={10}
              onChange={handleFileChange}
              error={errors.proyeccionFlujo}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Listado de gastos operativos fijos y variables"
            required
          >
            <FileUploadInput
              name="listadoGastos"
              placeholder=""
              maxSize={10}
              onChange={handleFileChange}
              error={errors.listadoGastos}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Facturas proforma o pedidos de compra"
            required
          >
            <FileUploadInput
              name="facturasProforma"
              placeholder="Si no hay compras previstas"
              maxSize={10}
              onChange={handleFileChange}
              error={errors.facturasProforma}
            />
          </FormFieldWithInfo>

          <FormFieldWithInfo
            label="Evidencia de aumento de demanda o expansión"
            required
          >
            <FileUploadInput
              name="evidenciaAumento"
              placeholder=""
              maxSize={10}
              onChange={handleFileChange}
              error={errors.evidenciaAumento}
            />
          </FormFieldWithInfo>
        </>
      )}
    </FormSection>
  );
};
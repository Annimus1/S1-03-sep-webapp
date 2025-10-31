import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const InformacionFinancieraUNO = ({ formData, setFormData, errors, setErrors }) => {
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
        label="Estados contables auditados"
        info="Últimos 2 o 3 ejercicios"
      >
        <FileUploadInput
          name="estadosAuditados"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.estadosAuditados}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Estados contables intermedios"
        info="Último semestre"
      >
        <FileUploadInput
          name="estadosIntermedios"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.estadosIntermedios}
        />
      </FormFieldWithInfo>

      <FileUploadInput
        label="Declaraciones juradas impositivas"
        name="declaracionesImpositivas"
        placeholder="IVA, Ganancias, Ingresos Brutos"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.declaracionesImpositivas}
      />

      <FileUploadInput
        label="Comprobantes de pago de impuestos recientes"
        name="comprobantesImpuestos"
        placeholder="Últimos 3 meses"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.comprobantesImpuestos}
      />

      <FormFieldWithInfo
        label="Resumen de cuentas bancarias"
        info="Últimos 6–12 meses"
      >
        <FileUploadInput
          name="resumenCuentas"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.resumenCuentas}
        />
      </FormFieldWithInfo>

      <FileUploadInput
        label="Detalle de ingresos y egresos mensuales"
        name="detalleIngresosEgresos"
        placeholder="Subir archivo PDF"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.detalleIngresosEgresos}
      />

      <FileUploadInput
        label="Detalle de cuentas por cobrar y pagar"
        name="cuentasPorCobrarPagar"
        placeholder="Subir archivo PDF"
        required={true}
        maxSize={10}
        onChange={handleFileChange}
        error={errors.cuentasPorCobrarPagar}
      />

      <FormFieldWithInfo
        label="Listado de inventarios actuales y valuaciones"
        info="En caso de corresponder"
      >
        <FileUploadInput
          name="inventariosValuaciones"
          placeholder="Subir archivo PDF"
          required={false}
          maxSize={10}
          onChange={handleFileChange}
          error={errors.inventariosValuaciones}
        />
      </FormFieldWithInfo>
    </FormSection>
  );
};

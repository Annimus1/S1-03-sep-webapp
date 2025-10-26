import { FormSection } from "../moleculas/FormSection";
import { FileUploadInput } from "../atomos/FileUploadInput";
import { TextInput } from "../atomos/TextInput";
import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

export const InformacionOperativaNegocioUNO = ({ formData, setFormData, errors, setErrors }) => {

  const handleTextChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({
      ...prev,
      [name]: value ? null : "Este campo es requerido"
    }));
  };


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
      title="Información Operativa y de Negocio"
      subtitle="Cuéntanos cómo opera tu empresa día a día. Esta información nos ayuda a entender mejor tu modelo de negocio."
    >

      <FormFieldWithInfo
        label="Descripción general del negocio"
        info="Escribe la actividad, tamaño y modelo de ingresos"
        required
      >
        <TextInput
          name="descripcionNegocio"
          placeholder="Escribe la actividad, tamaño y modelo de ingresos"
          required={true} 
          value={formData.descripcionNegocio || ""}
          onChange={handleTextChange}
          error={errors.descripcionNegocio}
        />
      </FormFieldWithInfo>


      <FormFieldWithInfo
        label="Organigrama o estructura de personal clave"
        info="Sube el organigrama o detalla roles clave"
        required={false}
      >
        <FileUploadInput
          name="organigrama"
          placeholder="Subir archivo PDF"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.organigrama}
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Principales clientes"
        required={true}
      >
        <FileUploadInput
          name="principalesClientes"
          placeholder="Nombre, tipo, % de ventas"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.principalesClientes}
          showUploadIcon
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Principales proveedores"
        required={true}
      >
        <FileUploadInput
          name="principalesProveedores"
          placeholder="Nombre, condiciones de pago"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.principalesProveedores}
          showUploadIcon
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Contratos comerciales vigentes"
        info="Contratos de alquiler, concesión, franquicia, etc."
      >
        <FileUploadInput
          name="contratosComerciales"
          placeholder="Subir archivo PDF"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.contratosComerciales}
          showUploadIcon
        />
      </FormFieldWithInfo>

      <FormFieldWithInfo
        label="Comprobantes de facturación reciente"
        required={true}
      >
        <FileUploadInput
          name="facturacionReciente"
          placeholder="Últimos 3 meses"
          maxSize={10}
          onChange={handleFileChange}
          error={errors.facturacionReciente}
          showUploadIcon
        />
      </FormFieldWithInfo>

    </FormSection>
  );
};

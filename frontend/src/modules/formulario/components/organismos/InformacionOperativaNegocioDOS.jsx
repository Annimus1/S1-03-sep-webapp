  import { FormSection } from "../moleculas/FormSection";
  import { FileUploadInput } from "../atomos/FileUploadInput";
  import { FormFieldWithInfo } from "../moleculas/FormFieldWithInfo";

  export const InformacionOperativaNegocioDOS = ({ formData, setFormData, errors, setErrors }) => {

    const handleFileChange = (field, file, error) => {
      setFormData(prev => ({
        ...prev,
        [field]: file,
      }));

      if (error) {
        setErrors(prev => ({
          ...prev,
          [field]: error,
        }));
      } else {
        setErrors(prev => {
          const newErr = { ...prev };
          delete newErr[field];
          return newErr;
        });
      }
    };

    return (
      <FormSection
        title="Información Operativa y de Negocio"
        subtitle="Cuéntanos cómo opera tu empresa día a día. Esta información nos ayuda a entender mejor tu modelo de negocio."
      >
        <FormFieldWithInfo 
          label="Certificados o permisos habilitantes" 
          required 
          info="Municipales, sanitarios, ambientales, etc."
        >
          <FileUploadInput
            name="certificadosPermisos"
            maxSize={10}
            onChange={handleFileChange}
            error={errors.certificadosPermisos}
          />
        </FormFieldWithInfo>

        <FormFieldWithInfo 
          label="Comprobante de propiedad o contrato de alquiler del local"
          info="Formato PDF"
        >
          <FileUploadInput
            name="comprobantePropiedad"
            placeholder="Formato PDF"
            maxSize={10}
            onChange={handleFileChange}
            error={errors.comprobantePropiedad}
          />
        </FormFieldWithInfo>

        <FormFieldWithInfo 
          label="Fotos del establecimiento, maquinaria o depósito"
        >
          <FileUploadInput
            name="fotosEstablecimiento"
            maxSize={10}
            onChange={handleFileChange}
            error={errors.fotosEstablecimiento}
          />
        </FormFieldWithInfo>

        <FormFieldWithInfo 
          label="Evidencia de actividad online"
          info="Sitio web, redes, catálogos, etc."
        >
          <FileUploadInput
            name="evidenciaOnline"
            placeholder="Sitio web, redes, catálogos, etc."
            maxSize={10}
            onChange={handleFileChange}
            error={errors.evidenciaOnline}
          />
        </FormFieldWithInfo>

        <FormFieldWithInfo 
          label="Descripción del mercado y competencia"
          info="Adjuntar información relevante del sector"
        >
          <FileUploadInput
            name="descripcionMercado"
            maxSize={10}
            onChange={handleFileChange}
            error={errors.descripcionMercado}
          />
        </FormFieldWithInfo>

      </FormSection>
    );
  };

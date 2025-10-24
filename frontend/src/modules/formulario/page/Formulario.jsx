import { useState } from "react";
import { Header } from "../../landingPage/components/organismos/Header";
import { Footer } from "../../auth/components/organismos/Footer";
import { LayaoutPasos } from "../components/plantilla/LayaoutPasos";
import { CreditRequestTemplate } from "../components/plantilla/CreditRequestTemplate";
import { RegistrationTemplate } from "../components/plantilla/RegistrationTemplate";
import { DocumentacionLegal } from "../components/organismos/DocumentacionLegal";
import { DocumentosRepresentanteLegal } from "../components/organismos/DocumentosRepresentanteLegal";

// 🧩 COMPONENTE UNIFICADO (el que tú pasaste)
export const UnifiedRegistrationPage = () => {
  const [formData, setFormData] = useState({
    // Documentación Legal
    contratoEstatuto: null,
    actaDesignacion: null,
    poderRepresentante: null,
    constanciaFiscal: null,
    comprobanteDomicilio: null,
    certificadoMipyme: null,
    // Documentos Representante Legal
    dniRepresentante: null,
    domicilioRepresentante: null,
    declaracionBeneficiario: null
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDocuLegal, setIsDocuLegal] = useState(true);

  const handleBack = () => {
    if (isDocuLegal) {
      // Aquí podrías manejar la navegación al paso anterior si es necesario
      alert('Navegando al credito anterior');
    } else {
      handleDocuLegalToggle();
    }
  };

  const handleDocuLegalToggle = () => {
    setIsDocuLegal(!isDocuLegal);
  }

  const handleContinue = () => {

  if (isDocuLegal) {
    // Cambiar a la otra sección
    handleDocuLegalToggle();
    return;
  }

    // Validar campos requeridos
    const requiredFields = [
      'contratoEstatuto',
      'actaDesignacion',
      'constanciaFiscal',
      'comprobanteDomicilio',
      'dniRepresentante',
      'domicilioRepresentante',
      'declaracionBeneficiario'
    ];

    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Simular guardado
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Formulario enviado:', formData);
      alert('Documentos enviados correctamente');
    }, 1500);
  };

return (
    <RegistrationTemplate 
      onBack={handleBack} 
      onContinue={handleContinue}
      isSaving={isSaving}
    >
      <div className="unified-content">
        {isDocuLegal ? (
          <DocumentacionLegal 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        ) : (
          <DocumentosRepresentanteLegal 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </div>
      
      <style jsx>{`
        .unified-content {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(30, 90, 90, 0.2) 20%,
            rgba(30, 90, 90, 0.2) 80%,
            transparent
          );
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </RegistrationTemplate>
  );
};
// 🌟 COMPONENTE PRINCIPAL
export default function Formulario() {
  const [pasoActual, setPasoActual] = useState(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* HEADER */}
      <Header
        texto="¿Aún no tienes tu cuenta? Regístrate"
        textoMovil="Regístrate"
        direccionar="/registro"
      />

      {/* PASOS */}
      <div>
        <LayaoutPasos paso={pasoActual} />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: "30px 0",
        }}
      >
        {/* Render condicional por paso */}
        {pasoActual === 0 ? (
          <CreditRequestTemplate paso={pasoActual} setPaso={setPasoActual} />
        ) : pasoActual === 1 ? (
          <UnifiedRegistrationPage />
        ) : (
          <div className="text-gray-600">Próximos pasos en construcción...</div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

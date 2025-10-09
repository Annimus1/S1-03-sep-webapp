import { useState, useEffect } from "react";
import { TabSelector } from "../components/moleculas/TabSelector";
import { LoadingScreen } from "../components/organismos/LoadingScreen";
import { Step1PersonalData } from "../components/Plantillas/Step1PersonalData";
import { Step2CompanyData } from "../components/Plantillas//Step2CompanyData";
import { Step4TermsAndConditions } from "../components/Plantillas/Step4TermsAndConditions";
import { Step3LegalRepresentative } from "../components/Plantillas/Step3LegalRepresentative";
import { BotonAnimado } from '../../../globals/components/atomos/BotonAnimado';
import { Logo } from "../../../globals/components/atomos/Logo";
import { Footer } from "../../auth/components/organismos/Footer";

export default function Registro() {
  const [userType, setUserType] = useState('pyme');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [esCelular, setEsCelular] = useState(window.innerWidth < 576);
  const [formData, setFormData] = useState({
    email: '',
    emailConfirm: '',
    nombres: '',
    apellidos: '',
    password: '',
    passwordConfirm: '',
    razonSocial: '',
    nif: '',
    tipoSocietario: '',
    registroCamara: '',
    domicilioFiscal: '',
    domicilioComercial: '',
    actividadEconomica: '',
    fechaConstitucion: '',
    repNombres: '',
    repApellidos: '',
    repDni: '',
    repCargo: '',
    repDomicilio: '',
    pep: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (type) => {
    setUserType(type);
    setStep(1);
  };

  const handleFinalSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('¡Cuenta creada exitosamente!');
    }, 3000);
  };

  useEffect(() => {
    const handleResize = () => setEsCelular(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

return (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* HEADER */}
    <div className="navbar navbar-light bg-white shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center px-3 px-md-5 flex-wrap">
        <Logo />
        <BotonAnimado
          variante="moradoSuave"
          tamaño="xs"
          onClick={() => alert('Ir a registro')}
          className="text-center text-wrap"
          style={{ whiteSpace: 'normal', maxWidth: '180px' }}
        >
          {esCelular ? (
            <>
              ¿Aún no tienes
              <br />
              tu cuenta? Regístrate
            </>
          ) : (
            '¿Aún no tienes una cuenta? Regístrate'
          )}
        </BotonAnimado>
      </div>
    </div>

    {/* CONTENIDO CENTRAL */}
    <div className="container d-flex justify-content-center align-items-center flex-grow-1">
      <div>
        <TabSelector activeTab={userType} onTabChange={handleTabChange} />

        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {step === 1 && (
              <Step1PersonalData
                formData={formData}
                onChange={handleChange}
                onNext={() => setStep(2)}
                userType={userType}
              />
            )}

            {step === 2 && userType === 'pyme' && (
              <Step2CompanyData
                formData={formData}
                onChange={handleChange}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {step === 2 && userType === 'asesor' && (
              <Step4TermsAndConditions
                onAccept={handleFinalSubmit}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && userType === 'pyme' && (
              <Step3LegalRepresentative
                formData={formData}
                onChange={handleChange}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && userType === 'pyme' && (
              <Step4TermsAndConditions
                onAccept={handleFinalSubmit}
                onBack={() => setStep(3)}
              />
            )}
          </>
        )}
      </div>
    </div>

    {/* FOOTER */}
    <Footer />
  </div>
);
}
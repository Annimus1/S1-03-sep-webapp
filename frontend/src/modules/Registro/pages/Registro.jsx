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
import axios from "axios";

export default function Registro() {
  const API_URL = import.meta.env.VITE_API_URL;
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

  };

  useEffect(() => {
    const handleResize = () => setEsCelular(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);

      const testData = {
        email: "emal@gmail.com",
        password: "12345678",
        role: "user",
        nombre: "Pablo",
        personalDNI: "123456789159",
        CUIT: "123456789159",
        Cargo: "Supervisor",
        nombreComercial: "Empresa Test",
        empresarialCUIT: "123456789159",
        tipoSocietario: "SA",
        domicilioFiscal: "Address Fiscal 123",
        domicilioComercial: "Address Comercial 456",
        actividadEconomicaPrincipal: "Compra/Venta",
        fechaConstitucion: "2025-10-09T13:01:18.000Z",
        numeroRegistro: "123456789159"
      };

      axios.post('http://localhost:3001/api/v1/auth/register', testData)
      .then(response => {
        if(response.status === 201) {
          alert('¡Cuenta creada exitosamente!')
          console.log(response.data);
        } else {
          alert('Error al crear la cuenta')
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });

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
          onClick={() => window.location.href = '/login'}
          className="text-center text-wrap"
          style={{ whiteSpace: 'normal', maxWidth: '180px' }}
        >
          {esCelular ? (
            <>
              ¿Ya estás registrado
              <br />
              ? Inicia Sesión
            </>
          ) : (
            '¿Ya estás registrado? Inicia Sesión'
          )}
        </BotonAnimado>
      </div>
    </div>

    {/* CONTENIDO CENTRAL */}
    <div className="container d-flex justify-content-center align-items-center flex-grow-1 py-4">
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
import { useState, useEffect, useContext } from "react";
import { TabSelector } from "../components/moleculas/TabSelector";
import { LoadingScreen } from "../components/organismos/LoadingScreen";
import { Step1PersonalData } from "../components/Plantillas/Step1PersonalData";
import { Step2CompanyData } from "../components/Plantillas/Step2CompanyData";
import { Step3LegalRepresentative } from "../components/Plantillas/Step3LegalRepresentative";
import { Step4TermsAndConditions } from "../components/Plantillas/Step4TermsAndConditions";
import { Footer } from "../../auth/components/organismos/Footer";
import axios from "axios";
import { UserContext } from "../../../stores/UserContext";
import { Header } from "../../landingPage/components/organismos/Header";

export default function Registro() {
  const { setUser } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [userType, setUserType] = useState("pyme");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
    nombre: "",
    apellido: "",
    nombreComercial: "",
    cuitEmpresa: "",
    tipoSocietario: "",
    numeroRegistro: "",
    domicilioFiscal: "",
    domicilioComercial: "",
    actividadEconomica: "",
    fechaConstitucion: "",
    repNombres: "",
    repApellidos: "",
    repDni: "",
    repCargo: "",
    repDomicilio: "",
    pep: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (type) => {
    setUserType(type);
    setStep(1);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      let response;

      if (userType === "asesor") {
        // Registro asesor
        const registroData = {
          email: formData.email,
          password: formData.password,
          nombres: formData.nombre,
          apellidos: formData.apellido,
        };

        response = await axios.post(`${API_URL}/auth/register-adviser`, registroData);
      } else {
        // Registro pyme
        const registroData = {
          email: formData.email,
          password: formData.password,
          nombres: formData.nombre,
          apellidos: formData.apellido,
          personalDNI: formData.repDni || "00000000",
          CUIT: formData.cuitEmpresa,
          Cargo: formData.repCargo,
          nombreComercial: formData.nombreComercial,
          empresarialCUIT: formData.cuitEmpresa,
          tipoSocietario: formData.tipoSocietario,
          domicilioFiscal: formData.domicilioFiscal,
          domicilioComercial: formData.domicilioComercial,
          actividadEconomicaPrincipal: formData.actividadEconomica,
          fechaConstitucion: formData.fechaConstitucion,
          numeroRegistro: formData.numeroRegistro,
          pep: formData.pep,
        };

        response = await axios.post(`${API_URL}/auth/register`, registroData);
      }

      if (response.status === 201) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("data", JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("❌ Error en Registro:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Kredia - Registro";
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F6F8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header ruta="/login" textoWindows="¿Ya estás registrado? Inicia Sesión" textoMovil="Login" />

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

              {step === 2 && userType === "pyme" && (
                <Step2CompanyData
                  formData={formData}
                  onChange={handleChange}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 2 && userType === "asesor" && (
                <Step4TermsAndConditions onAccept={handleFinalSubmit} onBack={() => setStep(1)} />
              )}

              {step === 3 && userType === "pyme" && (
                <Step3LegalRepresentative
                  formData={formData}
                  onChange={handleChange}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              )}

              {step === 4 && userType === "pyme" && (
                <Step4TermsAndConditions onAccept={handleFinalSubmit} onBack={() => setStep(3)} />
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
import { useState, useEffect, useContext } from "react";
import { Header } from "../../landingPage/components/organismos/Header";
import { Footer } from "../../auth/components/organismos/Footer";
import { LayaoutPasos } from "../components/plantilla/LayaoutPasos";
import { Cero } from "../components/pasos/Cero";
import { Uno } from "../components/pasos/Uno";
import { Dos } from "../components/pasos/Dos";
import { Tres } from "../components/pasos/Tres";
import { Cuatro } from "../components/pasos/Cuatro";
import { Cinco } from "../components/pasos/Cinco";
import { Seis } from "../components/pasos/Seis";
import { Siete } from "../components/pasos/Siete";
import { UserContext } from "../../../stores/UserContext.jsx";
import axios from "axios";

export default function Formulario() {
  const [pasoActual, setPasoActual] = useState(0);
  const [creditInfo, setCreditInfo] = useState(null);
  const [datosVerificados, setDatosVerificados] = useState(null);

  const { user } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;

  // 🧠 1️⃣ Obtener creditInfo desde localStorage
  useEffect(() => {
    const storedCreditInfo = localStorage.getItem("creditInfo");
    if (storedCreditInfo) {
      try {
        const parsed = JSON.parse(storedCreditInfo);
        setCreditInfo(parsed);

        // ⬇️ Cargar paso guardado
        if (parsed?.PasoActual !== undefined) {
          setPasoActual(parsed.PasoActual);
        }
      } catch (error) {
        console.error("Error al parsear creditInfo:", error);
      }
    }
  }, []);

  // 🧠 2️⃣ Consultar si los datos están verificados
  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user?.id || !user?.token) return;
      try {
        const response = await axios.get(`${API_URL}/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log("✅ Perfil obtenido:", response.data);
        setDatosVerificados(response.data.datosVerificados);
      } catch (error) {
        console.error("❌ Error al obtener el perfil:", error.response?.data || error.message);
      }
    };

    fetchPerfil();
  }, [user]);

  // 🧠 3️⃣ Lógica especial: si el paso guardado es 1 y ya está verificado → saltar al 2
  useEffect(() => {
    if (pasoActual === 1 && datosVerificados === true) {
      console.log("🔁 Usuario con datos verificados — saltando paso 1");
      setPasoActual(2);
    }
  }, [pasoActual, datosVerificados]);

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
        ruta="/"
        textoWindows="Guardar y Continuar después"
        textoMovil="Guardar y Continuar"
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
          paddingBottom: "32px",
        }}
      >
        {pasoActual === 0 ? (
          <Cero setPasoActual={setPasoActual} />
        ) : pasoActual === 1 ? (
          <Uno setPasoActual={setPasoActual} />
        ) : pasoActual === 2 ? (
          <Dos setPasoActual={setPasoActual} />
        ) : pasoActual === 3 ? (
          <Tres setPasoActual={setPasoActual} />
        ) : pasoActual === 4 ? (
          <Cuatro setPasoActual={setPasoActual} />
        ) : pasoActual === 5 ? (
          <Cinco setPasoActual={setPasoActual} />
        ) : pasoActual === 6 ? (
          <Seis setPasoActual={setPasoActual} />
        ) : pasoActual === 7 ? (
          <Siete setPasoActual={setPasoActual} />
        ) : null}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

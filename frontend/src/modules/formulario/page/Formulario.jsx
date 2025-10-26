import { useState } from "react";
import { Header } from "../../landingPage/components/organismos/Header";
import { Footer } from "../../auth/components/organismos/Footer";
import { LayaoutPasos } from "../components/plantilla/LayaoutPasos";
import { Cero } from "../components/pasos/Cero";
import { Uno } from "../components/pasos/Uno";
import { Dos } from "../components/pasos/Dos";

// 🌟 COMPONENTE PRINCIPAL
export default function Formulario() {
  const [pasoActual, setPasoActual] = useState(2);

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
          paddingBottom: "32px",
        }}
      >
        {pasoActual === 0 ? (
          <Cero setPasoActual={setPasoActual}/>
        ) : pasoActual === 1 ? (
          <Uno setPasoActual={setPasoActual} />
        ) : pasoActual === 2 ? (
          <Dos setPasoActual={setPasoActual} />
        ) : null}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

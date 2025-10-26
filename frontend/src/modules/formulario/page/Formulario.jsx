import { useState } from "react";
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
        ruta="/" textoWindows="Guardar y Continuar después" textoMovil="Guardar y Continuar"
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

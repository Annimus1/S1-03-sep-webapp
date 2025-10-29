import { useState } from "react";
import { Header } from "../../landingPage/components/organismos/Header";
import { Footer } from "../../auth/components/organismos/Footer";
import { Uno } from "../components/Uno";

// 🌟 COMPONENTE PRINCIPAL
export default function VerificarCuenta() {
  const [pasoActual, setPasoActual] = useState(0);

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
        ruta="/dashboard"
        textoWindows="Volver al Dashboard"
        textoMovil="Volver"
      />

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
        <Uno/>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
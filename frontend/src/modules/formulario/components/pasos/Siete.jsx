import React, { useState } from "react";
import { LoadingRedirect } from "../organismos/LoadingRedirect";
import { FirmaDigitalView } from "../organismos/FirmaDigitalView";
import { contratoHTML } from "../data/contratoTemplate";

export const Siete = ({ setPasoActual }) => {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleFirmaComplete = () => {
    alert("¡Proceso completado exitosamente! 🎉");
    // Aquí puedes redirigir a confirmación o dashboard
    // setPasoActual(7); // Si hay un paso final
    // history.push('/dashboard');
  };

  if (showLoading) {
    return <LoadingRedirect onComplete={handleLoadingComplete} />;
  }

  return (
    <FirmaDigitalView
      contratoHTML={contratoHTML}
      onComplete={handleFirmaComplete}
    />
  );
};
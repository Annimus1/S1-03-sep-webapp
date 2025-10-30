import React, { useState } from "react";
import { LoadingRedirect } from "../organismos/LoadingRedirect";
import { FirmaDigitalView } from "../organismos/FirmaDigitalView";

export const Siete = ({ setPasoActual }) => {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleFirmaComplete = () => {
    alert("¡Proceso completado exitosamente! 🎉");
  };

  if (showLoading) {
    return <LoadingRedirect onComplete={handleLoadingComplete} />;
  }

  return (
    <FirmaDigitalView
      onComplete={handleFirmaComplete}
      setPasoActual={setPasoActual}
    />
  );
};
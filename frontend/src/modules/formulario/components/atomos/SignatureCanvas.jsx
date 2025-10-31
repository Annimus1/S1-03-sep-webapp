import React, { useRef, useState, useEffect } from "react";
import styles from "./SignatureCanvas.module.css";

export const SignatureCanvas = ({ onSignatureComplete }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ✅ Configuración del canvas con tamaño fijo 200x106 px
    canvas.width = 2000;
    canvas.height = 1006;

    ctx.strokeStyle = "#000"; // Color negro
    ctx.lineWidth = 16; // Grosor de línea
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Fondo transparente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Ajuste por escala si el canvas se visualiza redimensionado
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const coords = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const coords = getCoordinates(e);

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setIsEmpty(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (!isEmpty) {
      const canvas = canvasRef.current;
      // ✅ Exportar en PNG RGBA 32 bits
      onSignatureComplete(canvas.toDataURL("image/png"));
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onSignatureComplete(null);
  };

  return (
    <div className={styles.signatureContainer}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {isEmpty && (
        <div className={styles.placeholder}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 17l6-6 4 4 8-8"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Escribe aquí tu firma en la pizarra para validar tu solicitud de forma segura.</span>
        </div>
      )}

      {!isEmpty && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={clearSignature}
        >
          Limpiar
        </button>
      )}
    </div>
  );
};

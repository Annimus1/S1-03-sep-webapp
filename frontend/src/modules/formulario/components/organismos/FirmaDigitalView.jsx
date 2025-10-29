import React, { useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { contratoHTML } from "../data/contratoTemplate";

export const FirmaDigitalView = ({ setPasoActual }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleClear = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return alert("No se encontró el lienzo de la firma");

    // ✅ Convertir la firma en Blob PNG
    const signatureBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!signatureBlob) return alert("Por favor dibuja tu firma antes de continuar.");

    // 🔑 Obtener crédito y token
    const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
    const creditId = creditInfo?.credit?._id;
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;

    if (!creditId) return alert("No se encontró el ID del crédito.");

    // ✅ Generar PDF real en Blob usando html2pdf con `.output('blob')`
    const contratoElement = document.createElement("div");
    contratoElement.innerHTML = contratoHTML;

    const pdfBlob = await html2pdf()
      .from(contratoElement)
      .set({
        margin: 10,
        filename: "contrato.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .output("blob");

    // 📦 Crear el FormData correcto
    const formData = new FormData();
    formData.append("signature", signatureBlob, "firma.png");
    formData.append("contract", pdfBlob, "contrato.pdf");

    console.log("📤 Enviando al backend:", [...formData.entries()]);

    try {
      setIsSubmitting(true);

      const res = await axios.post(`${API_URL}/signature/sign/${creditId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      // ✅ Descargar el PDF devuelto (contrato firmado)
      const pdfResponse = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfResponse);
      link.download = "Contrato_Firmado.pdf";
      link.click();

      alert("✅ Firma y contrato enviados correctamente.");
      setPasoActual(8);
    } catch (err) {
      console.error("❌ Error al enviar la firma:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.data?.message ||
        "Error al enviar la firma o contrato.";
      alert(`❌ ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-semibold mb-4">✍️ Firma Digital del Contrato</h2>
      <p className="mb-4 text-gray-600 text-center">
        Dibuja tu firma en el recuadro y envíala junto con el contrato PDF.
      </p>

      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border border-gray-400 rounded-lg bg-white shadow-md"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleClear}
          className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
        >
          Limpiar
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          {isSubmitting ? "Enviando..." : "Enviar Firma"}
        </button>
      </div>
    </div>
  );
};

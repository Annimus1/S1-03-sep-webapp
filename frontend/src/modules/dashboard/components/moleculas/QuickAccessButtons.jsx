import { useNavigate } from "react-router-dom";
import { DocumentIcon } from "../atomos/DocumentIcon";
import { SignatureIcon } from "../atomos/SignatureIcon";
import { UserContext } from "../../../../stores/UserContext";
import { useContext, useState, useEffect } from "react";

export const QuickAccessButtons = ({ height = "100%", width = "100%" }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [firmaEnabled, setFirmaEnabled] = useState(false);

  useEffect(() => {
    // Leer creditInfo desde localStorage
    const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
    if (creditInfo?.PasoActual === 6) {
      setFirmaEnabled(true);
    } else {
      setFirmaEnabled(false);
    }
  }, []);

  const goToDocumentos = () => {
    navigate("/documentos");
  };

  const goToFormulario = () => {
    if (firmaEnabled) {
      navigate("/formulario");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#562CA4",
        borderRadius: "40px",
        padding: "20px 24px",
        display: "flex",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
    >
      {/* ==== BOTÓN DOCUMENTOS ==== */}
      <div
        style={{ textAlign: "center", cursor: "pointer", color: "white" }}
        onClick={goToDocumentos}
      >
        <span
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          Documentos
        </span>

        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#DAD6FE",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            transition: "all 0.2s ease",
          }}
        >
          <DocumentIcon />
        </div>
      </div>

      {/* ==== BOTÓN FIRMA DIGITAL ==== */}
      {user?.role !== "asesor" && (
        <div
          style={{
            textAlign: "center",
            cursor: firmaEnabled ? "pointer" : "not-allowed",
            color: "white",
            opacity: firmaEnabled ? 1 : 0.5,
          }}
          onClick={goToFormulario}
        >
          <span
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Firma Digital
          </span>

          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#DAD6FE",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              transition: "all 0.2s ease",
            }}
          >
            <SignatureIcon />
          </div>
        </div>
      )}
    </div>
  );
};

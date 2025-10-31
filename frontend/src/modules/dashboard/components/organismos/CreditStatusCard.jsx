import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../stores/UserContext";
import OjoNO from "../../../../assets/icons/OjoNO.svg";

export const CreditStatusCard = ({ height = "100%" }) => {
  const { user } = useContext(UserContext);
  const [creditInfoBackend, setCreditInfoBackend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMonto, setShowMonto] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const creditInfo = JSON.parse(localStorage.getItem("creditInfo"));
  const creditId = creditInfo?.credit?._id;

  useEffect(() => {
    // 🔹 Si el usuario no tiene crédito aún, no llamamos a la API
    if (!creditId) {
      console.log("⚠️ Usuario sin crédito aún. No se realiza fetch.");
      setLoading(false);
      return;
    }

    const fetchCredit = async () => {
      if (!user?.token) return;
      try {
        const response = await axios.get(`${API_URL}/credit/${creditId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log("✅ Crédito obtenido:", response.data);
        setCreditInfoBackend(response.data);
      } catch (error) {
        console.error("❌ Error al obtener crédito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredit();
  }, [creditId, user?.token]);

  // 🟣 Si está cargando
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#562CA4",
          borderRadius: "40px",
          padding: "24px",
          color: "white",
          height: height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Cargando crédito...</p>
      </div>
    );
  }

  // 🟣 Si no tiene crédito aún o no fue encontrado
  if (!creditInfoBackend || creditInfoBackend.data?.status !== "success") {
    return (
      <div
        style={{
          backgroundColor: "#562CA4",
          borderRadius: "40px",
          padding: "24px",
          color: "white",
          height: height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h5
          style={{
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Tu crédito actual
        </h5>

        <img
          src={OjoNO}
          alt="Ojo"
          style={{ width: "35px", height: "35px", marginBottom: "10px" }}
        />

        <p style={{ fontSize: "16px", lineHeight: "1.5", margin: 0 }}>
          Acá encontrará el monto de su crédito aprobado
        </p>
      </div>
    );
  }

  // 🟢 Si el crédito fue encontrado correctamente
  const credit = creditInfoBackend.data.credit;

  return (
    <div
      style={{
        backgroundColor: "#562CA4",
        borderRadius: "40px",
        padding: "24px",
        color: "white",
        height: height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h5
        style={{
          fontSize: "20px",
          fontWeight: "600",
          margin: 0,
          textAlign: "left",
        }}
      >
        Tu crédito actual
      </h5>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => setShowMonto((prev) => !prev)} // 👁️ alternar entre mostrar/ocultar
      >
        {!showMonto ? (
          <img
            src={OjoNO}
            alt="Mostrar monto"
            style={{ width: "30px", height: "30px" }}
          />
        ) : (
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "700",
              margin: 0,
              color: "white",
            }}
          >
            {credit.monto_credito
              ? credit.monto_credito.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })
              : "$ 0,00"}
          </h3>
        )}
      </div>

      <p
        style={{
          fontSize: "16px",
          margin: "10px 0 0",
          lineHeight: "1.5",
          textAlign: "center",
        }}
      >
        En esta sección se podrá visualizar tu crédito aprobado
      </p>
    </div>
  );
};

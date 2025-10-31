import { UserAvatar } from "../../../../globals/components/atomos/UserAvatar";
import { VerifyButton } from "../atomos/VerifyButton";
import { InfoRow } from "../moleculas/InfoRow";
import { UserContext } from "../../../../stores/UserContext.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserInfoCard = () => {
  const { user, isLoading } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const [datosVerificados, setDatosVerificados] = useState(null); // ✅ estado reactivo

  const userId = user?.id; // 👈 ID del usuario
  const token = user?.token; // 👈 token JWT

  const fetchPerfil = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      // ✅ actualizar el estado, no una variable local
      setDatosVerificados(response.data.datosVerificados);

    } catch (error) {
      console.error("❌ Error al obtener el perfil:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (userId && token) { // ✅ solo si existen los datos
      fetchPerfil();
    }
  }, [userId, token]);

  if (isLoading) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: "40px",
          padding: "28px",
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        Cargando datos ...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "40px",
        padding: "28px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <UserAvatar />

      <div style={{ marginTop: "-25px" }}>
        <InfoRow
          leftLabel="Nombre"
          leftValue={user?.nombres}
          rightLabel="Empresa"
          rightValue={user?.companyName}
        />
      </div>

      <div style={{ marginTop: "-25px" }}>
        <InfoRow
          leftLabel="Email"
          leftValue={user?.email}
          rightLabel="Score"
          rightValue={"100 pts"}
        />
      </div>

      <div style={{ marginTop: "-10px", textAlign: "center" }}>
        {datosVerificados === null ? (
          <p style={{ color: "gray" }}>Cargando verificación...</p>
        ) : datosVerificados === true ? (
          <p style={{ color: "green", fontWeight: "800", marginTop: "7px" }}>
            Datos verificados ✅
          </p>
        ) : (
          <VerifyButton />
        )}
      </div>
    </div>
  );
};

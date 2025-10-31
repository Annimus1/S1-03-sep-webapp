import { useNavigate } from "react-router-dom";
import Click from "../../../../assets/icons/Click.svg";

export const VerifyButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/verificarCuenta");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "#DAD6FE",
        color: "#2C3E50",
        border: "none",
        borderRadius: "30px",
        padding: "14px 36px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "0 auto",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(184, 165, 232, 0.3)",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <img src={Click} alt="Click" style={{ width: "10px", height: "10px" }} />
      Verificar mi cuenta
    </button>
  );
};
import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export const TarjetaCaracteristica = ({
  children,
  textoBoton,
  colorFondo = "#7FDED2",
  botonFlotante = true,
  espacioInferior = false,
  altura = "250px",
  imagenSrc,
  imagenAlt = "Imagen de la característica",
}) => {
  const navigate = useNavigate();
  
  return (
    <div
      style={{
        backgroundColor: colorFondo,
        borderRadius: 20,
        padding: "30px 20px",
        minHeight: altura, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // evita que la imagen se vaya arriba y el texto abajo
        alignItems: "center",         // centra horizontalmente todo
        position: "relative",
        overflow: "visible",
        marginBottom: espacioInferior ? "20px" : "0",
        textAlign: "center",          // opcional: centra el texto
      }}
    >
      {/* Imagen centrada */}
      {imagenSrc && (
        <div 
          style={{ 
            width: "100%", 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <img 
            src={imagenSrc} 
            alt={imagenAlt}
            loading="lazy" 
            style={{ 
              maxWidth: "100%", 
              height: "auto", 
              borderRadius: "15px", 
              objectFit: "cover",
            }} 
          />
        </div>
      )}

      {/* Contenido (texto, HTML, etc.) */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#1a3a3a",
          marginBottom: "15px",
        }}
      >
        {children}
      </div>

      {/* Botón flotante o normal */}
      {textoBoton && (
        <div
          style={{
            position: botonFlotante ? "absolute" : "static",
            right: botonFlotante ? "20px" : "0",
            bottom: botonFlotante ? "-15px" : "0",
          }}
        >
          <BotonAnimado variante="naranja" onClick={()=>{navigate('/registro')}}>{textoBoton}</BotonAnimado>
        </div>
      )}
    </div>
  )
};

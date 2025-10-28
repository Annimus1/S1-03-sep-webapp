import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";
import { ItemFAQ } from "../moleculas/ItemFAQ";
import { useNavigate } from "react-router";

/**
 * Sección de preguntas frecuentes
 * Muestra las dudas más comunes de los usuarios
 */
export const SeccionFAQ = () => {
  const navigate = useNavigate()
  return (
  <section style={{ backgroundColor: 'white', padding: '50px 0' }}>
    <div className="container">
      {/* Encabezado de la sección */}
      <div style={{ 
        backgroundColor: '#7B1FA2', 
        borderRadius: 30, 
        padding: '30px',
        marginBottom: 30
      }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, textAlign: 'center', margin: 0 }}>
          Preguntas Frecuentes
        </h2>
      </div>
      
      {/* Lista de preguntas */}
      <div className="mx-auto" style={{ maxWidth: 900 }}>
        <ItemFAQ 
          pregunta="¿Cuánto tarda el proceso de solicitud de crédito?" 
          respuesta="Nuestro proceso es 100% digital y ágil. En pocos minutos puedes completar tu solicitud y recibir una respuesta preliminar sin papeleo ni esperas."
        />
        <ItemFAQ 
          pregunta="¿Qué documentos necesito para iniciar mi solicitud?"
          respuesta="Necesitas tu DNI, RUC de tu empresa, estados financieros básicos y documentos que acrediten la actividad de tu negocio. Todo se sube de forma digital y segura."
        />
        <ItemFAQ 
          pregunta="¿Es seguro subir mis datos y documentos?"
          respuesta="Sí, utilizamos tecnología de encriptación de última generación y cumplimos con todas las normas de seguridad bancaria. Tus datos están completamente protegidos."
        />
        <ItemFAQ 
          pregunta="¿Puedo guardar mi avance y continuar más tarde?"
          respuesta="¡Por supuesto! Puedes guardar tu progreso en cualquier momento y retomar tu solicitud cuando lo desees desde cualquier dispositivo."
        />
        <ItemFAQ 
          pregunta="¿Qué monto máximo puedo solicitar como PyME?"
          respuesta="Puedes solicitar desde $2,500 hasta $55,000 USD, dependiendo de la evaluación crediticia de tu empresa y su capacidad de pago."
        />
        <ItemFAQ 
          pregunta="¿Cómo puedo seguir el estado de mi solicitud?"
          respuesta="Desde tu panel de usuario podrás ver el estado de tu solicitud en tiempo real. Te notificaremos por email y SMS en cada etapa del proceso."
        />
        
        {/* Botón para más ayuda */}
        <div className="text-center mt-4">
          <BotonAnimado variante="naranja" onClick={()=>{navigate('/registro')}}>Ingresa y acelera tu crédito</BotonAnimado>
        </div>
      </div>
    </div>
  </section>
)
};
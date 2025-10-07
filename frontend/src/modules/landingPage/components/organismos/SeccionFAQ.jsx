import { Button } from "../atomos/Button";
import { ItemFAQ } from "../moleculas/ItemFAQ";

/**
 * Sección de preguntas frecuentes
 * Muestra las dudas más comunes de los usuarios
 */
export const SeccionFAQ = () => (
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
        <ItemFAQ pregunta="¿Cuánto tarda el proceso de solicitud de crédito?" />
        <ItemFAQ pregunta="¿Qué documentos necesito para iniciar mi solicitud?" />
        <ItemFAQ pregunta="¿Es seguro subir mis datos y documentos?" />
        <ItemFAQ pregunta="¿Puedo guardar mi avance y continuar más tarde?" />
        <ItemFAQ pregunta="¿Qué monto máximo puedo solicitar como PyME?" />
        <ItemFAQ pregunta="¿Cómo puedo seguir el estado de mi solicitud?" />
        
        {/* Botón para más ayuda */}
        <div className="text-center mt-4">
          <Button variant="primary">Ingresa y acelera tu crédito</Button>
        </div>
      </div>
    </div>
  </section>
);

import { SolicitudRow } from "../moleculas/SolicitudRow";
import { TableHeaderComponent } from "./TableHeaderComponent";

export const SolicitudesTable = ({ solicitudes, selectedId, onSelect }) => {
  const styles = {
    container: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    scrollContainer: {
      overflowY: 'auto',
      overflowX: 'auto',
      maxHeight: '220px',
      maxWidth: '100%',
    },
    content: {
      width: '100%',        // que use solo el ancho del padre
      maxWidth: '100%',     // evita que crezca más que el padre
      overflowX: 'auto',    // si el contenido interno se pasa, muestra scroll
      boxSizing: 'border-box', // asegura que padding/border no lo agrande
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        <div style={styles.content}>
          <TableHeaderComponent />
          {solicitudes.map((solicitud) => (
            <SolicitudRow
              key={solicitud.id}
              solicitud={solicitud}
              selected={selectedId === solicitud.id}
              onSelect={() => onSelect(solicitud.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


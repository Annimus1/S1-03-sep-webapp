import { SolicitudRow } from "../moleculas/SolicitudRow";
import { TableHeaderComponent } from "./TableHeaderComponent";

export const SolicitudesTable = ({ solicitudes, selectedId, onSelect }) => {
  const styles = {
    container: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      maxHeight: '230px',
      display: 'flex',
      flexDirection: 'column'
    },
    scrollContainer: {
      overflowY: 'auto',
      overflowX: 'hidden',
      flexGrow: 1,
      maxHeight: '400px'
    }
  };

  return (
    <div style={styles.container}>
      <TableHeaderComponent />
      <div style={styles.scrollContainer}>
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
  );
};
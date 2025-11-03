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
      border: '1px solid #ddd',
    },
    scrollContainer: {
      overflowY: 'auto',
      overflowX: 'auto',
      maxHeight: '225px',
      maxWidth: '100%',
      padding: '6px 10px',
      scrollbarWidth: 'thin', // Firefox
      scrollbarColor: '#888 #f1f1f1', // Firefox
    },
    content: {
      width: 'max-content', // permite el scroll horizontal si las columnas son anchas
      minWidth: '100%',     // asegura que no se encoja
      boxSizing: 'border-box',
    },
    rowSpacing: {
      marginBottom: '6px',  // separación entre filas
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer} className="custom-scrollbar">
        <div style={styles.content}>
          <TableHeaderComponent />
          {solicitudes.map((solicitud) => (
            <div key={solicitud.id} style={styles.rowSpacing}>
              <SolicitudRow
                solicitud={solicitud}
                selected={selectedId === solicitud.id}
                onSelect={() => onSelect(solicitud.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Scrollbar personalizada para Chrome, Edge y Safari */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #999;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #666;
        }
      `}</style>
    </div>
  );
};

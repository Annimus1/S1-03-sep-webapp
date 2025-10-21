import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const FilterPanel = ({ isOpen, filters, onFilterChange, onApply, onClear }) => {
  if (!isOpen) return null;

  const styles = {
    panel: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      animation: 'slideDown 0.3s ease'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#495057',
      marginBottom: '0.25rem'
    },
    input: {
      padding: '0.5rem',
      border: '2px solid #dee2e6',
      borderRadius: '8px',
      fontSize: '0.95rem',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    select: {
      padding: '0.5rem',
      border: '2px solid #dee2e6',
      borderRadius: '8px',
      fontSize: '0.95rem',
      outline: 'none',
      cursor: 'pointer',
      background: 'white',
      transition: 'border-color 0.2s ease'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '1rem'
    },
    applyButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.6rem 1.5rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    clearButton: {
      background: 'white',
      color: '#6c757d',
      border: '2px solid #dee2e6',
      borderRadius: '8px',
      padding: '0.6rem 1.5rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.panel}>
      <div style={styles.row}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Solicitante</label>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            style={styles.input}
            value={filters.solicitante}
            onChange={(e) => onFilterChange('solicitante', e.target.value)}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Estado</label>
          <select
            style={styles.select}
            value={filters.estado}
            onChange={(e) => onFilterChange('estado', e.target.value)}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
            <option value="En revisión">En revisión</option>
            <option value="En pausa">En pausa</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Monto mínimo</label>
          <input
            type="number"
            placeholder="0"
            style={styles.input}
            value={filters.montoMin}
            onChange={(e) => onFilterChange('montoMin', e.target.value)}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Monto máximo</label>
          <input
            type="number"
            placeholder="999999"
            style={styles.input}
            value={filters.montoMax}
            onChange={(e) => onFilterChange('montoMax', e.target.value)}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <BotonAnimado onClick={onClear} >
          Limpiar
        </BotonAnimado>
        <BotonAnimado onClick={onApply} >
          Aplicar filtros
        </BotonAnimado>
      </div>
    </div>
  );
};
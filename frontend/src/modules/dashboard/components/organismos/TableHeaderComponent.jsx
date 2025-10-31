import { TableHeader } from '../atomos/TableHeader';
export const TableHeaderComponent = () => {
  const styles = {
    header: {
      display: 'grid',
      gridTemplateColumns: '50px 2fr 1.5fr 1.5fr 1.5fr',
      alignItems: 'center',
      padding: '0.6rem 1rem',  
      borderBottom: 'none',    
      fontWeight: '600',
      color: '#495057',
      background: '#ffffffff'
    }
  };

  return (
    <div style={styles.header}>
      <div></div>
      <TableHeader>Solicitante</TableHeader>
      <TableHeader>Monto</TableHeader>
      <TableHeader>Estado</TableHeader>
      <TableHeader>Fecha</TableHeader>
    </div>
  );
};
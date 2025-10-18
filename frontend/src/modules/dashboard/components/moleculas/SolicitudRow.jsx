import React, { useState } from 'react';
import { RadioButton } from '../atomos/RadioButton';
import { TableCell } from '../atomos/TableCell';
import { StatusBadge } from '../atomos/StatusBadge';

export const SolicitudRow = ({ solicitud, selected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    row: {
      display: 'grid',
      gridTemplateColumns: '50px 2fr 1.5fr 1.5fr 1.5fr',
      alignItems: 'center',
      padding: '0.7rem 1rem',     
      borderBottom: 'none',   
      gap: '0.5rem',              
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      background: selected ? '#f8f9fa' : (isHovered ? '#fafbfc' : 'white')
    }
  };


  return (
    <div 
      style={styles.row}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RadioButton checked={selected} onChange={onSelect} />
      <TableCell bold>{solicitud.solicitante}</TableCell>
      <TableCell>{solicitud.monto}</TableCell>
      <TableCell>
        <StatusBadge status={solicitud.estado} />
      </TableCell>
      <TableCell>{solicitud.fecha}</TableCell>
    </div>
  );
};
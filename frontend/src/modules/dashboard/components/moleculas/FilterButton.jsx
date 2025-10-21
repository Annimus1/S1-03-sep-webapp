import React, { useState } from 'react';
export const FilterButton = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    button: {
      background: 'linear-gradient(135deg, #a8e6cf 0%, #7dd3c0 100%)',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 30px',
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#2c2c2c',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
    },
    arrow: {
      fontSize: '1.2rem',
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }
  };

  return (
    <button 
      style={styles.button}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Filtros
      <span style={styles.arrow}>∨</span>
    </button>
  );
};
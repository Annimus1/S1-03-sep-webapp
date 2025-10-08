import React from 'react';

/**
 * Footer simple con texto centrado
 */
export const Footer = () => (
  <footer className="text-center py-3" style={{ color: '#718096', fontSize: '14px' }}>
    © 2025 Kredia{' '}
    <a
      href="#"
      style={{ color: '#553C9A', textDecoration: 'none', fontWeight: '600' }}
    >
      Términos y Condiciones
    </a>
  </footer>
);

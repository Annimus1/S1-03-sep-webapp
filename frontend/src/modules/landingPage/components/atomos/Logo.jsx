/**
 * Componente que muestra el logotipo de Kredia
 * Incluye el ícono con la letra K y el nombre de la marca
*/

export const Logo = () => (
  <div className="d-flex align-items-center">
    {/* Contenedor del ícono circular con la letra K */}
    <div style={{ width: 40, height: 40, backgroundColor: '#00BFA5', borderRadius: 8 }} className="me-2 d-flex align-items-center justify-content-center">
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>K</span>
    </div>
    {/* Texto del nombre de la marca */}
    <span style={{ fontSize: 24, fontWeight: 600, color: '#1a3a3a' }}>Kredia</span>
  </div>
);
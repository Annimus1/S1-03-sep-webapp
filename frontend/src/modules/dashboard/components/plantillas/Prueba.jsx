import React, { useState } from 'react';
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';

// ============================================================================
// ATOMS - Componentes básicos reutilizables
// ============================================================================

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Pendiente: { className: 'badge-secondary', text: 'Pendiente' },
    Aprobado: { className: 'badge-success', text: 'Aprobado' },
    Rechazado: { className: 'badge-danger', text: 'Rechazado' },
    'En revisión': { className: 'badge-info', text: 'En revisión' },
    'En pausa': { className: 'badge-warning', text: 'En pausa' }
  };

  const config = statusConfig[status] || statusConfig.Pendiente;

  return (
    <span className={`status-badge ${config.className}`}>
      {config.text}
    </span>
  );
};

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

const ActionButton = ({ children, variant = 'primary', onClick }) => (
  <button 
    className={`action-button btn-${variant}`} 
    onClick={onClick}
  >
    {children}
  </button>
);

const RadioButton = ({ checked, onChange, label, name }) => (
  <label className="radio-label">
    <input 
      type="radio" 
      name={name}
      checked={checked}
      onChange={onChange}
      className="radio-input"
    />
    <span className="radio-custom"></span>
    <span className="radio-text">{label}</span>
  </label>
);

// ============================================================================
// MOLECULES - Combinaciones de átomos
// ============================================================================

const NotificationItem = ({ icon, text }) => (
  <div className="notification-item">
    <span className="notification-icon">{icon}</span>
    <span className="notification-text">{text}</span>
  </div>
);

const NotificationBar = ({ notifications }) => (
  <div className="notification-bar">
    <div className="notification-title">
      <strong>Notificaciones</strong>
    </div>
    <div className="notification-content">
      {notifications.map((notif, idx) => (
        <NotificationItem key={idx} icon="!" text={notif} />
      ))}
    </div>
  </div>
);

const SolicitudDetailCard = ({ solicitud }) => (
  <div className="card solicitud-detail-card">
    <div className="card-body">
      <div className="detail-header">
        <h6>Detalle de solicitud</h6>
      </div>
      <div className="detail-content">
        <div className="detail-row">
          <span className="detail-label">Nombre Apellido</span>
          <span className="detail-value">{solicitud.nombre}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">ID de la solicitud</span>
          <span className="detail-value">{solicitud.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Amount</span>
          <span className="detail-value">${solicitud.monto.toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Estado</span>
          <StatusBadge status={solicitud.estado} />
        </div>
        <div className="detail-actions">
          <ActionButton variant="warning">
            👁️ {solicitud.actionText}
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
);

const DocumentsCard = () => (
  <div className="card documents-card">
    <div className="card-body">
      <div className="documents-content">
        <div className="document-item">
          <div className="document-icon">📄</div>
          <div className="document-label">Documentos</div>
        </div>
        <div className="document-item">
          <div className="document-icon">✍️</div>
          <div className="document-label">Firma Digital</div>
        </div>
      </div>
    </div>
  </div>
);

const StatsGrid = ({ stats }) => (
  <div className="stats-grid">
    <StatCard label="Solicitudes pendientes" value={stats.pendientes} />
    <StatCard label="Tiempo promedio de aprobación" value={stats.tiempoPromedio} />
    <StatCard label="Solicitudes en evaluación" value={stats.enEvaluacion} />
    <StatCard label="Solicitudes totales" value={stats.totales} />
  </div>
);

const ProgressBar = ({ label, value, color }) => (
  <div className="progress-bar-container">
    <div className="progress-label">{label}</div>
    <div className="progress-bar-wrapper">
      <div 
        className="progress-bar-fill" 
        style={{ 
          width: `${value}%`, 
          backgroundColor: color 
        }}
      />
    </div>
  </div>
);

const SolicitudesTable = ({ solicitudes, onRowSelect, selectedId }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="solicitudes-table-wrapper">
      <div className="table-header">
        <h6>Bandeja de solicitudes</h6>
        <button 
          className="filter-button"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filtros ▾
        </button>
      </div>
      <div className="table-responsive">
        <table className="solicitudes-table">
          <thead>
            <tr>
              <th>Solicitante</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((sol) => (
              <tr 
                key={sol.id} 
                onClick={() => onRowSelect(sol)}
                className={selectedId === sol.id ? 'selected' : ''}
              >
                <td>
                  <RadioButton
                    name="solicitud"
                    label={sol.nombre}
                    checked={selectedId === sol.id}
                    onChange={() => onRowSelect(sol)}
                  />
                </td>
                <td>${sol.monto.toLocaleString()}</td>
                <td>
                  <StatusBadge status={sol.estado} />
                </td>
                <td>{sol.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================================
// ORGANISMS - Secciones completas
// ============================================================================

const DashboardHeader = () => (
  <div className="dashboard-header">
    <div className="logo-container">
      <div className="logo">
        <div className="logo-icon">📊</div>
        <span className="logo-text">Kredia</span>
      </div>
    </div>
    <div className="user-menu">
      <div className="user-avatar">👤</div>
    </div>
  </div>
);

const GlobalVisionPanel = ({ stats }) => (
  <div className="card global-vision-panel">
    <div className="card-body">
      <h6 className="panel-title">Visión global de solicitudes</h6>
      <ProgressBar label="Aprobados" value={70} color="#28a745" />
      <ProgressBar label="Rechazados" value={20} color="#dc3545" />
      <ProgressBar label="En revisión" value={45} color="#007bff" />
    </div>
  </div>
);

const CommunicationPanel = () => (
  <div className="card communication-panel">
    <div className="card-body">
      <h6 className="panel-title">Comunicación</h6>
      <ActionButton variant="warning" onClick={() => alert('Chat con otros asesores')}>
        Chat con otros asesores
      </ActionButton>
      <ActionButton variant="warning" onClick={() => alert('Contacto administración')}>
        Contacto administración
      </ActionButton>
    </div>
  </div>
);

const NewFeaturePanel = () => (
  <div className="card new-feature-panel">
    <div className="card-body">
      <h6 className="feature-title">¡Pronto nueva función!</h6>
      <p className="feature-description">Evaluación de riesgo IA</p>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE - Vista 1: Dashboard Vacío
// ============================================================================

const EmptyDashboardTemplate = () => {
  const emptyStats = {
    pendientes: 0,
    tiempoPromedio: '0',
    enEvaluacion: 0,
    totales: 0
  };

  const emptySolicitudes = Array(5).fill(null).map((_, i) => ({
    id: `000000-${i}`,
    nombre: 'Nombre Apellido',
    monto: 500000,
    estado: 'Pendiente',
    fecha: '00/00/2025'
  }));

  const [selectedSolicitud, setSelectedSolicitud] = useState(emptySolicitudes[0]);

  return (
    <div className="dashboard-template">
      <DashboardHeader />
      
      <div className="dashboard-content">
        <NotificationBar 
          notifications={[
            'Aquí podrás visualizar las últimas actualizaciones de las solicitudes',
            'Aquí podrás visualizar las últimas actualizaciones de las solicitudes'
          ]}
        />

        <div className="main-layout">
          <div className="main-content">
            <div className="cards-row">
              <div className="card-col">
                <SolicitudDetailCard 
                  solicitud={{
                    nombre: 'Nombre Apellido',
                    id: '000000',
                    monto: 500000,
                    estado: 'Pendiente',
                    actionText: 'Ver detalles'
                  }}
                />
              </div>
              <div className="card-col">
                <DocumentsCard />
              </div>
            </div>

            <div className="table-section">
              <SolicitudesTable 
                solicitudes={emptySolicitudes}
                onRowSelect={setSelectedSolicitud}
                selectedId={selectedSolicitud.id}
              />
            </div>
          </div>

          <div className="sidebar">
            <StatsGrid stats={emptyStats} />
            <GlobalVisionPanel stats={emptyStats} />
            <div className="side-panels">
              <NewFeaturePanel />
              <CommunicationPanel />
            </div>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-logo">
          <span className="logo-icon">📊</span>
          <span>Kredia</span>
        </div>
        <div className="footer-text">
          @2025 Kredia - Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// TEMPLATE - Vista 2: Dashboard con Datos
// ============================================================================

const PopulatedDashboardTemplate = () => {
  const populatedStats = {
    pendientes: 8,
    tiempoPromedio: '2 días',
    enEvaluacion: 4,
    totales: 32
  };

  const solicitudesData = [
    { id: '009873', nombre: 'Soledad V.', monto: 25000, estado: 'Pendiente', fecha: '10/10/2025' },
    { id: '009872', nombre: 'Miguel C.', monto: 2500, estado: 'Aprobado', fecha: '05/10/2025' },
    { id: '009871', nombre: 'Jose Tomás D.', monto: 12500, estado: 'Rechazado', fecha: '28/09/2025' },
    { id: '009870', nombre: 'Luis Cordero', monto: 40000, estado: 'En revisión', fecha: '21/09/2025' },
    { id: '009869', nombre: 'Pablo Cortéz', monto: 5000, estado: 'En pausa', fecha: '17/09/2025' }
  ];

  const [selectedSolicitud, setSelectedSolicitud] = useState(solicitudesData[0]);

  return (
    <div className="dashboard-template">
      <DashboardHeader />
      
      <div className="dashboard-content">
        <NotificationBar 
          notifications={[
            'El solicitante envió los documentos',
            'Se ha recibido una nueva solicitud'
          ]}
        />

        <div className="main-layout">
          <div className="main-content">
            <div className="cards-row">
              <div className="card-col">
                <SolicitudDetailCard 
                  solicitud={{
                    nombre: 'Soledad Velázquez',
                    id: '009873',
                    monto: 25000,
                    estado: 'Pendiente',
                    actionText: 'Iniciar revisión solicitud'
                  }}
                />
              </div>
              <div className="card-col">
                <DocumentsCard />
              </div>
            </div>

            <div className="table-section">
              <SolicitudesTable 
                solicitudes={solicitudesData}
                onRowSelect={setSelectedSolicitud}
                selectedId={selectedSolicitud.id}
              />
            </div>
          </div>

          <div className="sidebar">
            <StatsGrid stats={populatedStats} />
            <GlobalVisionPanel stats={populatedStats} />
            <div className="side-panels">
              <NewFeaturePanel />
              <CommunicationPanel />
            </div>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-logo">
          <span className="logo-icon">📊</span>
          <span>Kredia</span>
        </div>
        <div className="footer-text">
          @2025 Kredia - Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// PAGE - Vista principal con toggle
// ============================================================================

const Prueba = () => {
  const [view, setView] = useState('populated');

  return (
    <div className="kredia-app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
        }

        .kredia-app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .dashboard-header {
          background: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          background: linear-gradient(135deg, #6dd5b8 0%, #4db8a0 100%);
          color: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 1.2rem;
        }

        .logo-text {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .user-avatar:hover {
          background: #cbd5e0;
        }

        /* Content Layout */
        .dashboard-content {
          padding: 1.5rem 2rem;
          flex: 1;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cards-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .card-col {
          min-height: 200px;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .side-panels {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        /* Notification Bar */
        .notification-bar {
          background: linear-gradient(135deg, #7dd8be 0%, #5fcfaa 100%);
          border-radius: 15px;
          padding: 1rem 1.5rem;
          color: #1a5644;
        }

        .notification-title {
          margin-bottom: 0.8rem;
          font-size: 1rem;
        }

        .notification-content {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .notification-item {
          background: #fbbf24;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .notification-icon {
          font-weight: bold;
        }

        /* Cards */
        .card {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          height: 100%;
        }

        .card-body {
          padding: 1.5rem;
        }

        .solicitud-detail-card {
          background: linear-gradient(135deg, #b4f0e0 0%, #8ee5cf 100%);
          border: none;
        }

        .detail-header h6 {
          color: #1a5644;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          align-items: center;
        }

        .detail-label {
          color: #2d5f4f;
          font-size: 0.9rem;
        }

        .detail-value {
          color: #1a5644;
          font-weight: 600;
        }

        .detail-actions {
          margin-top: 1rem;
        }

        .action-button {
          border: none;
          border-radius: 20px;
          font-weight: 500;
          padding: 0.6rem 1.2rem;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .btn-warning {
          background: #fbbf24;
          color: #78350f;
        }

        .btn-warning:hover {
          background: #f59e0b;
        }

        /* Documents Card */
        .documents-card {
          background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
          border: none;
        }

        .documents-content {
          display: flex;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          min-height: 150px;
        }

        .document-item {
          text-align: center;
          color: white;
        }

        .document-icon {
          background: white;
          color: #7c3aed;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 0.5rem;
        }

        .document-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
        }

        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .stat-label {
          font-size: 0.8rem;
          color: #718096;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
        }

        /* Table */
        .solicitudes-table-wrapper {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .table-header h6 {
          margin: 0;
          color: #2d3748;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .filter-button {
          background: #e8f7f3;
          color: #2d5f4f;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s;
        }

        .filter-button:hover {
          background: #d4f1ea;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .solicitudes-table {
          width: 100%;
          border-collapse: collapse;
        }

        .solicitudes-table thead th {
          background: transparent;
          border-bottom: 2px solid #e2e8f0;
          color: #4a5568;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 1rem 0.8rem;
          text-align: left;
        }

        .solicitudes-table tbody tr {
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid #e2e8f0;
        }

        .solicitudes-table tbody tr:hover {
          background: #f7fafc;
        }

        .solicitudes-table tbody tr.selected {
          background: #e8f7f3;
        }

        .solicitudes-table tbody td {
          padding: 1rem 0.8rem;
          vertical-align: middle;
        }

        /* Radio Button */
        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          user-select: none;
        }

        .radio-input {
          display: none;
        }

        .radio-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #4a5568;
          border-radius: 50%;
          position: relative;
          flex-shrink: 0;
        }

        .radio-input:checked + .radio-custom {
          border-color: #2d5f4f;
          background: #2d5f4f;
        }

        .radio-input:checked + .radio-custom::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .radio-text {
          font-size: 0.95rem;
          color: #2d3748;
        }

        /* Status Badges */
        .status-badge {
          padding: 0.4rem 0.9rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-block;
        }

        .badge-secondary {
          background: #6c757d;
          color: white;
        }

        .badge-success {
          background: #28a745;
          color: white;
        }

        .badge-danger {
          background: #dc3545;
          color: white;
        }

        .badge-info {
          background: #007bff;
          color: white;
        }

        .badge-warning {
          background: #ffc107;
          color: #856404;
        }

        /* Progress Bars */
        .progress-bar-container {
          margin-bottom: 1rem;
        }

        .progress-label {
          font-size: 0.9rem;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }

        .progress-bar-wrapper {
          background: #e2e8f0;
          border-radius: 10px;
          height: 22px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        /* Panels */
        .global-vision-panel,
        .communication-panel,
        .new-feature-panel {
          background: white;
          border: none;
        }

        .new-feature-panel {
          background: linear-gradient(135deg, #c4f0e0 0%, #a0e8d3 100%);
        }

        .communication-panel {
          background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
        }

        .panel-title {
          color: #2d3748;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .feature-title {
          color: #1a5644;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .feature-description {
          color: #2d5f4f;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Footer */
        .dashboard-footer {
          background: #1e4d3c;
          color: white;
          padding: 1.5rem 2rem;
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .footer-text {
          font-size: 0.9rem;
        }

        /* View Toggle */
        .view-toggle {
          position: fixed;
          top: 90px;
          right: 20px;
          z-index: 1000;
        }

        .toggle-button {
          background: #2d3748;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.3s;
        }

        .toggle-button:hover {
          background: #1a202c;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .main-layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1rem;
          }

          .dashboard-content {
            padding: 1rem;
          }

          .logo-text {
            font-size: 1.4rem;
          }

          .cards-row {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .side-panels {
            grid-template-columns: 1fr;
          }

          .notification-content {
            flex-direction: column;
          }

          .documents-content {
            flex-direction: column;
            gap: 1rem;
          }

          .table-responsive {
            font-size: 0.85rem;
          }

          .solicitudes-table thead th,
          .solicitudes-table tbody td {
            padding: 0.8rem 0.5rem;
          }
        }
      `}</style>

      <div className="view-toggle">
        <BotonAnimado 
          variant="dark" 
          size="sm"
          onClick={() => setView(view === 'empty' ? 'populated' : 'empty')}
        >
          {view === 'empty' ? '📊 Ver con Datos' : '📋 Ver Vacío'}
        </BotonAnimado>
      </div>

      {view === 'empty' ? <EmptyDashboardTemplate /> : <PopulatedDashboardTemplate />}
    </div>
  );
};

export default Prueba;
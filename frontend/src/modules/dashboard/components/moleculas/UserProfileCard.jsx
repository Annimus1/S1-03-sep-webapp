import { BotonAnimado } from "../../../../globals/components/atomos/BotonAnimado";

export const UserProfileCard = ({ user }) => (
  <div className="card shadow-sm" style={{
    borderRadius: '20px',
    border: 'none',
    maxWidth: '700px',
    margin: '40px auto'
  }}>
    <div className="card-body p-4">
      <div className="d-flex flex-column flex-md-row gap-4 align-items-center align-items-md-start">
        {/* Avatar */}
        <div style={{
          width: '140px',
          height: '140px',
          background: 'linear-gradient(135deg, #b8a4d8 0%, #9b87c7 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: '0'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            border: '5px solid white',
            borderRadius: '50%',
            position: 'relative'
          }}>
            <div style={{
              content: '',
              position: 'absolute',
              bottom: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '72px',
              height: '36px',
              border: '5px solid white',
              borderRadius: '36px 36px 0 0',
              borderBottom: 'none'
            }}></div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-grow-1 w-100">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="text-muted small mb-1" style={{ fontSize: '13px' }}>Nombre</label>
              <p className="fw-semibold mb-0" style={{ color: '#1a1a2e', fontSize: '15px' }}>
                {user?.nombre || 'Usuario'}
              </p>
            </div>
          </div>
          
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="text-muted small mb-1" style={{ fontSize: '13px' }}>Email</label>
              <p className="fw-semibold mb-0" style={{ color: '#1a1a2e', fontSize: '15px' }}>
                {user?.email || 'email@example.com'}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <label className="text-muted small mb-1" style={{ fontSize: '13px' }}>Score</label>
              <p className="fw-semibold mb-0" style={{ color: '#1a1a2e', fontSize: '15px' }}>
                405 pts
              </p>
            </div>
          </div>
          
          <BotonAnimado variante="moradoSuave" >
          Verificar Perfil
          </BotonAnimado>
        </div>
      </div>
    </div>
  </div>
);

import { useContext, useEffect, useState } from 'react';
import { BandejaTemplate } from '../plantilla/BandejaTemplate';
import { FilterButton } from '../moleculas/FilterButton';
import { FilterPanel } from '../moleculas/FilterPanel';
import { SolicitudesTable } from '../organismos/SolicitudesTable';
import { UserContext } from '../../../../stores/UserContext';
import { useNavigate } from "react-router";
import axios from 'axios';

export const BandejaSolicitudesPage = ({ setAsesorData, asesorData }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    solicitante: '',
    estado: '',
    montoMin: '',
    montoMax: ''
  });
  const { user, isLoading } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const allSolicitudes = [
    {
      id: 1,
      solicitante: 'Soledad V.',
      monto: '$25,000',
      montoNumerico: 25000,
      estado: 'Pendiente',
      fecha: '10/10/2025'
    },
    {
      id: 2,
      solicitante: 'Miguel C.',
      monto: '$2,500',
      montoNumerico: 2500,
      estado: 'Aprobado',
      fecha: '05/10/2025'
    },
    {
      id: 3,
      solicitante: 'Jose Tomás D.',
      monto: '$12,500',
      montoNumerico: 12500,
      estado: 'Rechazado',
      fecha: '28/09/2025'
    },
    {
      id: 4,
      solicitante: 'Luis Cordero',
      monto: '$40,000',
      montoNumerico: 40000,
      estado: 'En revisión',
      fecha: '21/09/2025'
    },
    {
      id: 5,
      solicitante: 'Pablo Cortéz',
      monto: '$5,000',
      montoNumerico: 5000,
      estado: 'En pausa',
      fecha: '17/09/2025'
    }
  ];

  const [solicitudes, setSolicitudes] = useState(allSolicitudes);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    let filtered = [...allSolicitudes];

    // Filtrar por solicitante
    if (filters.solicitante) {
      filtered = filtered.filter(s =>
        s.solicitante.toLowerCase().includes(filters.solicitante.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filters.estado) {
      filtered = filtered.filter(s => s.estado === filters.estado);
    }

    // Filtrar por monto mínimo
    if (filters.montoMin) {
      filtered = filtered.filter(s => s.montoNumerico >= Number(filters.montoMin));
    }

    // Filtrar por monto máximo
    if (filters.montoMax) {
      filtered = filtered.filter(s => s.montoNumerico <= Number(filters.montoMax));
    }

    setSolicitudes(filtered);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      solicitante: '',
      estado: '',
      montoMin: '',
      montoMax: ''
    });
    setSolicitudes(allSolicitudes);
  };

  const handleSelectSolicitud = (id) => {
    // cambiar id selecionado
    setSelectedId(id);
    // obtener info
    const solicitud = solicitudes.filter(s => s.id === id);
    setAsesorData({
      ...asesorData,
      detallesSolicitud: {
        nombre: solicitud[0].solicitante,
        id: solicitud[0].id,
        cantidad: solicitud[0].monto,
        estado: solicitud[0].estado
      }
    })
  }

  const fetchData = async () => {
    const responseData = []
    let firstElement = true;
    const response = await axios.get(`${API_URL}/credit`,
      { headers: { 'Authorization': `Bearer ${user.user.token}` } })

    if (response.status == 200) {
      response.data.data.credits.forEach(credit => {
        responseData.push({
          id: credit._id,
          solicitante: credit.userId.nombres || 'Soledad V.',
          monto: `ARG ${credit.monto_credit || 2500000}`,
          montoNumerico: credit.monto_credit || 2500000,
          estado: credit.estatus.split(' ')[0],
          fecha: credit.updatedAt.split('T')[0]
        })
        if (firstElement) {
          setSelectedId(credit._id);

          setAsesorData({
            ...asesorData,
            detallesSolicitud: {
              nombre: credit.userId.nombres || 'Soledad V.',
              id: credit._id,
              cantidad: credit.monto_credit || 2500000,
              estado: credit.estatus.split(' ')[0]
            }
          })
          firstElement = false;
        }
      });
      setSolicitudes(responseData);
    }

    if (response.status == 401) {
      logout();
      navigate('/login');
    }
  }

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [isLoading, user, API_URL]);

  if (isLoading) {
    return <div>Cargando datos de usuario...</div>;
  }

  return (
    <BandejaTemplate
      title="Bandeja de solicitudes"
      filterButton={<FilterButton onClick={handleFilterClick} isOpen={isFilterOpen} />}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: 0,
            width: '100%',
            zIndex: 9999
          }}
        >
          <FilterPanel
            isOpen={isFilterOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={applyFilters}
            onClear={clearFilters}
          />
        </div>

        <SolicitudesTable
          solicitudes={solicitudes}
          selectedId={selectedId}
          onSelect={handleSelectSolicitud}
        />
      </div>
    </BandejaTemplate>
  );
};
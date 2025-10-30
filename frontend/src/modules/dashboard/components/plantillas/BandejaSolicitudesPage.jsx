import { useContext, useEffect, useState } from 'react';
import { BandejaTemplate } from '../plantilla/BandejaTemplate';
import { FilterButton } from '../moleculas/FilterButton';
import { FilterPanel } from '../moleculas/FilterPanel';
import { SolicitudesTable } from '../organismos/SolicitudesTable';
import { UserContext } from '../../../../stores/UserContext';
import { useNavigate } from "react-router";
import axios from 'axios';

export const BandejaSolicitudesPage = ({ setAsesorData, asesorData }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allSolicitudes, setAllSolicitudes] = useState([]);
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
  const [solicitudes, setSolicitudes] = useState([]);

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
    // cambiar id seleccionado
    setSelectedId(id);

    // obtener info
    const solicitud = solicitudes.filter(s => s.id === id)[0];

      setAsesorData(prev => ({
        ...prev,
        detallesSolicitud: {
          nombre: solicitud.solicitante,
          id: solicitud.id,
          cantidad: solicitud.monto,
          estado: solicitud.estado
        }
      }));

    // 🔹 Guardar en localStorage para persistencia
    localStorage.setItem("creditoSeleccionado", JSON.stringify({
      id: solicitud.id,
      solicitante: solicitud.solicitante,
      monto: solicitud.monto,
      estado: solicitud.estado
    }));
  };

  const fetchData = async () => {
    const responseData = []
    let firstElement = true;
    const response = await axios.get(`${API_URL}/credit`,
      { headers: { 'Authorization': `Bearer ${user.token}` } })

    if (response.status == 200) {
      const stats = {total:0, recaudacion:0, aprobado:0, rechazado:0, revision:0}
      response.data.data.credits.forEach(credit => {
        responseData.push({
          id: credit._id,
          solicitante: credit.userId.nombres,
          monto: `ARG ${credit.monto_credito}`,
          montoNumerico: credit.monto_credito ,
          estado: credit.estatus.split('_')[0],
          fecha: credit.updatedAt.split('T')[0]
        })
        if(firstElement) {
          setSelectedId(credit._id);

          setAsesorData(prev => ({
            ...prev,
            detallesSolicitud: {
              nombre: credit.userId.nombres,
              id: credit._id,
              cantidad: `ARG ${credit.monto_credito}`,
              estado: credit.estatus.split('_')[0]
            }
          }))
          firstElement = false;
        }
        // add stats
        stats.total = stats.total + 1;
        switch (credit.estatus.split('_')[0]){
          case 'recaudacion':
            stats.recaudacion = stats.recaudacion + 1;
            break
          case 'aprobado':
            stats.aprobado = stats.aprobado + 1;
            break
          case 'rechazado':
            stats.rechazado = stats.rechazado + 1;
            break
          case 'revision':
            stats.revision = stats.revision + 1;
            break
        }
      });
      setSolicitudes(responseData);
      setAsesorData(prev => ({
        ...prev,
        stats: {
          pendientes: stats.recaudacion,
          evaluacion: stats.revision,
          aprobados: stats.aprobado,
          rechazados: stats.rechazado,
          total: stats.total
        }
      }));
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
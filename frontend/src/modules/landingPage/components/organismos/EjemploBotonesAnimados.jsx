import React, { useState } from 'react';
import { BotonAnimado } from '../../../../globals/components/atomos/BotonAnimado';

export const EjemplosBotonesAnimados = () => {
  const [contador, setContador] = useState(0);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: 40
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 50, color: '#333' }}>
          Botones Animados Kredia
        </h1>

        {/* Sección: Botones Naranjas */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ marginBottom: 30, color: '#FFA726' }}>Botones Naranjas</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            padding: 30,
            backgroundColor: 'white',
            borderRadius: 15,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="naranja">
                Continuar
              </BotonAnimado>
            </div>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="naranja">
                Ver estado de mi solicitud
              </BotonAnimado>
            </div>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="naranja">
                Activa tu crédito en minutos
              </BotonAnimado>
            </div>
          </div>
        </section>

        {/* Sección: Botones Morado Suave */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ marginBottom: 30, color: '#7B1FA2' }}>Botones Morado Suave (Outline)</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            padding: 30,
            backgroundColor: 'white',
            borderRadius: 15,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="moradoSuave">
                Volver a mi espacio
              </BotonAnimado>
            </div>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="moradoSuave">
                Guardar y Continuar después
              </BotonAnimado>
            </div>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="moradoSuave">
                ¿Ya estás registrado? Inicia Sesión
              </BotonAnimado>
            </div>
          </div>
        </section>

        {/* Sección: Botones Morados */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ marginBottom: 30, color: '#7B1FA2' }}>Botones Morados</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            padding: 30,
            backgroundColor: 'white',
            borderRadius: 15,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="morado">
                Descargar detalle
              </BotonAnimado>
            </div>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="morado">
                Descargar detalle
              </BotonAnimado>
            </div>
            <div>
              <p style={{ marginBottom: 10, fontSize: 14, color: '#666' }}>Normal</p>
              <BotonAnimado variante="morado">
                Descargar comprobante de firma
              </BotonAnimado>
            </div>
          </div>
        </section>

        {/* Demostración Interactiva */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ marginBottom: 30, color: '#333' }}>Demostración Interactiva</h2>
          <div style={{ 
            padding: 40,
            backgroundColor: 'white',
            borderRadius: 15,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ marginBottom: 20, color: '#666', fontSize: 18 }}>
              Contador de clics: <strong>{contador}</strong>
            </p>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center', flexWrap: 'wrap' }}>
              <BotonAnimado 
                variante="naranja" 
                onClick={() => setContador(contador + 1)}
              >
                Incrementar (+1)
              </BotonAnimado>
              <BotonAnimado 
                variante="moradoSuave" 
                onClick={() => setContador(0)}
              >
                Resetear
              </BotonAnimado>
              <BotonAnimado 
                variante="morado" 
                onClick={() => setContador(contador - 1)}
              >
                Decrementar (-1)
              </BotonAnimado>
            </div>
          </div>
        </section>

        {/* Botones Deshabilitados */}
        <section>
          <h2 style={{ marginBottom: 30, color: '#999' }}>Estados Deshabilitados</h2>
          <div style={{ 
            display: 'flex',
            gap: 20,
            padding: 30,
            backgroundColor: 'white',
            borderRadius: 15,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            flexWrap: 'wrap'
          }}>
            <BotonAnimado variante="naranja" deshabilitado>
              Botón Deshabilitado
            </BotonAnimado>
            <BotonAnimado variante="moradoSuave" deshabilitado>
              Botón Deshabilitado
            </BotonAnimado>
            <BotonAnimado variante="morado" deshabilitado>
              Botón Deshabilitado
            </BotonAnimado>
          </div>
        </section>
      </div>
    </div>
  );
};
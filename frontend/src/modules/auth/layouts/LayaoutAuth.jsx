import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/organismos/Footer'

const LayaoutAuth = () => {
  return (
    <main
      style={{
        height: '100vh',          // Ocupa toda la pantalla
        display: 'flex',
        flexDirection: 'column',  // Para que Outlet arriba y Footer abajo
        justifyContent: 'space-between', // Espacia Outlet y Footer sin dejar scroll
      }}
    >
      <Outlet />

      {/* Footer  no funciona  lo puse directo*/}
    </main>
  )
}

export default LayaoutAuth

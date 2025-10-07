import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Footer } from '../components/Organismo/Footer'

const MainLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout

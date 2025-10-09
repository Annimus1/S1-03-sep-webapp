import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './modules/landingPage/pages/LandingPage'
import MainLayout from './globals/layouts/MainLayout'
import LoginPage from './modules/auth/pages/LoginPage'
import LayaoutAuth from './modules/auth/layouts/LayaoutAuth'
import KrediaRegistro from './modules/Registro/pages/Registro'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<LayaoutAuth />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/registro" element={<KrediaRegistro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
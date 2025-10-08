import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './modules/landingPage/pages/LandingPage'
import MainLayout from './globals/layouts/MainLayout'
import LoginPage from './modules/auth/pages/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './modules/landingPage/pages/LandingPage'
import MainLayout from './globals/layouts/MainLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
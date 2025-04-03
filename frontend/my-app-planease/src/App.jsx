import LoginPage from './Pages/login-page'
import RegisterPage from './Pages/register-page'
import HomePage from './Pages/home-page'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={
          <>
            <Navbar />
              <HomePage />
            <Footer />
          </>
        }
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App

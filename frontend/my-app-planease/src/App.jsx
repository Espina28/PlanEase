import LoginPage from './Pages/login-page'
import RegisterPage from './Pages/register-page'
import HomePage from './Pages/home-page'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import AuthProvider from './Components/AuthProvider'
import ProtectedRoute from './Components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={
              <>
                <ProtectedRoute>
                  <Navbar />
                    <HomePage />
                  <Footer />
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App

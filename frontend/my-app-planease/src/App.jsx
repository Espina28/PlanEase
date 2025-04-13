import LoginPage from './Pages/login-page'
import RegisterPage from './Pages/register-page'
import HomePage from './Pages/home-page'
import LandingPage from './Pages/landing-page'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import AuthProvider from './Components/AuthProvider'
import ProtectedRoute from './Components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SubcontractorBookings from './Pages/subcontractor-pages/subcontractor-bookings'
import SubcontractorDashboard from './Pages/subcontractor-pages/subcontractor-dashboard'
import SubcontractorLogin from './Pages/subcontractor-pages/subcontractor-login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <Footer/>
            </>
            } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/subcontractor/dashboard" element={<SubcontractorDashboard />} />
          <Route path="/subcontractor/transactions" element={<SubcontractorBookings />} />
          <Route path="/subcontractor/login" element={<SubcontractorLogin />} />
          
          
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

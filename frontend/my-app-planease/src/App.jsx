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
import SubcontractorCalendar from './Pages/subcontractor-pages/subcontractor-calendar'
import AdminSubContractors from './Pages/admin-pages/admin-subcontractors'
import AdminProtectedRoute from './Components/AdminProtectedRoute'
import SubContractorProtectedRoute from './Components/SubContractorProtectedRoute'
import InputDetailsPage from './Pages/inputdetails-page'
import SelectServicePage from './Pages/selectservice-page'
import PreviewBookingPage from './Pages/previewbooking-page'
import PaymentProofPage from './Pages/paymentproof-page'
import EventPage from './Pages/event-dashboard'
import EventDetails from './Pages/event-details';
import WeddingPackagePage from './Pages/weddingpackage-details';


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
          <Route path="/book/inputdetails" element={<InputDetailsPage />} />
          <Route path="/book/services" element={<SelectServicePage />} />
          <Route path="/book/preview" element={<PreviewBookingPage />} />
          <Route path="/book/payment" element={<PaymentProofPage />} />
          <Route path="/subcontractor/dashboard" element={
            // <SubContractorProtectedRoute>
                <SubcontractorDashboard />  
            // </SubContractorProtectedRoute>
            } />
          <Route path="/subcontractor/transactions" element={
            // <SubContractorProtectedRoute>
                <SubcontractorBookings />
            // </SubContractorProtectedRoute>
            } />
          <Route path="/subcontractor/calendar" element={
            // <SubContractorProtectedRoute>
                <SubcontractorCalendar />
            // </SubContractorProtectedRoute>
            } />
          <Route path="/subcontractor/login" element={<SubcontractorLogin />
        } />

          <Route path="/admin/subcontractors" element={
            <AdminProtectedRoute>
                <AdminSubContractors/>
            </AdminProtectedRoute>
            }/>

          
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
          <Route path="/event" element={
              <>
                <ProtectedRoute>
                  <Navbar />
                    <EventPage />
                  <Footer />
                </ProtectedRoute>
              </>
            }
          />

          <Route path="/package" element={
              <>
              {/* <PackageProtectedRoute> */}
                <Navbar />
                  <WeddingPackagePage />
                <Footer />
              {/* </PackageProtectedRoute>  */}
              </>
            }
          />

          <Route path="/event/:id" element={
              <>
              <ProtectedRoute>
                <Navbar />
                  <EventDetails />
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

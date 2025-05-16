import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './styles/previewbooking-page.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BookingSidePanel from '../Components/Booking-sidepanel';
import { getCompleteBookingData } from '../utils/bookingStorage';

const PreviewBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Load data using the bookingStorage utility
  const [bookingData, setBookingData] = useState(getCompleteBookingData);

  // Service prices
  const servicePrices = {
    catering: 5000,
    hosting: 2000,
    photographer: 4000,
    band: 8000,
    packages: {
      'cherry-blossom': 300000,
      'tulip': 450000,
      'rose': 350000
    }
  };

  // Calculate the total price based on selected services or package
  const calculateSubtotal = () => {
    if (bookingData.selectedServices.package) {
      return servicePrices.packages[bookingData.selectedServices.package];
    } else {
      let total = 0;
      const { custom } = bookingData.selectedServices;
      if (custom.catering) total += servicePrices.catering;
      if (custom.hosting) total += servicePrices.hosting;
      if (custom.photographer) total += servicePrices.photographer;
      if (custom.band) total += servicePrices.band;
      return total;
    }
  };

  // Calculate subtotal and related values
  const subtotal = calculateSubtotal();
  const downpayment = subtotal * 0.1; // Changed from 20% to 10%
  const remainingBalance = subtotal - downpayment;

  // Format number as Philippine Peso
  const formatAsPeso = (amount) => {
    return '₱' + amount.toLocaleString();
  };

  // Handle navigation to previous page
  const handlePrevious = () => {
    navigate('/book/services');
  };

  // Handle navigation to payment page
  const handlePayment = () => {
    navigate('/book/payment');
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/event">Event</Link> / <span>Book Now</span>
        </div>

        <div className="booking-content">
          {/* Side Panel */}
          <BookingSidePanel activeStep="preview" />

          {/* Main Content */}
          <div className="main-form-content">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-label">Enter Details</div>
              </div>
              <div className="step-line"></div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-label">Services</div>
              </div>
              <div className="step-line"></div>
              <div className="step active">
                <div className="step-number">3</div>
                <div className="step-label">Preview</div>
              </div>
              <div className="step-line"></div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-label">Payment</div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="preview-content">
              <h2 className="section-title">Preview</h2>

              {/* Personal Information */}
              <div className="preview-section">
                <div className="personal-info">
                  <div className="info-row">
                    <div className="info-group">
                      <label>First Name</label>
                      <div className="info-value">{bookingData.personalInfo.firstName}</div>
                    </div>
                    <div className="info-group">
                      <label>Last Name</label>
                      <div className="info-value">{bookingData.personalInfo.lastName}</div>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-group">
                      <label>Email</label>
                      <div className="info-value">{bookingData.personalInfo.email}</div>
                    </div>
                    <div className="info-group">
                      <label>Contact</label>
                      <div className="info-value">{bookingData.personalInfo.contact}</div>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-group">
                      <label>Location</label>
                      <div className="info-value">{bookingData.eventDetails.location}</div>
                    </div>
                    <div className="info-group">
                      <label>Event Date</label>
                      <div className="info-value">{bookingData.eventDetails.eventDate}</div>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-group full-width">
                      <div className="info-value note-value">{bookingData.eventDetails.note}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <h2 className="section-title">Services</h2>
              <div className="services-preview">
                {bookingData.selectedServices.package ? (
                  <div className="package-preview">
                    <div className="preview-service">
                      <div className="service-icon">
                        {bookingData.selectedServices.package === 'cherry-blossom' ? '🌸' : 
                         bookingData.selectedServices.package === 'tulip' ? '🌷' : '🌹'}
                      </div>
                      <div className="service-name">
                        {bookingData.selectedServices.package === 'cherry-blossom' ? 'Cherry Blossom Package' : 
                         bookingData.selectedServices.package === 'tulip' ? 'Tulip Package' : 'Rose Package'}
                      </div>
                      <div className="service-price">
                        {formatAsPeso(servicePrices.packages[bookingData.selectedServices.package])}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="custom-services-preview">
                    {bookingData.selectedServices.custom.catering && (
                      <div className="preview-service">
                        <div className="service-icon">🍽️</div>
                        <div className="service-name">Catering</div>
                        <div className="service-price">{formatAsPeso(servicePrices.catering)}</div>
                      </div>
                    )}
                    
                    {bookingData.selectedServices.custom.hosting && (
                      <div className="preview-service">
                        <div className="service-icon">🎤</div>
                        <div className="service-name">Hosting</div>
                        <div className="service-price">{formatAsPeso(servicePrices.hosting)}</div>
                      </div>
                    )}
                    
                    {bookingData.selectedServices.custom.photographer && (
                      <div className="preview-service">
                        <div className="service-icon">📷</div>
                        <div className="service-name">Photographer</div>
                        <div className="service-price">{formatAsPeso(servicePrices.photographer)}</div>
                      </div>
                    )}
                    
                    {bookingData.selectedServices.custom.band && (
                      <div className="preview-service">
                        <div className="service-icon">🎸</div>
                        <div className="service-name">Band</div>
                        <div className="service-price">{formatAsPeso(servicePrices.band)}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price Calculation */}
              <div className="price-calculation">
                <div className="calculation-row">
                  <div className="calculation-label">Subtotal</div>
                  <div className="calculation-value">{formatAsPeso(subtotal)}</div>
                </div>
                <div className="calculation-row">
                  <div className="calculation-label">Downpayment (10%)</div>
                  <div className="calculation-value">{formatAsPeso(downpayment)}</div>
                </div>
                <div className="calculation-row">
                  <div className="calculation-label">Remaining Balance</div>
                  <div className="calculation-value">{formatAsPeso(remainingBalance)}</div>
                </div>

                <div className="payment-notice">
                  <p>The subtotal is subject to change depending on the final agreement between both parties. Customers are required to pay 10% of the partial (not final) subtotal to confirm the booking.</p>
                  <div className="to-pay">
                    <span>To pay:</span> <strong>{formatAsPeso(downpayment)}</strong>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button className="previous-button" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="payment-button" onClick={handlePayment}>
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreviewBookingPage;

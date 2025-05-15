import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/paymentproof-page.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BookingSidePanel from '../Components/Booking-sidepanel';
import { getCompleteBookingData } from '../utils/bookingStorage';

const PaymentProofPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Get booking data for payment amount
  const bookingData = getCompleteBookingData();
  
  // Calculate payment amount (10% of subtotal)
  const calculateSubtotal = () => {
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
  
  const subtotal = calculateSubtotal();
  const paymentAmount = subtotal * 0.1; // 10% downpayment
  
  // Format number as Philippine Peso
  const formatAsPeso = (amount) => {
    return '₱' + amount.toLocaleString();
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      
      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      
      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Prevent default behavior for drag events
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      alert('Please upload your payment proof before submitting');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process (in a real app, this would send to server)
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Save upload info to sessionStorage
      sessionStorage.setItem('paymentProofUploaded', 'true');
      sessionStorage.setItem('paymentProofFileName', uploadedFile.name);
      
      // Wait 2 seconds before showing success message and redirecting
      setTimeout(() => {
        alert('Payment proof uploaded successfully! Your booking is now confirmed.');
        navigate('/'); // Navigate to home page or a confirmation page
      }, 2000);
    }, 1500);
  };
  
  // Handle previous button click
  const handlePrevious = () => {
    navigate('/book/preview');
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
          <BookingSidePanel activeStep="upload-payment" />

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
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-label">Preview</div>
              </div>
              <div className="step-line"></div>
              <div className="step active">
                <div className="step-number">4</div>
                <div className="step-label">Payment</div>
              </div>
            </div>

            {/* Payment Content */}
            <div className="payment-content">
              <h2 className="section-title">Payment <span className="info-icon">ⓘ</span></h2>
              
              {/* Payment QR Code Section */}
              <div className="payment-qr-section">
                <img 
                  src="/eventEase.jpg" 
                  alt="Payment QR Code" 
                  className="payment-qr"
                />
                <div className="payment-amount">
                  <span>Amount to pay:</span> <strong>{formatAsPeso(paymentAmount)}</strong>
                </div>
              </div>
              
              {/* Proof of Payment Section */}
              <h2 className="section-title">Proof of Payment <span className="info-icon">ⓘ</span></h2>
              
              <div 
                className={`upload-area ${previewUrl ? 'has-file' : ''}`}
                onClick={handleUploadClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {previewUrl ? (
                  <div className="preview-container">
                    <img src={previewUrl} alt="Payment Proof Preview" className="file-preview" />
                    <div className="file-name">{uploadedFile.name}</div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">↑</div>
                    <div>Click here to upload or drop media here</div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }}
                />
              </div>
              
              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button 
                  className="previous-button" 
                  onClick={handlePrevious}
                  disabled={isUploading}
                >
                  Previous
                </button>
                <button 
                  className="submit-button" 
                  onClick={handleSubmit}
                  disabled={isUploading || uploadSuccess}
                >
                  {isUploading ? 'Uploading...' : uploadSuccess ? 'Uploaded ✓' : 'Submit'}
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

export default PaymentProofPage;

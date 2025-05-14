import React from 'react';
import { Link } from 'react-router-dom';
import './styles/booking-sidepanel.css';

const BookingSidePanel = ({ activeStep }) => {
  // Define the booking steps
  const bookingSteps = [
    { id: 'enter-details', label: 'Enter Details', path: '/book/inputdetails' },
    { id: 'services', label: 'Services', path: '/book/services' },
    { id: 'preview', label: 'Preview', path: '/book/preview' }
  ];

  // Define payment steps
  const paymentSteps = [
    { id: 'upload-payment', label: 'Upload Payment Proof', path: '/book/payment-proof' }
  ];

  return (
    <div className="side-panel">
      <div className="manage-booking-section">
        <h3>Manage Booking</h3>
        <ul>
          {bookingSteps.map(step => (
            <li 
              key={step.id} 
              className={activeStep === step.id ? 'active' : ''}
            >
              <Link to={step.path}>{step.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="payment-method-section">
        <h3>Payment Method</h3>
        <ul>
          {paymentSteps.map(step => (
            <li 
              key={step.id} 
              className={activeStep === step.id ? 'active' : ''}
            >
              <Link to={step.path}>{step.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingSidePanel;

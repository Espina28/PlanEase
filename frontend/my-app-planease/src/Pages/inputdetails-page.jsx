import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/inputdetails-page.css';
import Navbar from '../Components/Navbar';
import BookingSidePanel from '../Components/Booking-sidepanel';
import Footer from '../Components/Footer';
import DatePickerWithRestriction from '../Components/DatePickerWithRestriction';

const InputDetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    location: '',
    eventDate: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save form data
    console.log('Form data submitted:', formData);
    // Navigate to services page
    navigate('/book/services');
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
        <BookingSidePanel activeStep="enter-details" />

        {/* Main Content */}
        <div className="main-form-content">
          {/* Step Indicator */}
          <div className="step-indicator">
            <div className="step active">
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
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-label">Payment</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div className="form-section">
              <h2 className="section-title">Personal Detail</h2>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Nathaniel"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Salvoro"
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yahoo@gmail.com"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+63 900 000 0000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="form-section">
              <h2 className="section-title">Event Detail</h2>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Cebu Metropolitan Cathedral"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="eventDate">Event Date</label>
                  <DatePickerWithRestriction
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group full-width">
                  <label htmlFor="note">Add a note</label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Add a note"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="form-actions">
              <button type="submit" className="next-button">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default InputDetailsPage;

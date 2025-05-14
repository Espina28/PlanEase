import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/selectservice-page.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BookingSidePanel from '../Components/Booking-sidepanel';
import { getActiveTab, getSelectedServices, getSelectedPackage, saveServicesData } from '../utils/bookingStorage';

const SelectServicePage = () => {
  const navigate = useNavigate();
  // Initialize from bookingStorage
  const [activeTab, setActiveTab] = useState(getActiveTab);
  const [selectedServices, setSelectedServices] = useState(getSelectedServices);
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(getSelectedPackage);
  
  // Save data when it changes
  useEffect(() => {
    saveServicesData({
      activeTab,
      selectedServices,
      selectedPackage
    });
  }, [activeTab, selectedServices, selectedPackage]);

  // Services list for custom option
  const services = [
    { id: 'catering', name: 'Catering', icon: '🍽️' },
    { id: 'hosting', name: 'Hosting', icon: '🎤' },
    { id: 'photographer', name: 'Photographer', icon: '📷' },
    { id: 'band', name: 'Band', icon: '🎸' }
  ];

  // Packages list
  const packages = [
    { 
      id: 'cherry-blossom', 
      name: 'Cherry Blossom Package', 
      price: '₱300,000',
      icon: '🌸',
      description: 'Includes catering, venue, and basic photography.'
    },
    { 
      id: 'tulip', 
      name: 'Tulip Package', 
      price: '₱450,000',
      icon: '🌷',
      description: 'Includes premium catering, venue, photography, and band.'
    },
    { 
      id: 'rose', 
      name: 'Rose Package', 
      price: '₱350,000',
      icon: '🌹',
      description: 'Includes catering, venue, photography, and hosting.'
    }
  ];

  // Handle service checkbox change
  const handleServiceChange = (serviceId) => {
    setSelectedServices({
      ...selectedServices,
      [serviceId]: !selectedServices[serviceId]
    });
  };

  // Handle package selection
  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  // Handle package expand/collapse
  const handleExpandPackage = (packageId) => {
    if (expandedPackage === packageId) {
      setExpandedPackage(null);
    } else {
      setExpandedPackage(packageId);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // If switching to package tab, clear selected services
    if (tab === 'package') {
      setSelectedServices({
        catering: false,
        hosting: false,
        photographer: false,
        band: false
      });
    } 
    // If switching to custom tab, clear selected package
    else if (tab === 'custom') {
      setSelectedPackage(null);
    }
  };

  // Handle next button click
  const handleNext = () => {
    // Save booking services data
    saveServicesData({
      activeTab,
      selectedServices,
      selectedPackage
    });
    
    // Navigate to preview page
    navigate('/book/preview');
  };

  // Handle previous button click
  const handlePrevious = () => {
    navigate('/book/inputdetails');
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
          <BookingSidePanel activeStep="services" />

          {/* Main Content */}
          <div className="main-form-content">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-label">Enter Details</div>
              </div>
              <div className="step-line"></div>
              <div className="step active">
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

            {/* Services Selection */}
            <div className="services-selection">
              <h2 className="section-title">Select Services</h2>

              {/* Tabs */}
              <div className="service-tabs">
                <button 
                  className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
                  onClick={() => handleTabChange('custom')}
                >
                  <span className="tab-check">{activeTab === 'custom' ? '✓' : ''}</span>
                  Custom
                </button>
                <button 
                  className={`tab-button ${activeTab === 'package' ? 'active' : ''}`}
                  onClick={() => handleTabChange('package')}
                >
                  <span className="tab-check">{activeTab === 'package' ? '✓' : ''}</span>
                  Package
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'custom' ? (
                  // Custom Service Options
                  <div className="custom-services">
                    {services.map(service => (
                      <div key={service.id} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <div className="service-name">{service.name}</div>
                        <input 
                          type="checkbox" 
                          id={service.id}
                          checked={selectedServices[service.id]}
                          onChange={() => handleServiceChange(service.id)}
                          className="service-checkbox"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Package Options
                  <div className="package-options">
                    {packages.map(pkg => (
                      <div 
                        key={pkg.id} 
                        className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''}`}
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        <div className="package-icon">{pkg.icon}</div>
                        <div className="package-name">{pkg.name}</div>
                        <div className="package-price">{pkg.price}</div>
                        <button 
                          className="expand-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExpandPackage(pkg.id);
                          }}
                        >
                          {expandedPackage === pkg.id ? '▲' : '▼'}
                        </button>
                        
                        {expandedPackage === pkg.id && (
                          <div className="package-details">
                            <p>{pkg.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button className="previous-button" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="next-button" onClick={handleNext}>
                  Next
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

export default SelectServicePage;

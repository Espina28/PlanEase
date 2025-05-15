/**
 * Utility functions to manage booking data across pages
 * This centralizes all sessionStorage operations for booking data
 */

// Keys for sessionStorage
const FORM_DATA_KEY = 'bookingFormData';
const SERVICES_DATA_KEY = 'bookingServicesData';
const SELECTED_SERVICES_KEY = 'bookingSelectedServices';
const SELECTED_PACKAGE_KEY = 'bookingSelectedPackage';
const ACTIVE_TAB_KEY = 'bookingActiveTab';

/**
 * Save personal details from the input form
 * @param {Object} formData - Personal and event details
 */
export const savePersonalDetails = (formData) => {
  sessionStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
};

/**
 * Get saved personal details
 * @returns {Object} Personal and event details or default empty values
 */
export const getPersonalDetails = () => {
  const formData = sessionStorage.getItem(FORM_DATA_KEY);
  return formData ? JSON.parse(formData) : {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    location: '',
    eventDate: '',
    note: ''
  };
};

/**
 * Save selected services data
 * @param {Object} servicesData - All services related data
 */
export const saveServicesData = (servicesData) => {
  sessionStorage.setItem(SERVICES_DATA_KEY, JSON.stringify(servicesData));
  
  // Also save individual components for easier access
  if (servicesData.activeTab) {
    sessionStorage.setItem(ACTIVE_TAB_KEY, servicesData.activeTab);
  }
  
  if (servicesData.selectedServices) {
    sessionStorage.setItem(SELECTED_SERVICES_KEY, JSON.stringify(servicesData.selectedServices));
  }
  
  if (servicesData.selectedPackage) {
    sessionStorage.setItem(SELECTED_PACKAGE_KEY, servicesData.selectedPackage);
  } else {
    sessionStorage.removeItem(SELECTED_PACKAGE_KEY);
  }
};

/**
 * Get active service tab
 * @returns {string} Active tab ('custom' or 'package')
 */
export const getActiveTab = () => {
  return sessionStorage.getItem(ACTIVE_TAB_KEY) || 'custom';
};

/**
 * Get selected services
 * @returns {Object} Selected services object
 */
export const getSelectedServices = () => {
  const services = sessionStorage.getItem(SELECTED_SERVICES_KEY);
  return services ? JSON.parse(services) : {
    catering: false,
    hosting: false,
    photographer: false,
    band: false
  };
};

/**
 * Get selected package
 * @returns {string|null} Selected package ID or null
 */
export const getSelectedPackage = () => {
  return sessionStorage.getItem(SELECTED_PACKAGE_KEY) || null;
};

/**
 * Get complete booking data
 * Combines all data from different booking steps
 * @returns {Object} Combined booking data
 */
export const getCompleteBookingData = () => {
  const formData = getPersonalDetails();
  const selectedServices = getSelectedServices();
  const selectedPackage = getSelectedPackage();
  const activeTab = getActiveTab();
  
  return {
    personalInfo: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      contact: formData.contact || ''
    },
    eventDetails: {
      location: formData.location || '',
      eventDate: formData.eventDate || '',
      note: formData.note || ''
    },
    selectedServices: {
      custom: selectedServices,
      package: selectedPackage
    },
    activeTab: activeTab
  };
};

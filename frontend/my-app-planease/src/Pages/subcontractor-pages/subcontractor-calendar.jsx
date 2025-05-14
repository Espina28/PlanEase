import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../../Components/Navbar';
import NavPanel from "../../Components/subcon-navpanel";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const localizer = momentLocalizer(moment);

const SubcontractorCalendar = () => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [savedStatus, setSavedStatus] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    date: null
  });

  // Function to handle date selection
  const handleDateSelect = ({ start }) => {
    // Convert to start of day to ensure consistent date comparison
    const selectedDate = new Date(start);
    selectedDate.setHours(0, 0, 0, 0);
    
    // Check if the date is already in the unavailable dates
    const dateExists = unavailableDates.some(date => {
      const existingDate = new Date(date.start);
      existingDate.setHours(0, 0, 0, 0);
      return existingDate.getTime() === selectedDate.getTime();
    });

    if (dateExists) {
      // Remove the date if it's already selected
      setUnavailableDates(unavailableDates.filter(date => {
        const existingDate = new Date(date.start);
        existingDate.setHours(0, 0, 0, 0);
        return existingDate.getTime() !== selectedDate.getTime();
      }));
      // Clear any previous saved status
      setSavedStatus('');
    } else {
      // Show confirmation dialog before adding the date
      setConfirmDialog({
        open: true,
        date: selectedDate
      });
    }
  };
  
  // Function to handle navigation between months/years
  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };
  
  // Function to confirm unavailability
  const handleConfirmUnavailability = () => {
    const selectedDate = confirmDialog.date;
    
    // Add the date as unavailable
    setUnavailableDates([
      ...unavailableDates,
      {
        start: selectedDate,
        end: selectedDate,
        title: 'Unavailable',
        allDay: true
      }
    ]);
    
    // Close the dialog
    setConfirmDialog({
      open: false,
      date: null
    });
    
    // Clear any previous saved status
    setSavedStatus('');
  };
  
  // Function to cancel unavailability
  const handleCancelUnavailability = () => {
    setConfirmDialog({
      open: false,
      date: null
    });
  };

  // Custom event styling to make unavailable dates red
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#FF5252',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        textAlign: 'center'
      }
    };
  };

  // Function to save unavailable dates to backend
  const saveUnavailableDates = () => {
    // Here you would typically make an API call to save the dates
    // For now, we'll just simulate a successful save
    console.log('Saving unavailable dates:', unavailableDates);
    setSavedStatus('Unavailable dates saved successfully!');
    
    // TODO: Add actual API call to save dates to your backend
    // Example:
    // fetch('/api/subcontractor/unavailable-dates', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ dates: unavailableDates }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setSavedStatus('Unavailable dates saved successfully!');
    // })
    // .catch(error => {
    //   setSavedStatus('Error saving dates. Please try again.');
    // });
  };

  return (
    <>
      <Navbar />
      <div className="h-screen grid grid-rows-[auto_1fr]">
        <div className="grid lg:grid-cols-[1fr_3fr]">
          <div className="shadow hidden lg:block p-5">
            <NavPanel />
          </div>
          <div className="flex flex-col rounded-lg gap-4 bg-gray-100 md:px-10 md:py-10">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Availability Calendar</h1>
              <p className="text-gray-600 mb-4">
                Click on dates when you are <span className="font-semibold text-red-500">not available</span> to work. 
                Click again to remove the selection.
              </p>
              
              {savedStatus && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                  {savedStatus}
                </div>
              )}
              
              <div className="mb-6" style={{ height: 600 }}>
                <Calendar
                  localizer={localizer}
                  events={unavailableDates}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleDateSelect}
                  onNavigate={handleNavigate}
                  eventPropGetter={eventStyleGetter}
                  views={[Views.MONTH]}
                  view={Views.MONTH}
                  date={currentDate}
                  style={{ height: '100%' }}
                />
              </div>
              
              {/* Confirmation Dialog */}
              <Dialog
                open={confirmDialog.open}
                onClose={handleCancelUnavailability}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Confirm Unavailability
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you're not available on this date {confirmDialog.date ? moment(confirmDialog.date).format('MMMM D, YYYY') : ''}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancelUnavailability} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmUnavailability} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              
              <div className="flex justify-end">
                <button 
                  onClick={saveUnavailableDates}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                >
                  Save Unavailable Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubcontractorCalendar;
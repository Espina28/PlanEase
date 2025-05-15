import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import NavPanel from "../../Components/subcon-navpanel";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterListIcon from "@mui/icons-material/FilterList";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function SubcontractorBookings() {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const filterRef = useRef(null);
  const bookingsPerPage = 10;
  
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);
  
  // Define loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load transaction data from backend on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/transactions/getAllTransactions', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Map the transaction data to the format expected by the component
        const formattedBookings = response.data.map(transaction => {
          // Now we can use the event data directly from TransactionDTO
          const eventName = transaction.eventName || 'Event Name Unavailable';
          
          // Format the date - assuming transaction.date is in format like "2025-05-15"
          const date = new Date(transaction.date);
          const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          // Map status values (adjust according to your data)
          let displayStatus = "Pending";
          if (transaction.status === "SUCCESS") displayStatus = "Success";
          if (transaction.status === "CANCELLED") displayStatus = "Cancelled";
          
          // Format price with peso sign
          const formattedPrice = transaction.eventPrice ? 
            `₱${transaction.eventPrice.toLocaleString()}` : 
            '₱50,000'; // Default price if not available
          
          // For debugging
          console.log('Transaction with event details:', transaction);
          
          return {
            id: transaction.transactionId,
            name: eventName,
            eventDate: formattedDate,
            amount: formattedPrice,
            status: displayStatus,
            // Store additional data if needed for the detail view
            eventDescription: transaction.eventDescription,
            venue: transaction.venue
          };
        });
        
        setBookings(formattedBookings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
        
        // Fallback to empty array or mock data if needed
        setBookings([]);
      }
    };
    
    fetchTransactions();
  }, []);
  
  // Close filter menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);
  
  // Filter bookings based on search term and status filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.eventDate.toLowerCase().includes(search.toLowerCase()) ||
      booking.status.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatusFilter = statusFilter === "All" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatusFilter;
  });
  
  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Static pagination display logic
  const getVisiblePageNumbers = () => {
    // Always show 5 page numbers if possible
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    
    return visiblePages;
  };

  // Function to get status chip color
  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return { bgcolor: '#d1f5d3', color: '#00a811' };
      case 'cancelled':
        return { bgcolor: '#ffd1d1', color: '#ff0000' };
      case 'pending':
        return { bgcolor: '#fff2d1', color: '#ffa500' };
      default:
        return { bgcolor: '#e0e0e0', color: '#000000' };
    }
  };
  
  // Mock data for the modal
  const getSelectedRowDetails = (row) => {
    return {
      ...row,
      email: `${row.name.split(' ')[0].toLowerCase()}@example.com`,
      contact: `+63 900 000 ${String(row.id).padStart(4, "0")}`,
      place: `Venue ${row.id}`,
      range: row.eventDate,
      note: `Note for event with ${row.name} scheduled on ${row.eventDate}.`
    };
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid lg:grid-cols-[1fr_3fr]">
        <div className="shadow hidden lg:block p-5">
          <NavPanel />
        </div>
        <div className="flex flex-col direct rounded-lg gap-4 bg-gray-100 md:px-10 md:py-10">
          {/* Header with Search and Filter */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Booking History</h1>
            <div className="flex items-center gap-2">
              <div ref={filterRef} className="relative">
                <Button 
                  variant="outlined" 
                  endIcon={<FilterListIcon />}
                  size="small"
                  sx={{ borderRadius: '4px' }}
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                >
                  {statusFilter === "All" ? "Filter" : statusFilter}
                </Button>
                {filterMenuOpen && (
                  <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg py-1 w-36 border border-gray-200">
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === "All" ? "font-bold text-blue-600" : ""}`}
                      onClick={() => {
                        setStatusFilter("All");
                        setFilterMenuOpen(false);
                      }}
                    >
                      All
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === "Success" ? "font-bold text-blue-600" : ""}`}
                      onClick={() => {
                        setStatusFilter("Success");
                        setFilterMenuOpen(false);
                      }}
                    >
                      Success
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === "Cancelled" ? "font-bold text-blue-600" : ""}`}
                      onClick={() => {
                        setStatusFilter("Cancelled");
                        setFilterMenuOpen(false);
                      }}
                    >
                      Cancelled
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === "Pending" ? "font-bold text-blue-600" : ""}`}
                      onClick={() => {
                        setStatusFilter("Pending");
                        setFilterMenuOpen(false);
                      }}
                    >
                      Pending
                    </button>
                  </div>
                )}
              </div>
              <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: 250, borderRadius: '4px', pl: 1 }}
              >
                <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                <input
                  className="flex-1 border-none outline-none py-2"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Paper>
            </div>
          </div>

          {/* Booking Table */}
          <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: '8px' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Event Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    hover 
                    onClick={() => handleOpen(getSelectedRowDetails(booking))}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.eventDate}</TableCell>
                    <TableCell>{booking.amount}</TableCell>
                    <TableCell>
                      <Chip 
                        label={booking.status} 
                        size="small"
                        sx={{ 
                          backgroundColor: getStatusChipColor(booking.status).bgcolor,
                          color: getStatusChipColor(booking.status).color,
                          fontWeight: 500,
                          borderRadius: '16px',
                          minWidth: '80px'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Pagination */}
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center justify-between w-72">
              {/* Left arrow - always visible */}
              <IconButton 
                disabled={currentPage === 1} 
                onClick={handlePrevPage}
                size="small"
                sx={{ visibility: currentPage === 1 ? 'hidden' : 'visible', width: '30px', height: '30px' }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              
              <div className="flex items-center justify-center flex-1">
                {/* First page button if not in first few pages */}
                {currentPage > 3 && (
                  <>
                    <Button 
                      variant={currentPage === 1 ? "contained" : "text"}
                      size="small"
                      onClick={() => setCurrentPage(1)}
                      sx={{ 
                        minWidth: '30px', 
                        height: '30px',
                        borderRadius: '4px',
                        backgroundColor: currentPage === 1 ? '#1976d2' : 'transparent',
                        color: currentPage === 1 ? 'white' : 'inherit'
                      }}
                    >
                      1
                    </Button>
                    {currentPage > 4 && (
                      <span className="text-gray-500 mx-1">...</span>
                    )}
                  </>
                )}
                
                {/* Visible page numbers */}
                {getVisiblePageNumbers().map(number => (
                  <Button 
                    key={number}
                    variant={currentPage === number ? "contained" : "text"}
                    size="small"
                    onClick={() => setCurrentPage(number)}
                    sx={{ 
                      minWidth: '30px', 
                      height: '30px',
                      borderRadius: '4px',
                      backgroundColor: currentPage === number ? '#1976d2' : 'transparent',
                      color: currentPage === number ? 'white' : 'inherit',
                      mx: 0.5
                    }}
                  >
                    {number}
                  </Button>
                ))}
                
                {/* Last page button if not in last few pages */}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="text-gray-500 mx-1">...</span>
                    )}
                    <Button 
                      variant={currentPage === totalPages ? "contained" : "text"}
                      size="small"
                      onClick={() => setCurrentPage(totalPages)}
                      sx={{ 
                        minWidth: '30px', 
                        height: '30px',
                        borderRadius: '4px',
                        backgroundColor: currentPage === totalPages ? '#1976d2' : 'transparent',
                        color: currentPage === totalPages ? 'white' : 'inherit'
                      }}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              {/* Right arrow - always visible */}
              <IconButton 
                disabled={currentPage === totalPages} 
                onClick={handleNextPage}
                size="small"
                sx={{ visibility: currentPage === totalPages ? 'hidden' : 'visible', width: '30px', height: '30px' }}
              >
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 650,
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    }}
  >
    {selectedRow && (
      <>
        <Typography id="modal-title" variant="h6" fontWeight="bold" gutterBottom>
          Event Details
        </Typography>

        {/* PERSONAL DETAIL */}
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#2196f3' }}>
          Personal Detail
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              value={selectedRow.name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={selectedRow.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact"
              value={selectedRow.contact}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        {/* EVENT DETAIL */}
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 600, color: '#2196f3' }}>
          Event Detail
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Location"
              value={selectedRow.place}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date"
              value={selectedRow.range}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Note"
          margin="normal"
          multiline
          rows={3}
          value={selectedRow.note}
          InputProps={{ readOnly: true }}
        />

        <Box mt={3} textAlign="right">
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
        </Box>
      </>
    )}
  </Box>
</Modal>

    </div>
  );
}

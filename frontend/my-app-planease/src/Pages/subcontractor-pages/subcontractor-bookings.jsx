import React, { useState } from "react";
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
  FormControl
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'eventDate', headerName: 'Event Date', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const value = params.value;
        let color = value === 'Success' ? 'green' : value === 'Cancelled' ? 'red' : 'black';
        return <span style={{ color, fontWeight: 'bold' }}>{value}</span>;
      }
    }
  ];

  const row = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Customer ${index + 1}`,
    eventDate: `March ${index + 1} 2025`,
    amount: `₱${(50 + index) * 1000}`,
    status: index % 2 === 0 ? "Success" : "Cancelled",
    email: `customer${index + 1}@gmail.com`,
    contact: `+63 900 000 ${String(index).padStart(4, "0")}`,
    place: `Venue ${index + 1}`,
    range: `09/${String(index + 1).padStart(2, "0")}/2021 - 09/${String(index + 1).padStart(2, "0")}/2021`,
    note: `Note for event ${index + 1}`
  }));

  const filteredRows = row.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid lg:grid-cols-[1fr_3fr]">
        <div className="shadow hidden lg:block p-5">
          <NavPanel />
        </div>
        <div className="flex flex-col direct rounded-lg gap-4 bg-gray-100 md:px-10 md:py-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Booking History</h1>
            <TextField
              label="Search"
              size="small"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <DataGrid
                columns={columns}
                rows={filteredRows}
                pagination
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                }}
                onRowClick={(params) => handleOpen(params.row)}
              />
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

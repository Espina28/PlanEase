import {useMemo} from "react";
import Navbar from "../../Components/Navbar";
import NavPanel from "../../Components/subcon-navpanel";
import { useMovieData } from '@mui/x-data-grid-generator';
import { Box, styled } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function SubcontractorBookings() {
    
    const columns = [
        { field: 'name', headerName: 'Name', minWidth: 50, flex: 1 },
        { field: 'eventDate', headerName: 'Event Date', minWidth: 50, flex: 1 },
        { field: 'amount', headerName: 'Amount', minWidth: 50, flex: 1 },
        {
          field: 'status',
          headerName: 'Status',
          minWidth: 50,
          flex: 1,
          renderCell: (params) => {
            const value = params.value;
            let color = '';
      
            if (value === 'Success') {
              color = 'green';
            } else if (value === 'Cancelled') {
              color = 'red';
            }
      
            return (
              <span style={{ color, fontWeight: 'bold' }}>
                {value}
              </span>
            );
          }
        }
      ];
    
    const data = [
        {
          "id": 1,
          "name": "Nathaniel Salboro",
          "eventDate": "January 21 2025",
          "amount": "₱50,000",
          "status": "Success"
        },
        {
          "id": 2,
          "name": "James Bonding",
          "eventDate": "January 29 2025",
          "amount": "₱50,000",
          "status": "Cancelled"
        },
        {
          "id": 3,
          "name": "Maria Gonzales",
          "eventDate": "February 10 2025",
          "amount": "₱75,000",
          "status": "Success"
        },
        {
          "id": 4,
          "name": "Liam Cruz",
          "eventDate": "February 18 2025",
          "amount": "₱60,000",
          "status": "Cancelled"
        },
        {
          "id": 5,
          "name": "Isabella Reyes",
          "eventDate": "March 5 2025",
          "amount": "₱90,000",
          "status": "Success"
        }
      ];

      const StyledGridOverlay = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .no-rows-primary': {
          fill: '#3D4751',
          ...theme.applyStyles('light', {
            fill: '#AEB8C2',
          }),
        },
        '& .no-rows-secondary': {
          fill: '#1D2126',
          ...theme.applyStyles('light', {
            fill: '#E8EAED',
          }),
        },
      }));

      // Custom No Rows Overlay
      function CustomNoRowsOverlay() {
        return (
          <StyledGridOverlay>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={96}
              viewBox="0 0 452 257"
              aria-hidden
              focusable="false"
            >
              <path
                className="no-rows-primary"
                d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
              />
              <path
                className="no-rows-primary"
                d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
              />
              <path
                className="no-rows-primary"
                d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
              />
              <path
                className="no-rows-secondary"
                d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
              />
            </svg>
            <Box sx={{ mt: 2 }}>No Transactions Found</Box>
          </StyledGridOverlay>
        );
      }

    return (
        <div className="h-screen grid grid-rows-[auto_1fr]">
            {/* Navbar at the top */}
            <Navbar />
            {/* Two sections below the navbar */}
            <div className="grid lg:grid-cols-[1fr_3fr]">
                <div className="shadow hidden lg:block p-5">
                    <NavPanel />
                </div>
                <div className=" flex flex-col direct rounded-lg gap-4 bg-gray-100 md:px-10 md:py-10">
                   <div className="">
                        <h1>Booking History</h1>
                   </div>
                   {/* Booking History Section */}
                   <div className="overflow-x-auto">
                        <div className="min-w-[700px]">
                            <DataGrid
                            rows={data || []}
                            columns={columns}
                            pagination={false}
                            hideFooter={true}
                            autoHeight
                            slotProps={{
                                toolbar: {
                                showQuickFilter: true,
                                },
                            }}
                            sx={{
                                border: 0,
                                '& .MuiDataGrid-cell': { fontSize: '1rem' },
                                '& .MuiDataGrid-columnHeaders': { fontSize: '1rem' },
                                '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer',
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                            />
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );}
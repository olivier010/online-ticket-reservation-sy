import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UserNav from '../../components/navbar/UserNav';

function Booking({ tickets }) {
  const [filterText, setFilterText] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // State for view dialog

  const handleBuyTicket = (ticketId) => {
    const purchasedTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (purchasedTicket) {
      const purchasedTickets = JSON.parse(localStorage.getItem('purchasedTickets')) || [];
      localStorage.setItem('purchasedTickets', JSON.stringify([...purchasedTickets, purchasedTicket]));
      alert(`Ticket with ID ${ticketId} has been purchased!`);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedTicket(null);
  };

  // Filter tickets to show only "Open" tickets
  const openTickets = tickets.filter(
    (ticket) =>
      ticket.status === 'Open' &&
      (ticket.name.toLowerCase().includes(filterText.toLowerCase()) ||
        ticket.email.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Event Name', width: 200 },
    { field: 'email', headerName: 'Event Location', width: 250 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'time', headerName: 'Event Time', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleBuyTicket(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => handleViewTicket(params.row)}
          >
            View
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <UserNav />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Available Tickets
        </Typography>
        <Typography>Search and book tickets from the available list below.</Typography>
        <Box sx={{ marginTop: 2 }}>
          <input
            type="text"
            placeholder="Search tickets..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ padding: '8px', width: '100%', marginBottom: '16px' }}
          />
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={openTickets}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
            />
          </div>
        </Box>
      </Box>

      {/* View Ticket Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Ticket Details</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <DialogContentText>
              <strong>ID:</strong> {selectedTicket.id} <br />
              <strong>Name:</strong> {selectedTicket.name} <br />
              <strong>Location:</strong> {selectedTicket.email} <br />
              <strong>Price:</strong> {selectedTicket.price} <br />
              <strong>Event Time:</strong> {selectedTicket.time || 'Not Set'} <br />
              <strong>Status:</strong> {selectedTicket.status}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Booking;
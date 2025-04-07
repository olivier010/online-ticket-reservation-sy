import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const TicketTable = ({ tickets, onDelete }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const handleView = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleDelete = (ticketId) => {
    setDeleteDialogOpen(true);
    setSelectedTicket(ticketId);
  };

  const confirmDelete = () => {
    onDelete(selectedTicket);
    setDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(filterText.toLowerCase()) ||
      ticket.email.toLowerCase().includes(filterText.toLowerCase()) ||
      ticket.status.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, sortable: true },
    { field: 'name', headerName: 'Name', width: 200, sortable: true },
    { field: 'email', headerName: 'Email', width: 250, sortable: true },
    { field: 'status', headerName: 'Status', width: 150, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleView(params.row)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DataGrid
        rows={filteredTickets}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        sortingOrder={['asc', 'desc']}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ticket? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Ticket Details */}
      {selectedTicket && selectedTicket.name && (
        <Dialog
          open={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        >
          <DialogTitle>Ticket Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>ID:</strong> {selectedTicket.id} <br />
              <strong>Name:</strong> {selectedTicket.name} <br />
              <strong>Email:</strong> {selectedTicket.email} <br />
              <strong>Status:</strong> {selectedTicket.status}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedTicket(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TicketTable;

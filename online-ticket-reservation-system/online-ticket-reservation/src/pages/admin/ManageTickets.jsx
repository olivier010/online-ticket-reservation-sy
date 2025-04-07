import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import AdminNav from '../../components/navbar/AdminNav';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ManageTickets({ tickets, setTickets }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bookDialogOpen, setBookDialogOpen] = useState(false); // State for booking dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State for edit dialog
  const [editTicket, setEditTicket] = useState(null); // State for the ticket being edited
  const [filterText, setFilterText] = useState('');
  const [newTicket, setNewTicket] = useState({ name: '', email: '', status: '', price: '' }); // Added price field
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '' }); // State for booking form

  const handleView = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleDelete = (ticketId) => {
    setDeleteDialogOpen(true);
    setSelectedTicket(ticketId);
  };

  const confirmDelete = () => {
    setTickets(tickets.filter((ticket) => ticket.id !== selectedTicket)); // Update tickets via setTickets
    setDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const handleAdd = () => {
    const newId = tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1; // Generate a new ID
    const ticketToAdd = { id: newId, ...newTicket };
    setTickets([...tickets, ticketToAdd]); // Update tickets via setTickets
    setAddDialogOpen(false);
    setNewTicket({ name: '', email: '', status: '', price: '' }); // Reset form
  };

  const handleBook = () => {
    console.log('Booking confirmed:', bookingDetails);
    setBookDialogOpen(false);
    setBookingDetails({ name: '', email: '' });
  };

  const handleCloseTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'Closed' } : ticket
      )
    );
  };

  const handleReopenTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'Open' } : ticket
      )
    );
  };

  const handleApproveTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'Open' } : ticket // Change status to "Open"
      )
    );
  };

  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setEditDialogOpen(true);
  };

  const confirmEdit = () => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === editTicket.id ? editTicket : ticket
      )
    );
    setEditDialogOpen(false);
    setEditTicket(null);
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
    { field: 'price', headerName: 'Price', width: 150, sortable: true }, // Added price column
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
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
            style={{ marginRight: 8 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          {params.row.status === 'Open' && (
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => handleCloseTicket(params.row.id)}
              style={{ marginRight: 8 }}
            >
              Close
            </Button>
          )}
          {params.row.status === 'Pending' && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleReopenTicket(params.row.id)}
              style={{ marginRight: 8 }}
            >
              Reopen
            </Button>
          )}
          {params.row.status === 'In Progress' && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleApproveTicket(params.row.id)}
            >
              Approve
            </Button>
          )}
        </>
      ),
    },
  ];

  const analyticsData = [
    { name: 'Open', count: tickets.filter((t) => t.status === 'Open').length },
    { name: 'Closed', count: tickets.filter((t) => t.status === 'Closed').length },
    { name: 'In Progress', count: tickets.filter((t) => t.status === 'In Progress').length },
  ];

  return (
    <>
      <AdminNav />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage Tickets Page
        </Typography>
        <Typography>Here you can view, assign, and track tickets.</Typography>
        <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
          Add Ticket
        </Button>
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
        </div>
      </Box>

      {/* Analytics Section */}
      <Box sx={{ padding: 4,marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Ticket Booking Analytics
        </Typography>
        <BarChart width={600} height={300} data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </Box>

      {/* Add Ticket Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Ticket</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newTicket.name}
            onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newTicket.email}
            onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={newTicket.status}
            onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" disabled>
             Status
            </option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </TextField>
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={newTicket.price}
            onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Ticket Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Ticket</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={editTicket?.name || ''}
            onChange={(e) =>
              setEditTicket({ ...editTicket, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editTicket?.email || ''}
            onChange={(e) =>
              setEditTicket({ ...editTicket, email: e.target.value })
            }
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={editTicket?.status || ''}
            onChange={(e) =>
              setEditTicket({ ...editTicket, status: e.target.value })
            }
            SelectProps={{
              native: true,
            }}
          >
            <option value="" disabled>
              Status
            </option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </TextField>
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={editTicket?.price || ''}
            onChange={(e) =>
              setEditTicket({ ...editTicket, price: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Book Ticket Dialog */}
      <Dialog open={bookDialogOpen} onClose={() => setBookDialogOpen(false)}>
        <DialogTitle>Book Ticket</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={bookingDetails.name}
            onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={bookingDetails.email}
            onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBook} color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
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
        <Dialog open={!!selectedTicket} onClose={() => setSelectedTicket(null)}>
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
    </>
  );
}

export default ManageTickets;
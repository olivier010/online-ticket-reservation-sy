import React, { useState } from 'react';
import AdminNav from '../../components/navbar/AdminNav';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const ManageUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456', registeredDate: '2025-04-01', picture: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'abcdef', registeredDate: '2025-04-02', picture: '' },
  ]); // Initial static data
  const [open, setOpen] = useState(false); // State for create dialog
  const [viewOpen, setViewOpen] = useState(false); // State for view dialog
  const [updateOpen, setUpdateOpen] = useState(false); // State for update dialog
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', picture: '' }); // State for new user form
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user (view/update)

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id)); // Remove user from the list
  };

  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user for viewing
    setViewOpen(true); // Open the view dialog
  };

  const handleCloseViewDialog = () => {
    setViewOpen(false); // Close the view dialog
    setSelectedUser(null); // Reset the selected user
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewUser({ name: '', email: '', password: '', picture: '' }); // Reset form
  };

  const handleCreateUser = () => {
    const createdUser = {
      id: users.length + 1, // Generate a new ID based on the current length of the users array
      ...newUser,
      registeredDate: new Date().toISOString().split('T')[0], // Add a registered date
    };

    setUsers([...users, createdUser]); // Add the new user to the table
    handleCloseDialog(); // Close the dialog box
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewUser({ ...newUser, picture: reader.result }); // Save the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenUpdateDialog = (user) => {
    setSelectedUser(user);
    setUpdateOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...selectedUser } : user
      )
    );
    handleCloseUpdateDialog();
  };

  return (
    <>
      <AdminNav />
      <div style={{ margin: 20 }}>
        <h2>Registered Users</h2>
        <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginBottom: 10 }}>
          Create New User
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Picture</TableCell>
                <TableCell>Registered Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    {user.picture ? (
                      <img src={user.picture} alt="User" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                    ) : (
                      'No Picture'
                    )}
                  </TableCell>
                  <TableCell>{user.registeredDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleView(user)}
                      style={{ marginRight: 5 }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                      style={{ marginRight: 5 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleOpenUpdateDialog(user)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Dialog for viewing user details */}
      <Dialog open={viewOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Password:</strong> {selectedUser.password}</p>
              <p><strong>Registered Date:</strong> {selectedUser.registeredDate}</p>
              {selectedUser.picture && (
                <img
                  src={selectedUser.picture}
                  alt="User"
                  style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 10 }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for creating a new user */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for updating user details */}
      <Dialog open={updateOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setSelectedUser({ ...selectedUser, picture: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ marginTop: 10 }}
              />
              {selectedUser.picture && (
                <img
                  src={selectedUser.picture}
                  alt="User"
                  style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 10 }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageUser;
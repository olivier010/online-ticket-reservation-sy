import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tooltip,
  Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { UserContext } from '../../contexts/UserContext';

export default function ManageUsers() {
  const { allUsers, updateUser, deleteUser, currentUser } = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);

  const handleAddUser = () => {
    setCurrentEditUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user'
    });
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setCurrentEditUser({ ...user });
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId) => {
    if (currentUser?.id === userId) {
      setError('You cannot delete your own account while logged in');
      return;
    }
    deleteUser(userId);
  };

  const handleSubmit = () => {
    try {
      if (isEditMode) {
        // Update existing user
        updateUser(currentEditUser.id, currentEditUser);
      } else {
        // Create new user - will be handled via register in context
        const newUser = {
          ...currentEditUser,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        updateUser(newUser.id, newUser); // Using updateUser to add new user
      }
      setOpenDialog(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">User Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditUser(user)}>
                      <Edit color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={currentUser?.id === user.id}
                    >
                      <Delete color={currentUser?.id === user.id ? "disabled" : "error"} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {isEditMode ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="firstName"
              label="First Name"
              value={currentEditUser?.firstName || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={currentEditUser?.lastName || ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={currentEditUser?.email || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            {!isEditMode && (
              <TextField
                name="password"
                label="Password"
                type="password"
                value={currentEditUser?.password || ''}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ minLength: 6 }}
                helperText="Minimum 6 characters"
              />
            )}
            <TextField
              select
              name="role"
              label="Role"
              value={currentEditUser?.role || 'user'}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
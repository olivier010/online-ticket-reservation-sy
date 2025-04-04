import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, allUsers } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData(e.target);
      const email = data.get('email').trim().toLowerCase();
      const userData = {
        firstName: data.get('firstName').trim(),
        lastName: data.get('lastName').trim(),
        email,
        password: data.get('password'),
      };

      // Validation
      if (!userData.firstName || !userData.email || !userData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if email already exists
      const emailExists = allUsers.some(user => user.email.toLowerCase() === email);
      if (emailExists) {
        throw new Error('Email already registered');
      }

      // Register user
      await register(userData);
      
      // Redirect to login
      navigate('/guests/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Account
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          margin="normal"
          required
          disabled={isSubmitting}
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="normal"
          disabled={isSubmitting}
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          margin="normal"
          required
          disabled={isSubmitting}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          required
          disabled={isSubmitting}
          inputProps={{ minLength: 6, maxLength: 100 }}
          helperText="Minimum 6 characters"
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </Box>
  );
}
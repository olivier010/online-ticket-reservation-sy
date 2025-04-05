import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, login, allUsers } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData(e.target);
      const email = data.get('email').trim().toLowerCase();
      const password = data.get('password');
      const firstName = data.get('firstName').trim();
      const lastName = data.get('lastName').trim();

      // Validation
      if (!firstName || !email || !password) {
        throw new Error('Please fill in all required fields');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check for existing email
      if (allUsers.some(user => user.email.toLowerCase() === email)) {
        throw new Error('Email already registered');
      }

      // Register and auto-login
      const newUser = await register({
        firstName,
        lastName,
        email,
        password // Note: Hash this in production
      });

      // Login the newly registered user
      login(newUser);
      
      // Redirect to user dashboard
      navigate('/user/dashboard');

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
          inputProps={{ 
            minLength: 6, 
            maxLength: 100,
            'data-testid': 'password-input' 
          }}
          helperText="Minimum 6 characters"
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ 
            mt: 3,
            py: 1.5,
            fontSize: '1rem'
          }}
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
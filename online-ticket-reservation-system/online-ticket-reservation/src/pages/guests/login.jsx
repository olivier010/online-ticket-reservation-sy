import { TextField, Button, Box, Typography, Alert, CircularProgress, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, authenticate } = useContext(UserContext); // Using context's authenticate
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      const user = authenticate(email, password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      login(user);
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome Back
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          margin="normal"
          required
          disabled={isSubmitting}
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          autoComplete="email"
        />
        
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          required
          disabled={isSubmitting}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          inputProps={{ minLength: 6 }}
        />

        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>

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
            'Sign In'
          )}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" fontWeight="bold">
              Sign up
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
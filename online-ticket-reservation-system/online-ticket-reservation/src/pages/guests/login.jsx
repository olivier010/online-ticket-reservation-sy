import { TextField, Button, Box, Typography, Alert, CircularProgress, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authenticate, isLoading, currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in (on mount and when user changes)
  useEffect(() => {
    if (currentUser && !isLoading) {
      const from = location.state?.from?.pathname || 
                 (currentUser.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
     navigate(from, { replace: true });
    }
  }, [currentUser, isLoading, navigate, location]);

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

      const user = await authenticate(email, password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      await login(user);
      
      // The useEffect will handle the redirect when currentUser updates
      // So we don't need to navigate here anymore

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner if checking auth state or after successful login before redirect
  if (isLoading || (isSubmitting && !error)) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: 400, 
      mx: 'auto', 
      mt: 4,
      p: 3,
      boxShadow: 3,
      borderRadius: 2
    }}>
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
          autoFocus
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
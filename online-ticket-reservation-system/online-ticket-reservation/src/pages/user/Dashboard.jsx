import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">Welcome to Your Dashboard</Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }}
        onClick={() => navigate('/user/book-ticket')}
      >
        Book Ticket
      </Button>
    </Box>
  );
}
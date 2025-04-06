import { Box, Typography } from '@mui/material';
import AdminNav from '../../components/navbar/AdminNav';

const UserDashboard = () => {
  
  return (
    <>
      <AdminNav />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Welcome to the user Dashboard</Typography>
        
      </Box>
    </>
  )
}

export default UserDashboard

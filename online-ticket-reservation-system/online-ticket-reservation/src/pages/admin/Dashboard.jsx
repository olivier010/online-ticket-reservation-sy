import React from 'react';
import { Box, Typography } from '@mui/material';
import AdminNav from '../../components/navbar/AdminNav';
export default function AdminDashboard() {
  return (
    <>
     <AdminNav />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4">Admin Dashboard for O..N..T</Typography>
        {/* Add admin-specific content here */}
      </Box>
      
    </>
  );
}
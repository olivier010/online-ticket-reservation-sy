import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import AdminNav from '../../components/navbar/AdminNav';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const ticketStats = [
    { name: 'Open', count: 10 },
    { name: 'Closed', count: 15 },
    { name: 'In Progress', count: 5 },
  ];

  const notifications = [
    'New ticket #7890 created by User A.',
    'Ticket #1234 was updated by Admin.',
    'System maintenance scheduled for tomorrow.',
  ];

  const pendingTasks = [
    'Review ticket #5678.',
    'Approve new user registrations.',
    'Generate monthly report.',
  ];

  return (
    <div>
      <AdminNav />
      <Box sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Summary Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">20</Typography>
                <Typography variant="body1">Total Tickets</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">10</Typography>
                <Typography variant="body1">Active Users</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">10</Typography>
                <Typography variant="body1">Pending Approvals</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary" fullWidth>
                Manage Tickets
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="secondary" fullWidth>
                View Users
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="success" fullWidth>
                Generate Reports
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Ticket Statistics */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ticket Statistics
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <BarChart width={600} height={300} data={ticketStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Box>

        {/* Notifications Panel */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {notifications.map((notification, index) => (
              <Typography key={index} variant="body1">
                - {notification}
              </Typography>
            ))}
          </Paper>
        </Box>

        {/* Pending Tasks */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Pending Tasks
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {pendingTasks.map((task, index) => (
              <Typography key={index} variant="body1">
                - {task}
              </Typography>
            ))}
          </Paper>
        </Box>

        {/* Recent Activities */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Recent Activities
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1">- Ticket #1234 was closed by Admin.</Typography>
            <Typography variant="body1">- New user John Doe signed up.</Typography>
            <Typography variant="body1">- Ticket #5678 was marked as "In Progress".</Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;





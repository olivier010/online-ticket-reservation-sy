import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Box, Typography, Paper, Grid } from '@mui/material';
import AdminNav from '../../components/navbar/AdminNav';

const Analytics = () => {
  const ticketData = [
    { name: 'Confirmed', value: 400 },
    { name: 'Pending', value: 300 },
    { name: 'Cancelled', value: 100 },
  ];

  const userData = [
    { name: 'Jan', users: 40 },
    { name: 'Feb', users: 30 },
    { name: 'Mar', users: 60 },
    { name: 'Apr', users: 10 },
  ];

  const resolutionTimes = [
    { name: 'Ticket #1', time: 2 },
    { name: 'Ticket #2', time: 5 },
    { name: 'Ticket #3', time: 3 },
    { name: 'Ticket #4', time: 4 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <>
    <AdminNav />
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        System Analytics
      </Typography>

      <Grid container spacing={4}>
        {/* Ticket Status Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ticket Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* User Growth */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Ticket Resolution Times */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ticket Resolution Times
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Analytics;
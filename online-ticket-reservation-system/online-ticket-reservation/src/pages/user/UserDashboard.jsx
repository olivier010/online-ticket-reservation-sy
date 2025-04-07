import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import UserNav from '../../components/navbar/UserNav';

function UserDashboard({ tickets = [], purchasedTickets = [] }) {
  const [filterText, setFilterText] = useState('');

  const availableTickets = tickets.filter(ticket => ticket.status === 'Open').length;

  const chartData = [
    { name: 'Purchased Tickets', value: purchasedTickets.length },
    { name: 'Available Tickets', value: availableTickets },
  ].filter(data => data.value > 0); // Filter out entries with 0 value

  const COLORS = ['#0088FE', '#00C49F'];

  const handleBuyTicket = (ticketId) => {
    alert(`Ticket with ID ${ticketId} has been purchased!`);
  };

  // Filter tickets to show only "Open" tickets
  const openTickets = tickets.filter(
    (ticket) =>
      ticket.status === 'Open' &&
      (ticket.name.toLowerCase().includes(filterText.toLowerCase()) ||
        ticket.email.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleBuyTicket(params.row.id)}
        >
          Buy
        </Button>
      ),
    },
  ];

  // Prepare data for the histogram
  const histogramData = purchasedTickets.reduce((acc, ticket) => {
    const date = new Date(ticket.date).toLocaleDateString(); // Group by date
    const existingEntry = acc.find(entry => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  return (
    <>
      <UserNav />
      <Box sx={{ padding: 4 }}>
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Ticket Overview
          </Typography>
          <Typography>Visual representation of purchased and available tickets.</Typography>
          {chartData.length > 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          ) : (
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              No data available for the chart.
            </Typography>
          )}
        </Box>
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Ticket History
          </Typography>
          <Typography>View your past activities and ticket history below.</Typography>
          {purchasedTickets.length > 0 ? (
            <>
              <Box sx={{ marginTop: 2 }}>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={purchasedTickets}
                    columns={[
                      { field: 'id', headerName: 'ID', width: 100 },
                      { field: 'name', headerName: 'Name', width: 200 },
                      { field: 'email', headerName: 'Email', width: 250 },
                      { field: 'status', headerName: 'Status', width: 150 },
                      { field: 'date', headerName: 'Date', width: 200 },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                  />
                </div>
              </Box>
              <Box sx={{ marginTop: 10 }}>
                <Typography variant="h6" gutterBottom>
                  Tickets Bought Over Time
                </Typography>
                <BarChart
                  width={600}
                  height={300}
                  data={histogramData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Tickets Bought" />
                </BarChart>
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              No ticket history available.
            </Typography>
          )}
        </Box>
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Tickets Bought Over Time
          </Typography>
          {purchasedTickets.length > 0 ? (
            <Box sx={{ marginTop: 4 }}>
              <BarChart
                width={600}
                height={300}
                data={histogramData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Tickets Bought" />
              </BarChart>
            </Box>
          ) : (
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              No purchased tickets available.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default UserDashboard;

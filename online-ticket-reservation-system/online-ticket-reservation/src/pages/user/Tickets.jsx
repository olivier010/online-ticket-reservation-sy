import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UserNav from '../../components/navbar/UserNav';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Tickets() {
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [histogramData, setHistogramData] = useState([]);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('purchasedTickets')) || [];
    // Ensure dates are properly validated and formatted to display only the date
    const formattedTickets = tickets.map(ticket => ({
      ...ticket,
      date: ticket.date && !isNaN(new Date(ticket.date)) 
        ? new Date(ticket.date).toLocaleDateString() // Display only the date
        : new Date().toLocaleDateString(), // Use current PC date if invalid
    }));
    setPurchasedTickets(formattedTickets);

    // Build histogram data
    const histogram = formattedTickets.reduce((acc, ticket) => {
      const existingEntry = acc.find(entry => entry.date === ticket.date);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date: ticket.date, count: 1 });
      }
      return acc;
    }, []);
    setHistogramData(histogram);
  }, []);

  const handleDelete = (id) => {
    const updatedTickets = purchasedTickets.filter(ticket => ticket.id !== id);
    setPurchasedTickets(updatedTickets);
    localStorage.setItem('purchasedTickets', JSON.stringify(updatedTickets));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="error" 
          size="small" 
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <UserNav />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Purchased Tickets
        </Typography>
        <Typography>Below is the list of tickets you have purchased.</Typography>
        <Box sx={{ marginTop: 2 }}>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={purchasedTickets}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
            />
          </div>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tickets Purchased Over Time
          </Typography>
          {histogramData.length > 0 ? (
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
          ) : (
            <Typography>No data available for the histogram.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Tickets;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNav from './components/navbar/AdminNav';
// ...existing imports...

const App = () => {
    const [role, setRole] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [tickets, setTickets] = useState([
        { id: 1, name: 'Concert A', email: 'user@example.com', status: 'Open', price: 50 },
        { id: 2, name: 'Concert B', email: 'user@example.com', status: 'Open', price: 75 },
    ]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        console.log('Retrieved role from localStorage:', userRole); // Debugging log
        setRole(userRole ? userRole.toLowerCase() : ''); // Convert to lowercase
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const handleBuyTicket = (ticketId) => {
        const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);
        if (ticketIndex !== -1) {
            const purchasedTicket = { ...tickets[ticketIndex], status: 'Purchased', date: new Date().toLocaleString() };
            setHistory([...history, purchasedTicket]);
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        }
    };

    const handleDeleteTicket = (ticketId) => {
        setHistory(history.filter(ticket => ticket.id !== ticketId));
    };

    return (
        <Router>
            <AdminNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} role={role} />
            <Routes>
                <Route
                    path="/user-dashboard"
                    element={<UserDashboard tickets={tickets} purchasedTickets={history} />}
                />
                <Route
                    path="/tickets"
                    element={<Tickets tickets={tickets} onBuyTicket={handleBuyTicket} purchasedTickets={history} onDeleteTicket={handleDeleteTicket} />}
                />
            </Routes>
            <UserDashboard tickets={tickets} purchasedTickets={history} />
            <Tickets tickets={tickets} onBuyTicket={handleBuyTicket} />
        </Router>
    );
};

export default App;

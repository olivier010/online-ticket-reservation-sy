import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        if (!email.trim()) {
            setError('Email is required.');
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (!password.trim()) {
            setError('Password is required.');
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            setLoading(false);
            return;
        }

        if (!role) {
            setError('Role is required.');
            setLoading(false);
            return;
        }

        // Retrieve user credentials from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password &&
                u.role.toLowerCase() === role.toLowerCase()
        );

        if (!user) {
            setError('Invalid email, password, or role.');
            setLoading(false);
            return;
        }

        setError('');
        localStorage.setItem('userRole', user.role.toLowerCase()); // Store the role in lowercase
        localStorage.setItem('isLoggedIn', true); // Store login status

        // Navigate to the page based on the user's role
        if (user.role.toLowerCase() === 'admin') {
            navigate('/Dashboard');
        } else if (user.role.toLowerCase() === 'user') {
            navigate('/UserDashboard');
        }

        setLoading(false); // Stop loading
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>User Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;

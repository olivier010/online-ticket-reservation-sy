import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Ensure this file exists

const Signup = () => {
    // State for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(''); // State for role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate password strength
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Validate name format
    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/; // Only allows letters and spaces
        return nameRegex.test(name);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Name is required.');
            return;
        }

        if (!validateName(name)) {
            setError('Name should only contain letters and spaces.');
            return;
        }

        if (!email.trim()) {
            setError('Email is required.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        if (!confirmPassword) {
            setError('Confirm Password is required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!role) {
            setError('Role is required.');
            return;
        }

        setError('');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ name, email, password, role });
        localStorage.setItem('users', JSON.stringify(users)); // Store user credentials
        navigate('/login'); // Ensure '/login' route exists
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Create an Account</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        <option value="Parent">Parent</option>
                        <option value="Caregiver">Caregiver</option>
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;

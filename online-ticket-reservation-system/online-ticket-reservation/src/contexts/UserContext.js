import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usersDB, setUsersDB] = useState(() => {
    // Initialize with admin user if no users exist
    const defaultUsers = [{
      id: "1",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      createdAt: new Date().toISOString()
    }];
    
    try {
      const storedUsers = localStorage.getItem('usersDB');
      return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
    } catch {
      return defaultUsers;
    }
  });

  // Initialize from localStorage
  useEffect(() => {
    const initialize = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        const storedTheme = localStorage.getItem('darkMode');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
        if (storedTheme) {
          setDarkMode(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Sync usersDB to localStorage
  useEffect(() => {
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
  }, [usersDB]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.body.classList.toggle('dark-mode', newMode);
  };

  const authenticate = (email, password) => {
    return usersDB.find(user => user.email === email && user.password === password);
  };

  const login = (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role || 'user'
    };
    setUser(userWithRole);
    localStorage.setItem('currentUser', JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (userData) => {
    const newUser = { 
      ...userData, 
      id: Date.now().toString(),
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    // Add to usersDB
    setUsersDB(prev => [...prev, newUser]);
    
    // Auto-login the new user
    login(newUser);
    
    return newUser;
  };

  // Admin functions
  const updateUser = (userId, updatedData) => {
    setUsersDB(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ));
  };

  const deleteUser = (userId) => {
    setUsersDB(prev => prev.filter(user => user.id !== userId));
    if (user?.id === userId) logout(); // Logout if current user is deleted
  };

  const contextValue = {
    // State values
    currentUser: user,
    darkMode,
    isLoading,
    allUsers: usersDB, // For admin panel
    
    // Role checkers
    isGuest: !user,
    isUser: user?.role === 'user',
    isAdmin: user?.role === 'admin',
    
    // Auth functions
    authenticate,
    login,
    logout,
    register,
    
    // User management (admin only)
    updateUser,
    deleteUser,
    
    // Theme functions
    toggleDarkMode,
    setDarkMode
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
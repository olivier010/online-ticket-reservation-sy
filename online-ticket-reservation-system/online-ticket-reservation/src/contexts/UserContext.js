import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usersDB, setUsersDB] = useState([]);

  // Initialize from localStorage
  useEffect(() => {
    const initialize = async () => {
      try {
        // Load users database
        const storedUsers = localStorage.getItem('usersDB');
        const initialUsers = storedUsers ? JSON.parse(storedUsers) : [
          {
            id: "1",
            firstName: "Admin",
            lastName: "User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
            createdAt: new Date().toISOString()
          }
        ];
        setUsersDB(initialUsers);

        // Load current session
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Verify user still exists in DB
          const userExists = initialUsers.some(u => u.id === parsedUser.id);
          if (userExists) {
            setCurrentUser(parsedUser);
          } else {
            localStorage.removeItem('currentUser');
          }
        }

        // Load theme
        const storedTheme = localStorage.getItem('darkMode');
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
  }, []);

  // Sync states to localStorage
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (usersDB.length > 0) {
      localStorage.setItem('usersDB', JSON.stringify(usersDB));
    }
  }, [usersDB]);

  // Auth functions
  const authenticate = (email, password) => {
    return usersDB.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
  };

  const login = async (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role || 'user',
      lastLogin: new Date().toISOString()
    };
    
    setCurrentUser(userWithRole);
    localStorage.setItem('currentUser', JSON.stringify(userWithRole));
    
    return userWithRole;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // User management functions
  const createUser = async (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedUsers = [...usersDB, newUser];
    setUsersDB(updatedUsers);
    return newUser;
  };

  const updateUser = (userId, updates) => {
    const updatedUsers = usersDB.map(user => 
      user.id === userId ? { 
        ...user, 
        ...updates,
        updatedAt: new Date().toISOString() 
      } : user
    );
    
    setUsersDB(updatedUsers);

    // Update current user if it's them
    if (currentUser?.id === userId) {
      const updatedCurrentUser = updatedUsers.find(u => u.id === userId);
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = usersDB.filter(user => user.id !== userId);
    setUsersDB(updatedUsers);
    
    if (currentUser?.id === userId) {
      logout();
    }
  };

  const contextValue = {
    // State
    currentUser,
    darkMode,
    isLoading,
    allUsers: usersDB,
    
    // Role checks
    isGuest: !currentUser,
    isUser: currentUser?.role === 'user',
    isAdmin: currentUser?.role === 'admin',
    
    // Auth functions
    authenticate,
    login,
    logout,
    register: createUser, // Alias for createUser
    
    // User management
    createUser,
    updateUser,
    deleteUser,
    
    // Theme
    toggleDarkMode: () => setDarkMode(prev => !prev),
    setDarkMode
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
// Persistent user database
let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [
    {
      id: "1",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: "admin123", // Note: In production, always hash passwords
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  // Save to localStorage whenever usersDB changes
  const saveToLocalStorage = () => {
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
  };
  
  // Authentication function
  export const authenticateUser = (email, password) => {
    return usersDB.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
  };
  
  // Registration function
  export const registerUser = (userData) => {
    const emailExists = usersDB.some(user => 
      user.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (emailExists) {
      throw new Error('Email already registered');
    }
  
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  
    usersDB.push(newUser);
    saveToLocalStorage();
    return newUser;
  };
  
  // Admin user management functions
  export const getUsers = () => [...usersDB];
  
  export const updateUser = (userId, updates) => {
    const index = usersDB.findIndex(user => user.id === userId);
    if (index === -1) return null;
  
    usersDB[index] = {
      ...usersDB[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToLocalStorage();
    return usersDB[index];
  };
  
  export const deleteUser = (userId) => {
    usersDB = usersDB.filter(user => user.id !== userId);
    saveToLocalStorage();
  };
  
  // Initialize localStorage
  saveToLocalStorage();
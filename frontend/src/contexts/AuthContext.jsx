import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('optiroute_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Mock user data based on email
          const mockUsers = {
            'admin@optiroute.com': {
              id: 1,
              email: 'admin@optiroute.com',
              name: 'System Administrator',
              role: 'hospital_admin',
              roleName: 'Hospital Admin'
            },
            'doctor@optiroute.com': {
              id: 2,
              email: 'doctor@optiroute.com',
              name: 'Dr. Sarah Johnson',
              role: 'doctor',
              roleName: 'Doctor'
            },
            'nurse@optiroute.com': {
              id: 3,
              email: 'nurse@optiroute.com',
              name: 'Nurse Maria Garcia',
              role: 'nurse',
              roleName: 'Nurse'
            },
            'volunteer@optiroute.com': {
              id: 4,
              email: 'volunteer@optiroute.com',
              name: 'John Smith',
              role: 'relief_volunteer',
              roleName: 'Relief Volunteer'
            }
          };
          
          const user = mockUsers[email];
          if (user && password === 'password123') {
            resolve({ success: true, user });
          } else {
            resolve({ success: false, error: 'Invalid credentials' });
          }
        }, 1000);
      });

      if (response.success) {
        setUser(response.user);
        localStorage.setItem('optiroute_user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call - replace with actual registration
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            id: Date.now(),
            email: userData.email,
            name: userData.name,
            role: userData.role,
            roleName: userData.roleName,
            organization: userData.organization || '',
            phone: userData.phone || ''
          };
          resolve({ success: true, user: newUser });
        }, 1000);
      });

      if (response.success) {
        setUser(response.user);
        localStorage.setItem('optiroute_user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('optiroute_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

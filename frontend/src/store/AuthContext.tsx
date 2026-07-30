import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  email: string | null;
  login: (token: string, username: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));

  const login = (newToken: string, newUsername: string, newEmail: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
    localStorage.setItem('email', newEmail);
    setToken(newToken);
    setUsername(newUsername);
    setEmail(newEmail);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setToken(null);
    setUsername(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, email, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

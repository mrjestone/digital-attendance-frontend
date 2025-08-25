"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial page load
  const router = useRouter();

  // This runs when the app first loads to check for an existing token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // If a token exists, we don't automatically trust it.
      // We ask the backend "who does this token belong to?"
      // This also validates the token.
      apiClient.get('/auth/me') // We will create this backend endpoint next!
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/login');
  };

  const authContextValue = {
    user,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// This is a custom hook that makes it easy to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};
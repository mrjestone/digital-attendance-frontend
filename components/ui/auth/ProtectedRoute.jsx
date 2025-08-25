"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there is still no user, redirect
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // While loading, show a simple loading message
  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If the user is authenticated, render the page content
  return children;
};

export default ProtectedRoute;
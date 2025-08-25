"use client";

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// This is the actual content of the dashboard
function DashboardContent() {
  const { user, logout } = useAuth();

  // This check is a safeguard, but ProtectedRoute should prevent this from being null
  if (!user) return null; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
      <p className="mt-4">Hello, {user.firstName} ({user.email})</p>
      <p>Your role is: {user.role}</p>
      <Button onClick={logout} className="mt-6">
        Logout
      </Button>
    </div>
  );
}

// This is the exported page component
// It wraps our dashboard content with the protection logic
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
"use client"; // Mark this as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import apiClient from "@/services/apiClient"; // Import our API client

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "ATTENDEE", // Default role
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  
  const handleRoleChange = (value) => {
    setFormData((prevData) => ({ ...prevData, role: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiClient.post("/auth/register", formData);
      
      // On successful registration, redirect to the login page
      // We can even add a query parameter to show a success message
      router.push("/login?registered=true");

    } catch (err) {
      console.error("Registration failed:", err);
      // Use the actual error message from the backend if it exists
      setError(err.response?.data?.message || "Registration failed. The email may already be in use.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Enter your information to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required onChange={handleChange} />
              </div>
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" required onChange={handleChange} />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={handleChange} />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="role">Role</Label>
              {/* Use onValueChange for the Shadcn Select component */}
              <Select onValueChange={handleRoleChange} defaultValue="ATTENDEE">
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATTENDEE">Attendee</SelectItem>
                  <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            <Button type="submit" className="w-full mt-6">Create Account</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">Log in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
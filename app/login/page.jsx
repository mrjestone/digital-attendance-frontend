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
import Link from "next/link";
import apiClient from "@/services/apiClient"; // Import our API client

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display login errors
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the browser from reloading the page
    setError(""); // Clear previous errors

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      // If login is successful, the backend sends a token
      const token = response.data.token;
      
      // Store the token in the browser's localStorage.
      // Our apiClient's interceptor will now automatically use this token.
      localStorage.setItem("authToken", token);

      // Redirect to a dashboard page (we will create this in the next step)
      router.push("/dashboard");
      
    } catch (err) {
      // Handle login errors from the backend
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add the onSubmit handler to the form element */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  value={email} // Bind the input's value to our state
                  onChange={(e) => setEmail(e.target.value)} // Update state on every keystroke
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password} // Bind the input's value to our state
                  onChange={(e) => setPassword(e.target.value)} // Update state on every keystroke
                />
              </div>
              {/* Display an error message if the login fails */}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
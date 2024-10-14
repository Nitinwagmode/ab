"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../api/api"; // Adjust this to your actual API call

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginData = { email, password };
      const response = await login(loginData);

      if (response.token && response.user) {
        const { token, user } = response;

        // Store the token in cookies instead of localStorage
        document.cookie = `authToken=${token}; path=/;`; // Simple cookie setting

        // You can still store user data in localStorage if needed
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to the home page after successful login
        router.push("/home");
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-teal-500">
      <div className="relative p-10 rounded-lg shadow-lg w-full max-w-md z-10 bg-white">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 text-white rounded ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

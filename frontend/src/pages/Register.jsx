import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(email, password)) navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);   // << added
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, phone });
      toast.success("Registered. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark pt-20">
      <div className="w-full max-w-lg bg-gray-900/70 p-8 rounded-3xl shadow-neon border border-gray-800">
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">Create an account</h2>

        <form onSubmit={handle} className="grid grid-cols-1 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white"
          />

          {/* Password input with toggle ONLY */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}   // << added
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // << added
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="py-3 bg-primary text-dark rounded-lg font-semibold">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

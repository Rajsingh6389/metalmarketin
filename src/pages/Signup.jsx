import { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, phone });
      toast.success("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] px-4 py-10">

      {/* Signup Card */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg border">

        {/* Header */}
        <div className="bg-[#2874f0] text-white p-6 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm opacity-90 mt-1">Sign up to get started</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handle} className="grid grid-cols-1 gap-4">

            <div>
              <label className="text-gray-700 text-sm font-medium">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full px-4 py-3 mt-1 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#2874f0] outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                required
                maxLength={10}
                className="w-full px-4 py-3 mt-1 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#2874f0] outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="email"
                required
                className="w-full px-4 py-3 mt-1 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#2874f0] outline-none"
              />
            </div>

            {/* Password with show/hide */}
            <div>
              <label className="text-gray-700 text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#2874f0] outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2874f0] font-medium text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="py-3 bg-[#fb641b] text-white rounded-md font-semibold hover:bg-[#d75a18] transition-all shadow-sm">
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-[#2874f0] font-medium ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

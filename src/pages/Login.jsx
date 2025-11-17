import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      toast.success("Logged in");

      if (data.user.role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (err) {
      toast.error(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] px-4 py-10">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border">

        {/* Left Blue Header */}
        <div className="bg-[#2874f0] text-white p-6 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm opacity-90 mt-1">
            Get access to your Orders & Wishlist
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-gray-700 font-medium text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="email"
                required
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#2874f0] outline-none"
              />
            </div>

            {/* Password + Show/Hide */}
            <div>
              <label className="text-gray-700 font-medium text-sm">Password</label>
              <div className="relative mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#2874f0] outline-none"
                />

                {/* Show/Hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2874f0] text-sm font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              className="w-full py-3 bg-[#fb641b] text-white font-semibold rounded-md hover:bg-[#d75a18] transition-all shadow-sm"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            New to MetalMarket?
            <Link to="/signup" className="text-[#2874f0] font-medium ml-1">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

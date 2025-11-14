import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // << added
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password); 
      toast.success("Logged in");

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark pt-20">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-md p-8 rounded-3xl shadow-neon border border-gray-800">
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none"
            required
          />

          {/* Password + Show/Hide toggle */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}  // << toggle type
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // << toggle
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="w-full py-3 bg-primary text-dark rounded-lg font-semibold hover:brightness-110">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          No account?{" "}
          <Link to="/signup" className="text-accent">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

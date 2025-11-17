import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import image from "../image/image.png";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="bg-[#2874f0] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">

        {/* ------------ LOGO ------------ */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl tracking-wide"
        >
          <img
            src={image}
            alt="logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          <span className="text-white">MetalMarket</span>
        </Link>

        {/* ------------ DESKTOP LINKS ------------ */}
        <div className="hidden md:flex items-center space-x-6 text-sm lg:text-base">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-yellow-300 transition"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Cart
          </Link>

          <Link to="/AboutShop" className="hover:text-yellow-300 transition">
            About Shop
          </Link>

          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hover:text-yellow-300 transition"
                >
                  Admin
                </Link>
              )}

              <Link
                to="/orders"
                className="hover:text-yellow-300 transition"
              >
                Orders
              </Link>

              <button
                onClick={logout}
                className="hover:text-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-yellow-300 transition">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* ------------ MOBILE MENU BUTTON ------------ */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* ------------ BACKDROP ------------ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ------------ SIDE DRAWER ------------ */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#0b0c10] text-white shadow-xl z-50 p-6 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Menu Links */}
        <div className="mt-10 space-y-5 text-base">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300"
          >
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Cart
          </Link>

          <Link
            to="/AboutShop"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300"
          >
            About Shop
          </Link>

          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-yellow-300"
                >
                  Admin Dashboard
                </Link>
              )}

              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="block hover:text-yellow-300"
              >
                Orders
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block hover:text-yellow-300 text-left w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block hover:text-yellow-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block hover:text-yellow-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

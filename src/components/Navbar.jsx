import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import image from '../image/image.png';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="bg-dark text-white shadow-neon fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-primary">
          <img src={image} alt="logo" className="w-12 sm:w-14 rounded-3xl" />
          <span>MetalMarket</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-accent">
            <ShoppingCartIcon className="w-5 h-5" />
            Cart
          </Link>
          <Link to="/AboutShop" className="hover:text-accent">About Shop</Link>

          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="hover:text-accent">Admin</Link>}
              <Link to="/orders" className="hover:text-accent">Orders</Link>
              <button onClick={logout} className="hover:text-accent">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent">Login</Link>
              <Link to="/signup" className="hover:text-accent">Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDE DRAWER MENU */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-dark text-white p-6 z-50 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300`}>

        {/* Close Button */}
        <button className="absolute right-4 top-4" onClick={() => setIsOpen(false)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-10 space-y-5">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-accent">Home</Link>

          <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-accent">
            <ShoppingCartIcon className="w-5 h-5" />
            Cart
          </Link>

          <Link to="/AboutShop" onClick={() => setIsOpen(false)} className="block hover:text-accent">
            About Shop
          </Link>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block hover:text-accent">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/orders" onClick={() => setIsOpen(false)} className="block hover:text-accent">
                Orders
              </Link>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="block hover:text-accent text-left w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-accent">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="block hover:text-accent">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
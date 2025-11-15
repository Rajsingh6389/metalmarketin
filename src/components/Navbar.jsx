import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import image from '../image/image.png';
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // install @heroicons/react if not already

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="bg-dark shadow-neon text-white fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-accent transition-all">
          <img src={image} alt="logo" className="w-12 sm:w-14 rounded-3xl"/>
          <span className="text-yellow-200 hover:text-accent">MetalMarket</span>
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
              {isAdmin && <Link to="/admin" className="hover:text-accent">Admin Dashboard</Link>}
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
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/" className="block hover:text-accent">Home</Link>
          
          <Link to="/cart" className="flex items-center gap-1 hover:text-accent">
            <ShoppingCartIcon className="w-5 h-5" />
            Cart
          </Link>
          
          <Link to="/AboutShop" className="block hover:text-accent">About Shop</Link>
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="block hover:text-accent">Admin Dashboard</Link>}
              <Link to="/orders" className="block hover:text-accent">Orders</Link>
              <button onClick={logout} className="block hover:text-accent text-left w-full">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-accent">Login</Link>
              <Link to="/signup" className="block hover:text-accent">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

import React, { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartItemCount = 3; // 🛒 Replace with dynamic count

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">ShopEase</Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <FaShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {cartItemCount}
              </span>
            </Link>
          </div>

          {/* Profile */}
          <div className="relative">
            <FaUserCircle
              size={26}
              className="cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 text-sm z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100 text-red-600">Logout</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white px-4 pb-4 space-y-2 text-gray-700 font-medium">
          <li><Link to="/" className="block py-2 border-b">Home</Link></li>
          <li><Link to="/products" className="block py-2 border-b">Shop</Link></li>
          <li><Link to="/about" className="block py-2 border-b">About</Link></li>
          <li><Link to="/contact" className="block py-2 border-b">Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

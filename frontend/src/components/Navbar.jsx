import React, { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartItemCount = 3; // 🛒 Replace with dynamic count

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <a href="/">ShopEase</a>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
          <li><a href="/about" className="hover:text-blue-600">About</a></li>
          <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative cursor-pointer">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
              {cartItemCount}
            </span>
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
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
                <a href="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</a>
                <a href="/logout" className="block px-4 py-2 hover:bg-gray-100 text-red-600">Logout</a>
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
          <li><a href="/" className="block py-2 border-b">Home</a></li>
          <li><a href="/shop" className="block py-2 border-b">Shop</a></li>
          <li><a href="/about" className="block py-2 border-b">About</a></li>
          <li><a href="/contact" className="block py-2 border-b">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

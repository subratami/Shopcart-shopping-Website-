// components/Sidebar.tsx
import { useState } from "react";
import { FaTachometerAlt, FaShoppingCart, FaHeart, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white shadow-lg h-screen p-4 border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between">
        <h1 className={`text-xl font-bold text-blue-600 ${!isOpen && "hidden"}`}>Shopcart</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-500">
          ☰
        </button>
      </div>

      {/* Menu */}
      <ul className="mt-6 space-y-3">
        <li>
          <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-600">
            <FaTachometerAlt /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/orders" className="flex items-center gap-3 hover:text-blue-600">
            <FaHistory /> {isOpen && "Order History"}
          </Link>
        </li>
        <li>
          <Link to="/cart" className="flex items-center gap-3 hover:text-blue-600">
            <FaShoppingCart /> {isOpen && "Shopping Cart"}
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="flex items-center gap-3 hover:text-blue-600">
            <FaHeart /> {isOpen && "Wishlist"}
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-3 hover:text-blue-600">
            <FaUser /> {isOpen && "Profile"}
          </Link>
        </li>
        <li>
          <button className="flex items-center gap-3 text-red-500 hover:text-red-700">
            <FaSignOutAlt /> {isOpen && "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

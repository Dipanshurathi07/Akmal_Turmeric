import { Link } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <Sparkles
              className="text-yellow-600"
              size={30}
            />

            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-700">
              Paka Nafsa Trading Private Limited
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/products"
              className="text-gray-700 hover:text-yellow-600 transition"
            >
              Products
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-yellow-600 transition"
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="text-gray-700 hover:text-yellow-600 transition"
            >
              Login
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-yellow-600 transition"
            >
              <ShoppingCart size={24} />

              {/* Optional Badge */}
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                1
              </span>
            </Link>

            <Link
              to="/signup"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-xl transition"
            >
              Sign Up
            </Link>

          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-4 md:hidden">

            {/* Cart Icon Mobile */}
            <Link
              to="/cart"
              className="relative text-gray-700"
            >
              <ShoppingCart size={26} />

              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                1
              </span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {menuOpen ? (
                <X
                  size={30}
                  className="text-gray-700"
                />
              ) : (
                <Menu
                  size={30}
                  className="text-gray-700"
                />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-5 border-t">

            <div className="flex flex-col gap-4 pt-5">

              <Link
                to="/products"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-gray-700 hover:text-yellow-600 transition"
              >
                Products
              </Link>

              <Link
                to="/contact"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-gray-700 hover:text-yellow-600 transition"
              >
                Contact
              </Link>

              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-gray-700 hover:text-yellow-600 transition"
              >
                Login
              </Link>

              <Link
                to="/cart"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-gray-700 hover:text-yellow-600 transition"
              >
                Cart
              </Link>

              <Link
                to="/signup"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="bg-yellow-600 hover:bg-yellow-700 text-white text-center py-3 rounded-xl transition"
              >
                Sign Up
              </Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
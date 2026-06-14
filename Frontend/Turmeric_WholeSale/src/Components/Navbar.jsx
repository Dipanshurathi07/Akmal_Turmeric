import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles, Menu, X, ShoppingCart, Package,
  User, ChevronDown, LogOut, Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../Redux/Slice/OrderSlice";
import { logoutUser } from "../Redux/Slice/AuthSlice";
import { clearCart } from "../Redux/Slice/CartSlice";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((s) => s.auth.token);
  const user = useSelector((s) => s.auth.user);
  const orders = useSelector((s) => s.order.orders || []);
  const cart = useSelector((s) => s.cart.cart);

  const isAuthenticated = Boolean(token);
  const isAdmin = user?.role === "admin";
  const cartCount = cart?.totalItems || 0;
  const confirmedCount = Array.isArray(orders)
    ? orders.filter((o) => o.orderStatus === "confirmed").length
    : 0;

  const userInitials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "?";

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    if (token) dispatch(getUserOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearCart());
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  const desktopLink = (path, label) => (
    <Link
      to={path}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
        isActive(path)
          ? "text-amber-800 bg-amber-50 dark:text-amber-300 dark:bg-amber-950"
          : "text-gray-600 hover:text-amber-800 hover:bg-amber-50 dark:text-gray-300 dark:hover:text-amber-300 dark:hover:bg-amber-950"
      }`}
    >
      {label}
    </Link>
  );

  const mobileLink = (to, icon, label, badge = null) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-150 ${
        isActive(to)
          ? "text-amber-800 bg-amber-50 dark:text-amber-300 dark:bg-amber-950"
          : "text-gray-700 dark:text-gray-200 active:bg-gray-100 dark:active:bg-gray-800"
      }`}
    >
      <span className="text-gray-400 dark:text-gray-500 w-5 flex-shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== null && badge > 0 && (
        <span className="text-xs font-semibold bg-amber-800 text-amber-100 px-2 py-0.5 rounded-full">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </Link>
  );

  return (
    <nav
      className={`bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-800 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="text-amber-100 w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-400 tracking-tight whitespace-nowrap">
                Paka Nafsa Trading
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 hidden sm:block">
                Private Limited
              </span>
            </div>
          </Link>

          {/* Desktop center nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 mx-6">
            {desktopLink("/products", "Products")}
            {desktopLink("/contact", "Contact")}
            {!isAuthenticated && desktopLink("/login", "Login")}
            {isAuthenticated && isAdmin && desktopLink("/admin/dashboard", "Admin")}

            <div className="flex items-center gap-1 ml-auto">
              <Link
                to="/cart"
                className="relative p-2 text-gray-500 hover:text-amber-800 hover:bg-amber-50 dark:text-gray-400 dark:hover:text-amber-300 dark:hover:bg-amber-950 rounded-xl transition-all"
              >
                <ShoppingCart size={20} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-800 text-amber-100 text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/orders"
                className="relative p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950 rounded-xl transition-all"
              >
                <Package size={20} strokeWidth={1.8} />
                {confirmedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-emerald-700 text-emerald-100 text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
                    {confirmedCount > 9 ? "9+" : confirmedCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {!isAuthenticated ? (
              <Link
                to="/verify-email"
                className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                Sign up
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 pl-1.5 pr-3 py-1.5 rounded-full transition-all"
                >
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-xs font-semibold text-amber-800 dark:text-amber-300">
                    {userInitials}
                  </span>
                  <span className="hidden lg:inline text-sm font-medium">
                    {user?.name?.split(" ")[0] || "Profile"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-68 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-amber-50 dark:bg-amber-950 flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-sm font-semibold text-amber-800 dark:text-amber-300 flex-shrink-0">
                        {userInitials}
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || "N/A"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "N/A"}</p>
                      </div>
                    </div>
                    <div className="p-1.5">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 rounded-lg transition-all"
                      >
                        <User size={16} /> View profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 w-full rounded-lg transition-all"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile right — ThemeToggle + icon badges + hamburger */}
          <div className="flex md:hidden items-center gap-0.5">
            <ThemeToggle />

            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-amber-800 rounded-xl transition-all"
                >
                  <ShoppingCart size={19} strokeWidth={1.8} />
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-amber-800 text-amber-100 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/orders"
                  className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-700 rounded-xl transition-all"
                >
                  <Package size={19} strokeWidth={1.8} />
                  {confirmedCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-emerald-700 text-emerald-100 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {confirmedCount > 9 ? "9+" : confirmedCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-3 py-3 space-y-0.5">

            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-3 pb-1 pt-1">
              Browse
            </p>
            {mobileLink("/products", <ShoppingCart size={18} strokeWidth={1.8} />, "Products")}
            {mobileLink("/contact", <span className="text-base leading-none">💬</span>, "Contact")}

            {isAuthenticated && (
              <>
                <div className="border-t border-gray-100 dark:border-gray-800 my-1.5" />
                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-3 pb-1 pt-1">
                  Shopping
                </p>
                {mobileLink("/cart", <ShoppingCart size={18} strokeWidth={1.8} />, "Cart", cartCount)}
                {mobileLink("/orders", <Package size={18} strokeWidth={1.8} />, "Orders", confirmedCount)}
              </>
            )}

            <div className="border-t border-gray-100 dark:border-gray-800 my-1.5" />
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-3 pb-1 pt-1">
              Account
            </p>

            {!isAuthenticated ? (
              <>
                {mobileLink("/login", <User size={18} strokeWidth={1.8} />, "Login")}
                <Link
                  to="/verify-email"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center bg-amber-800 hover:bg-amber-900 text-amber-50 font-medium py-3 px-4 rounded-xl transition-all text-sm mt-2"
                >
                  Create account
                </Link>
              </>
            ) : (
              <>
                {/* User card */}
                <div className="flex items-center gap-3 px-3 py-3 bg-amber-50 dark:bg-amber-950 rounded-xl mb-0.5">
                  <span className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-sm font-semibold text-amber-800 dark:text-amber-300 flex-shrink-0">
                    {userInitials}
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || "N/A"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "N/A"}</p>
                  </div>
                </div>

                {mobileLink("/profile", <User size={18} strokeWidth={1.8} />, "My profile")}
                {isAdmin && mobileLink("/admin/dashboard", <Settings size={18} strokeWidth={1.8} />, "Admin dashboard")}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-all font-medium text-base mt-0.5"
                >
                  <LogOut size={18} strokeWidth={1.8} className="flex-shrink-0" />
                  Logout
                </button>
              </>
            )}

            <div className="pb-1" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
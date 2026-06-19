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

  // Slightly bigger, bolder desktop nav links
  const desktopLink = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2.5 rounded-lg text-[15px] font-semibold tracking-tight transition-all duration-150 ${
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

  // Reusable icon-button with badge, used in the right-side icon group
  const iconButton = (to, Icon, count, hoverColorClasses) => (
    <Link
      to={to}
      className={`relative p-3 text-gray-500 dark:text-gray-400 rounded-xl transition-all ${hoverColorClasses}`}
    >
      <Icon size={26} strokeWidth={1.8} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-current text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center" />
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
        {/* relative wrapper lets us truly center the nav links regardless of
            how wide the logo or right-side icon group are */}
        <div className="relative flex items-center justify-between h-16 sm:h-24">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 flex-shrink-0 group z-10">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-amber-800 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
              <Sparkles className="text-amber-100 w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-xl font-semibold text-amber-800 dark:text-amber-400 tracking-tight whitespace-nowrap">
                Paka Nafsa Trading
              </span>
              <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 hidden sm:block">
                Private Limited
              </span>
            </div>
          </Link>

          {/* Desktop center nav — absolutely centered in the navbar */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {desktopLink("/products", "Products")}
            {desktopLink("/contact", "Contact")}
            {!isAuthenticated && desktopLink("/login", "Login")}
            {isAuthenticated && isAdmin && desktopLink("/admin/dashboard", "Admin")}
          </div>

          {/* Desktop right — icons + theme toggle + profile, all in one group */}
          <div className="hidden md:flex items-center gap-1.5 z-10">

            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="relative p-3 text-gray-500 hover:text-amber-800 hover:bg-amber-50 dark:text-gray-400 dark:hover:text-amber-300 dark:hover:bg-amber-950 rounded-xl transition-all"
                >
                  <ShoppingCart size={26} strokeWidth={1.8} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-800 text-amber-100 text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/orders"
                  className="relative p-3 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950 rounded-xl transition-all"
                >
                  <Package size={26} strokeWidth={1.8} />
                  {confirmedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-700 text-emerald-100 text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                      {confirmedCount > 9 ? "9+" : confirmedCount}
                    </span>
                  )}
                </Link>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              </>
            )}

            <ThemeToggle />

            {!isAuthenticated ? (
              <Link
                to="/verify-email"
                className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-xl text-base font-medium transition-all ml-1"
              >
                Sign up
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 pl-2 pr-3 py-2 rounded-full transition-all ml-1"
                >
                  <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-sm font-semibold text-amber-800 dark:text-amber-300">
                    {userInitials}
                  </span>
                  <span className="hidden lg:inline text-base font-medium">
                    {user?.name?.split(" ")[0] || "Profile"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800 bg-amber-50 dark:bg-amber-950 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-base font-semibold text-amber-800 dark:text-amber-300 flex-shrink-0">
                        {userInitials}
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-base font-semibold text-gray-900 dark:text-white truncate">{user?.name || "N/A"}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email || "N/A"}</p>
                      </div>
                    </div>
                    <div className="p-1.5">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 rounded-lg transition-all"
                      >
                        <User size={18} /> View profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-3 text-base text-red-600 hover:bg-red-50 dark:hover:bg-red-950 w-full rounded-lg transition-all"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile right — ThemeToggle + cart icon + hamburger */}
          <div className="flex md:hidden items-center gap-1 z-10">
            <ThemeToggle />

            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative p-2.5 text-gray-500 dark:text-gray-400 hover:text-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950 rounded-xl transition-all"
              >
                <ShoppingCart size={22} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-800 text-amber-100 text-[8px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
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
          <div className="px-4 py-4 space-y-1">

            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-4 pb-2 pt-2">
              Browse
            </p>
            {mobileLink("/products", <ShoppingCart size={20} strokeWidth={1.8} />, "Products")}
            {mobileLink("/contact", <span className="text-lg leading-none">💬</span>, "Contact")}

            {isAuthenticated && (
              <>
                <div className="border-t border-gray-100 dark:border-gray-800 my-2.5" />
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-4 pb-2 pt-2">
                  Shopping
                </p>
                {mobileLink("/cart", <ShoppingCart size={20} strokeWidth={1.8} />, "Cart", cartCount)}
                {mobileLink("/orders", <Package size={20} strokeWidth={1.8} />, "Orders", confirmedCount)}
              </>
            )}

            <div className="border-t border-gray-100 dark:border-gray-800 my-2.5" />
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-4 pb-2 pt-2">
              Account
            </p>

            {!isAuthenticated ? (
              <>
                {mobileLink("/login", <User size={20} strokeWidth={1.8} />, "Login")}
                <Link
                  to="/verify-email"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center bg-amber-800 hover:bg-amber-900 text-amber-50 font-medium py-3 px-4 rounded-xl transition-all text-base mt-3"
                >
                  Create account
                </Link>
              </>
            ) : (
              <>
                {/* User card */}
                <div className="flex items-center gap-3 px-4 py-4 bg-amber-50 dark:bg-amber-950 rounded-xl mb-1">
                  <span className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-base font-semibold text-amber-800 dark:text-amber-300 flex-shrink-0">
                    {userInitials}
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-base font-semibold text-gray-900 dark:text-white truncate">{user?.name || "N/A"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email || "N/A"}</p>
                  </div>
                </div>

                {mobileLink("/profile", <User size={20} strokeWidth={1.8} />, "My profile")}
                {isAdmin && mobileLink("/admin/dashboard", <Settings size={20} strokeWidth={1.8} />, "Admin dashboard")}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-all font-medium text-base mt-1"
                >
                  <LogOut size={20} strokeWidth={1.8} className="flex-shrink-0" />
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
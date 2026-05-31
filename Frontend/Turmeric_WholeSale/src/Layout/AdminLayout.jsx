import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  const navItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
    { path: '/admin/products', label: '📦 Products', icon: '📦' },
    { path: '/admin/orders', label: '🛒 Orders', icon: '🛒' },
    { path: '/admin/users', label: '👥 Users', icon: '👥' },
    { path: '/admin/reports', label: '📈 Reports', icon: '📈' },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-col p-6 shadow-lg">
        <div className="mb-8 pb-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-orange-500">Admin Panel</h2>
        </div>

        <nav className="flex-1 mb-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className="block px-4 py-3 text-gray-300 hover:bg-orange-500 hover:bg-opacity-20 hover:text-orange-500 rounded transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-6 border-t border-gray-700">
          <button
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold transition"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:w-full">
        {/* Mobile Top Header */}
        <header className="md:hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-lg flex justify-between items-center">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button
            className="text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </header>

        {/* Desktop Top Header */}
        <header className="hidden md:flex bg-white px-6 py-4 shadow-sm justify-between items-center">
          <h1 className="text-2xl text-gray-900 font-semibold">Welcome, Akaml</h1>
        </header>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 space-y-2 border-b border-gray-700">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="block px-4 py-3 text-gray-300 hover:bg-orange-500 hover:bg-opacity-20 hover:text-orange-500 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              className="w-full mt-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold transition"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )}

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </section>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex-1 flex flex-col items-center justify-center py-3 text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition text-sm"
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="hidden xs:inline text-xs">{item.icon}</span>
              </a>
            ))}
          </div>
        </nav>
      </main>
    </div>
  )
}

export default AdminLayout

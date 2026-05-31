
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import OrderConfirmation from './Pages/OrderConfirmation'
import Contact from './Pages/Contact'
import UserLayout from './Layout/UserLayout'
import Products from './Pages/Products'
import AdminLayout from './Layout/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import ManageProducts from './Pages/Admin/ManageProducts'
import ManageOrders from './Pages/Admin/ManageOrders'
import ManageUsers from './Pages/Admin/ManageUsers'
import Reports from './Pages/Admin/Reports'

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}> 
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Products />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  )
}

export default App

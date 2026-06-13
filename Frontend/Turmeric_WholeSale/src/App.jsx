
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import OrderConfirmation from './Pages/OrderConfirmation'
import Contact from './Pages/Contact'
import Orders from './Pages/Orders'
import ForgotPassword from './Pages/ForgotPassword'
import OtpVerification from './Pages/OtpVerification'
import VerifyEmail from './Pages/VerifyEmail'
import UserLayout from './Layout/UserLayout'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'
import Profile from './Pages/Profile'
import ResetPassword from './Pages/ResetPassword'
import AdminLayout from './Layout/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import ManageProducts from './Pages/Admin/ManageProducts'
import ManageOrders from './Pages/Admin/ManageOrders'
import ManageUsers from './Pages/Admin/ManageUsers'
// import Reports from './Pages/Admin/Reports'
import OrderDetails from './Pages/OrderDetails'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./Redux/Slice/AuthSlice";
import EditProduct from './Pages/Admin/EditProduct'
import NewProduct from './Pages/Admin/NewProduct'
import AdminUserProfile from './Pages/Admin/AdminUserProfile'
import NotFound from './Pages/NotFound'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("kro yaar")
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}> 
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="register" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="verify-otp" element={<OtpVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="edit/:productId" element={<EditProduct></EditProduct>} />
        <Route path ="add-product" element={<NewProduct></NewProduct>}></Route>
        <Route path="users/:userId" element={<AdminUserProfile />} />

        {/* <Route path="reports" element={<Reports />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

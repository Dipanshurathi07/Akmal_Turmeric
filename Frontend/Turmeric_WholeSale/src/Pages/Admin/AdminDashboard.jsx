import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from '../../Redux/Slice/AdminSlice';
import { fetchAllProducts } from '../../Redux/Slice/ProductSlice';
import Products from '../Products';
import { getAllOrders } from '../../Redux/Slice/OrderSlice'


const AdminDashboard = () => {
  const { users }  = useSelector((state)=>state.admin);
  const { products } = useSelector((state)=>state.products);
  const { allOrders, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  // Derived dashboard stats computed from store data
  const totalUsers = users?.length || 0;
  const totalProducts = products?.length || 0;
  const totalOrdersCount = Array.isArray(allOrders) ? allOrders.length : 0;
  const totalRevenue = Array.isArray(allOrders)
    ? allOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0)
    : 0;

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  // const [recentOrders, setRecentOrders] = useState([
  //   { id: 1, customer: 'John Doe', amount: 5000, status: 'Completed', date: '2025-05-30' },
  //   { id: 2, customer: 'Jane Smith', amount: 3500, status: 'Pending', date: '2025-05-29' },
  //   { id: 3, customer: 'Ahmed Khan', amount: 7200, status: 'Shipping', date: '2025-05-28' },
  // ])

  return (
    <div className="pb-20 md:pb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Stats Cards - Mobile optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="text-2xl md:text-4xl mb-2">👥</div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-600">Users</h3>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mt-1">{users.length}</p>
        </div>

        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="text-2xl md:text-4xl mb-2">📦</div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-600">Products</h3>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mt-1">{products.length}</p>
        </div>

        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="text-2xl md:text-4xl mb-2">🛒</div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-600">Orders</h3>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mt-1">{allOrders.length}</p>
        </div>

          <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="text-2xl md:text-4xl mb-2">💰</div>
            <h3 className="text-xs md:text-sm font-semibold text-gray-600">Revenue</h3>
            <p className="text-lg md:text-3xl font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
          </div>
      </div>

      {/* Recent Orders - Mobile Card View */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
        
        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {allOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{order.date}</span>
                <span className="font-bold text-gray-800">₹{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">#{order._id}</td>
                  <td className="px-4 py-3 text-gray-800">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-800">₹{order.totalAmount?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

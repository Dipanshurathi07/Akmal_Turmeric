import React, { useState } from 'react'

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', amount: 5000, status: 'Completed', date: '2025-05-30' },
    { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: 3500, status: 'Pending', date: '2025-05-29' },
    { id: 'ORD-003', customer: 'Ahmed Khan', email: 'ahmed@example.com', amount: 7200, status: 'Shipping', date: '2025-05-28' },
    { id: 'ORD-004', customer: 'Priya Sharma', email: 'priya@example.com', amount: 2800, status: 'Cancelled', date: '2025-05-27' },
  ])

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    )
  }

  return (
    <div className="pb-20 md:pb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Orders</h2>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-gray-800">{order.id}</p>
                <p className="text-sm text-gray-600">{order.customer}</p>
                <p className="text-xs text-gray-500">{order.email}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2 ${
                order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600 text-xs">Amount</p>
                <p className="font-semibold text-gray-800">₹{order.amount}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600 text-xs">Date</p>
                <p className="font-semibold text-gray-800 text-xs">{order.date}</p>
              </div>
            </div>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Shipping">Shipping</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{order.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">₹{order.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{order.date}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-orange-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageOrders

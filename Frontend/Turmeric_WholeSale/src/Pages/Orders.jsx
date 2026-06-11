import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../Redux/Slice/OrderSlice';
import { Link } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const userOrders = Array.isArray(orders) ? [...orders].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Confirmed Orders</h1>

        {loading && <p className="text-sm text-gray-600">Loading orders...</p>}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {error?.Message || error}
          </div>
        )}

        {!loading && userOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">You have no orders yet.</p>
            <Link to="/products" className="mt-4 inline-block text-yellow-600 hover:underline">Browse products</Link>
          </div>
        )}

        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Order #{order.orderNumber}</div>
                <div className="font-semibold text-gray-800">{order.items.length} items • ₹{order.totalAmount}</div>
                <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm ${order.orderStatus === 'confirmed' ? 'bg-green-100 text-green-800' : order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>
                  {order.orderStatus}
                </span>
                <Link to={`/orders/${order._id}`} className="text-sm text-yellow-600 hover:underline">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

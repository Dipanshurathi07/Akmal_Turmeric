import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../Redux/Slice/OrderSlice';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { currentOrder, loading: orderLoading, error: orderError } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId && (!currentOrder || currentOrder._id !== orderId)) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, currentOrder, dispatch]);

  useEffect(() => {
    if (!orderId && !currentOrder) {
      navigate('/');
    }
  }, [orderId, currentOrder, navigate]);

  if (orderId && orderError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order not found</h2>
          <p className="text-gray-600 mb-6">We couldn't find that order. Please check your order link or visit your orders list.</p>
          <Link to="/orders" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition">My Orders</Link>
        </div>
      </div>
    );
  }

  if (orderId && orderLoading) {
    return <div className="p-6">Loading order...</div>;
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No order found</h2>
          <p className="text-gray-600 mb-6">Your order confirmation is not available right now. Please place an order first.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No order found</h2>
          <p className="text-gray-600 mb-6">Your order confirmation is not available right now. Please place an order first.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const orderNumber = currentOrder.orderNumber || currentOrder._id;
  const createdDate = new Date(currentOrder.createdAt || Date.now()).toLocaleDateString('en-IN');
  const shipping = currentOrder.shippingAddress || {};
  const paymentMethodLabel = currentOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment';
  const orderStatus = currentOrder.orderStatus || 'pending';
  const items = Array.isArray(currentOrder.items) ? currentOrder.items : [];
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');
  const totalPrice = currentOrder.totalAmount || items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const taxAmount = Math.round(totalPrice * 0.1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl md:text-4xl">✓</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>
          <p className="text-lg md:text-xl font-bold text-orange-500">Order ID: {orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-800">{createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-800">{paymentMethodLabel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {orderStatus}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 mb-4">Items Ordered</h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => {
                  const product = item.product || {};
                  return (
                    <div key={product._id || item.product || item.price} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center flex-1">
                        <div className="rounded-full bg-yellow-100 text-yellow-700 w-10 h-10 flex items-center justify-center mr-3 text-lg">🌿</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{product.name || 'Product'}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 ml-2 whitespace-nowrap">₹{(item.price || 0) * (item.quantity || 1)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>₹{taxAmount}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-orange-500">₹{totalPrice + taxAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Delivery Address</h2>

              <div className="flex items-start">
                <span className="text-3xl mr-4">📍</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{shipping.fullName || shipping.addressLine1 || shipping.streetAddress || 'Delivery Address'}</p>
                  <p className="text-gray-600 mt-1">{shipping.streetAddress || shipping.addressLine1 || ''}</p>
                  <p className="text-gray-600">{shipping.city || ''}, {shipping.state || ''} {shipping.postalCode || shipping.pincode || ''}</p>
                  <p className="text-gray-600 mt-2">Phone: {shipping.phoneNumber || shipping.phone || ''}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>📅 Estimated Delivery:</strong> {estimatedDelivery}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Order Tracking</h2>
              <div className="space-y-4">
                {[
                  { step: 1, status: 'completed', title: 'Order Confirmed', description: 'Your order has been confirmed' },
                  { step: 2, status: ['confirmed', 'processing', 'shipped', 'delivered'].includes(orderStatus) ? 'completed' : 'current', title: 'Processing', description: 'Preparing your order for shipment' },
                  { step: 3, status: ['shipped', 'delivered'].includes(orderStatus) ? 'completed' : 'pending', title: 'Shipped', description: 'On the way to you' },
                  { step: 4, status: orderStatus === 'delivered' ? 'current' : 'pending', title: 'Delivered', description: 'Delivered to your address' },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.status === 'completed' ? 'bg-green-500 text-white' : item.status === 'current' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {item.status === 'completed' ? '✓' : item.step}
                      </div>
                      {index < 3 && <div className={`w-1 h-12 mt-1 ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`} />}
                    </div>
                    <div className="pt-1 flex-1">
                      <p className={`font-semibold ${item.status === 'pending' ? 'text-gray-600' : 'text-gray-800'}`}>
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/products')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Print Receipt
                </button>
                <button
                  className="w-full border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Download Invoice
                </button>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-6 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                If you have any questions about your order, please contact our customer support team.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  📧 <a href="mailto:support@akmalhing.com" className="text-orange-500 hover:underline">support@akmalhing.com</a>
                </p>
                <p className="text-gray-700">
                  📞 <a href="tel:+919876543210" className="text-orange-500 hover:underline">+91 98765 43210</a>
                </p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg shadow-md p-6 mt-6 border border-green-200">
              <p className="text-sm text-green-900">
                ✓ A confirmation email has been sent to your email address with all order details.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

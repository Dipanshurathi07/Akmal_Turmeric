import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderConfirmation = () => {
  const navigate = useNavigate()
  const [orderData] = useState({
    orderId: 'TRM' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString('en-IN'),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
    items: [
      { id: 1, name: 'Turmeric Powder Premium', price: 450, quantity: 2, image: '🧂' },
      { id: 2, name: 'Organic Turmeric', price: 550, quantity: 1, image: '🧂' },
    ],
    shippingAddress: {
      name: 'Akmal Ahmed',
      address: '123 Market Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
    },
    paymentMethod: 'Credit Card',
    subtotal: 1450,
    shipping: 0,
    tax: 145,
    total: 1595,
    status: 'confirmed',
  })

  const [trackingSteps] = useState([
    { step: 1, status: 'completed', title: 'Order Confirmed', description: 'Your order has been confirmed' },
    { step: 2, status: 'current', title: 'Processing', description: 'Preparing your order for shipment' },
    { step: 3, status: 'pending', title: 'Shipped', description: 'On the way to you' },
    { step: 4, status: 'pending', title: 'Delivered', description: 'Delivered to your address' },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl md:text-4xl">✓</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>
          <p className="text-lg md:text-xl font-bold text-orange-500">Order ID: {orderData.orderId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-800">{orderData.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-800">{orderData.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {orderData.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <h3 className="font-bold text-gray-800 mb-4">Items Ordered</h3>
              <div className="space-y-3 mb-6">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center flex-1">
                      <span className="text-3xl mr-3">{item.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800 ml-2 whitespace-nowrap">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Pricing Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (10%)</span>
                  <span>₹{orderData.tax}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-orange-500">₹{orderData.total}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Delivery Address</h2>

              <div className="flex items-start">
                <span className="text-3xl mr-4">📍</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{orderData.shippingAddress.name}</p>
                  <p className="text-gray-600 mt-1">{orderData.shippingAddress.address}</p>
                  <p className="text-gray-600">{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.pincode}</p>
                  <p className="text-gray-600 mt-2">Phone: {orderData.shippingAddress.phone}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>📅 Estimated Delivery:</strong> {orderData.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Order Tracking</h2>

              <div className="space-y-4">
                {trackingSteps.map((item, index) => (
                  <div key={item.step} className="flex items-start">
                    {/* Timeline */}
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          item.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : item.status === 'current'
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {item.status === 'completed' ? '✓' : item.step}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`w-1 h-12 mt-1 ${
                            item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* Content */}
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
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

            {/* Support */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                If you have any questions about your order, please contact our customer support team.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  📧 <a href="mailto:support@turmeric.com" className="text-orange-500 hover:underline">support@turmeric.com</a>
                </p>
                <p className="text-gray-700">
                  📞 <a href="tel:+919876543210" className="text-orange-500 hover:underline">+91 98765 43210</a>
                </p>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-green-50 rounded-lg shadow-md p-6 mt-6 border border-green-200">
              <p className="text-sm text-green-900">
                ✓ A confirmation email has been sent to your email address with all order details.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
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
  )
}

export default OrderConfirmation

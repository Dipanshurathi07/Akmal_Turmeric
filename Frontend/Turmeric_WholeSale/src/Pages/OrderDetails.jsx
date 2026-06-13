import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById } from '../Redux/Slice/OrderSlice';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, loading, error } = useSelector((state) => state.order);
  const [showTracking, setShowTracking] = useState(false);
  const supportEmail = 'support@akmalhing.com';

  useEffect(() => {
    if (!orderId) return;
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (!loading && !currentOrder && !error) {
      // if nothing is returned, stay — the thunk will set error if not found
    }
  }, [loading, currentOrder, error]);

  if (loading) return <div className="p-6">Loading order...</div>;

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error?.Message || error}</div>
        <button onClick={() => navigate(-1)} className="text-yellow-600 hover:underline">Go back</button>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="p-6">Order not found. <Link to="/orders" className="text-yellow-600 hover:underline">Back to orders</Link></div>
    );
  }

  const { orderNumber, items, totalAmount, totalItems, shippingAddress, paymentMethod, orderStatus, createdAt } = currentOrder;
  const mailSubject = encodeURIComponent(`Order Status Request - ${orderNumber}`);
  const mailBodyBase = encodeURIComponent(`Please provide an update for my order ${orderNumber} (status: ${orderStatus}).\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount}\n\nThank you.`);

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order #{orderNumber}</h1>
            <div className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">{orderStatus}</span>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
          <div className="text-sm text-gray-700">
            {shippingAddress?.fullName}<br />
            {shippingAddress?.addressLine1}{shippingAddress?.addressLine2 ? `, ${shippingAddress.addressLine2}` : ''}<br />
            {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postalCode}<br />
            {shippingAddress?.country}<br />
            <strong>Phone:</strong> {shippingAddress?.phone}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
          <div className="space-y-2">
            {Array.isArray(items) && items.map((it) => (
              <div key={it.product?._id || it.product} className="flex justify-between text-sm">
                <div className="text-gray-700">{it.product?.name || 'Product'} x {it.quantity}</div>
                <div className="text-gray-900 font-semibold">₹{it.price * it.quantity}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">Items: {totalItems}</div>
          <div className="text-lg font-bold">Total: ₹{totalAmount}</div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Payment</h3>
          <div className="text-sm text-gray-700">Method: {paymentMethod}</div>
        </section>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTracking((s) => !s)}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
            >
              {showTracking ? 'Hide Tracking' : 'Track Order'}
            </button>

            {orderStatus === 'pending' && (
              <>
                <a
                  href={`mailto:${supportEmail}?subject=${mailSubject}&body=${mailBodyBase}`}
                  className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  Request Status Update
                </a>

                <a
                  href={`mailto:${supportEmail}?subject=${encodeURIComponent(`Cancellation Request - ${orderNumber}`)}&body=${encodeURIComponent(`Please cancel my order ${orderNumber} (Order ID: ${orderId}).\nReason:`)}`}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100"
                >
                  Request Cancellation
                </a>
              </>
            )}

            <Link to="/orders" className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Back</Link>
          </div>

          {showTracking && (
            <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-semibold mb-3">Tracking</h4>
              {currentOrder.trackingNumber ? (
                <div className="text-sm text-gray-700 mb-3">Tracking Number: <span className="font-mono">{currentOrder.trackingNumber}</span></div>
              ) : (
                <div className="text-sm text-gray-600 mb-3">No tracking number available yet. We'll update you when it's shipped.</div>
              )}

              <div className="space-y-4">
                {[
                  { step: 1, status: 'confirmed', title: 'Order Confirmed' },
                  { step: 2, status: ['confirmed', 'processing', 'shipped', 'delivered'].includes(orderStatus) ? 'completed' : 'current', title: 'Processing' },
                  { step: 3, status: ['shipped', 'delivered'].includes(orderStatus) ? 'completed' : 'pending', title: 'Shipped' },
                  { step: 4, status: orderStatus === 'delivered' ? 'current' : 'pending', title: 'Delivered' },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.status === 'completed' ? 'bg-green-500 text-white' : item.status === 'current' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {item.status === 'completed' ? '✓' : item.step}
                      </div>
                      {index < 3 && <div className={`w-1 h-12 mt-1 ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`} />}
                    </div>
                    <div className="pt-1 flex-1">
                      <p className={`font-semibold ${item.status === 'pending' ? 'text-gray-600' : 'text-gray-800'}`}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

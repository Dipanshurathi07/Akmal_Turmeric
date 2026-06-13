import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserCart, clearUserCart, clearCart } from '../Redux/Slice/CartSlice';
import { createCheckout } from '../Redux/Slice/CheckoutSlice';
import { createOrder } from '../Redux/Slice/OrderSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { loading: checkoutLoading, error: checkoutError } = useSelector((state) => state.checkout);
  const { loading: orderLoading, error: orderError } = useSelector((state) => state.order);

  const [step, setStep] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (cart && cart.items && cart.items.length === 0) {
      navigate('/order-confirmation');
    }
  }, [cart, navigate]);

  const cartItems = useMemo(() => {
    if (!cart || !Array.isArray(cart.items)) {
      return [];
    }
    return cart.items.map((item) => {
      const product = item.product || {};
      return {
        id: product._id || item._id || item.product,
        name: product.name || item.name || 'Product',
        price: item.price || product.price || 0,
        quantity: item.quantity || 1,
        image: product.image || '',
      };
    });
  }, [cart]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const { fullName, phone, address, city, state, pincode, country } = shippingData;
    if (!fullName || !phone || !address || !city || !state || !pincode || !country) {
      setValidationError('Please complete all shipping fields before continuing.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateShipping()) {
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const buildPayload = () => {
    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    return {
      items,
      shippingAddress: {
        fullName: shippingData.fullName,
        addressLine1: shippingData.address,
        addressLine2: shippingData.address2,
        streetAddress: shippingData.address,
        city: shippingData.city,
        state: shippingData.state,
        postalCode: shippingData.pincode,
        country: shippingData.country,
        phone: shippingData.phone,
        phoneNumber: shippingData.phone,
      },
      paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Razorpay',
    };
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setValidationError('Your cart is empty. Add items before placing an order.');
      return;
    }

    const payload = buildPayload();

    const checkoutAction = await dispatch(createCheckout(payload));
    if (checkoutAction.meta.requestStatus !== 'fulfilled') {
      return;
    }

    const orderAction = await dispatch(createOrder(payload));
    if (orderAction.meta.requestStatus === 'fulfilled') {
      await dispatch(clearUserCart());
      dispatch(clearCart());
      navigate('/order-confirmation');
    }
  };

  const isBusy = cartLoading || checkoutLoading || orderLoading;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
          <div className="flex items-center justify-between md:justify-start md:gap-8 text-sm md:text-base">
            <div className={`flex items-center ${step >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold mr-2 ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="hidden md:inline">Shipping</span>
            </div>
            <div className="h-1 w-8 md:w-16 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold mr-2 ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="hidden md:inline">Payment</span>
            </div>
            <div className="h-1 w-8 md:w-16 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-orange-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold mr-2 ${step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="hidden md:inline">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {validationError && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {validationError}
              </div>
            )}
            {(cartError || checkoutError || orderError) && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {cartError?.Message || checkoutError?.Message || orderError?.Message || cartError || checkoutError || orderError}
              </div>
            )}

            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={shippingData.fullName}
                      onChange={handleShippingChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={shippingData.address}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />

                  <input
                    type="text"
                    name="address2"
                    placeholder="Address Line 2 (Optional)"
                    value={shippingData.address2}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />

                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingData.country}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={shippingData.pincode}
                      onChange={handleShippingChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </form>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleNextStep}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

                <div className="space-y-4">
                  <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">💳 Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">📱 UPI</p>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">🏦 Net Banking</p>
                      <p className="text-sm text-gray-600">All major banks</p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">👛 Digital Wallet</p>
                      <p className="text-sm text-gray-600">Amazon Pay, Apple Pay</p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">🚚 Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Order Review</h2>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                  <p className="text-gray-600 text-sm">
                    {shippingData.fullName}<br />
                    {shippingData.address}<br />
                    {shippingData.city}, {shippingData.state} {shippingData.pincode}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Payment Method</h3>
                  <p className="text-gray-600 text-sm">
                    {paymentMethod === 'credit-card' && 'Credit/Debit Card'}
                    {paymentMethod === 'upi' && 'UPI'}
                    {paymentMethod === 'netbanking' && 'Net Banking'}
                    {paymentMethod === 'wallet' && 'Digital Wallet'}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x {item.quantity}</span>
                        <span className="text-gray-800 font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isBusy}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isBusy ? 'Placing Order...' : `Place Order - ₹${total}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 line-clamp-2">{item.name}</span>
                    <span className="text-gray-800 font-semibold whitespace-nowrap ml-2">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : '₹' + shipping}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-orange-500">₹{total}</span>
                </div>
              </div>

              {subtotal <= 500 && (
                <p className="text-xs text-gray-500 mt-3 p-2 bg-blue-50 rounded">
                  💡 Add ₹{500 - subtotal} more for FREE shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


import {
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  // Demo UI Data
  const items = [
    {
      id: 1,
      name: "Organic Turmeric Powder",
      unit: "1 Kg Pack",
      price: 25,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
    },
  ];

  const totalPrice = items.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Empty Cart UI
  if (items.length === 0) {
    return (
      <div className="min-h-[600px] flex items-center justify-center px-4">
        <div className="text-center">

          <ShoppingCart
            size={64}
            className="text-gray-300 mx-auto mb-4"
          />

          <h2 className="text-2xl font-semibold mb-4">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mb-6">
            Add some products to get started
          </p>

          <Link
            to="/products"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg inline-block transition"
          >
            Browse Products
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Details */}
                  <div className="flex-1">

                    <h3 className="text-xl font-semibold mb-2">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 mb-4">
                      {item.unit}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">

                      <div className="flex items-center gap-2">
                        <label className="text-sm">
                          Quantity:
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          readOnly
                          className="w-20 px-3 py-1 border rounded-lg bg-gray-100"
                        />
                      </div>

                      <button
                        className="text-red-600 hover:text-red-700 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>

                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-semibold text-yellow-700 mb-2">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                    <p className="text-sm text-gray-500">
                      ${item.price} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">

              <h2 className="text-2xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>

                  <span className="text-2xl text-yellow-700">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-yellow-700 hover:text-yellow-800"
              >
                Continue Shopping
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t">

                <h3 className="font-semibold mb-3">
                  Bulk Order Benefits
                </h3>

                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Volume discounts available</li>
                  <li>• Custom packaging options</li>
                  <li>• Flexible payment terms</li>
                  <li>• Dedicated account manager</li>
                </ul>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
import { useState } from "react";
import {
  ShoppingCart,
  Package,
} from "lucide-react";

const products = [
  {
    id: "1",
    name: "Organic Turmeric Powder - 10kg",
    description:
      "Premium grade turmeric powder with 3-5% curcumin content.",
    price: 85,
    unit: "per bag",
    minOrder: 10,
    image:
      "https://images.unsplash.com/photo-1615485500834-bc10199bc727",
    curcuminContent: "3-5%",
  },
  {
    id: "2",
    name: "Organic Turmeric Powder - 25kg",
    description:
      "Bulk packaging with better pricing.",
    price: 190,
    unit: "per bag",
    minOrder: 4,
    image:
      "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9",
    curcuminContent: "3-5%",
  },
  {
    id: "3",
    name: "Fresh Turmeric Root - 20kg",
    description:
      "Farm-fresh organic turmeric roots.",
    price: 120,
    unit: "per box",
    minOrder: 20,
    image:
      "https://images.unsplash.com/photo-1666818398897-381dd5eb9139",
  },
];

function Products() {
  const [quantities, setQuantities] =
    useState({});

  const handleAddToCart = (
    product
  ) => {
    const quantity =
      quantities[product.id] ||
      product.minOrder;

    alert(
      `${quantity} units of ${product.name} added (UI only)`
    );
  };

  const updateQuantity = (
    productId,
    value,
    minOrder
  ) => {
    const newValue = Math.max(
      minOrder,
      value
    );

    setQuantities({
      ...quantities,
      [productId]: newValue,
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold mb-4">
            Wholesale Product Catalog
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our premium organic
            turmeric products.
          </p>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >

              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <div className="flex items-start justify-between mb-2">

                  <h3 className="text-xl font-semibold flex-1">
                    {product.name}
                  </h3>

                  {product.curcuminContent && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                      {
                        product.curcuminContent
                      }{" "}
                      curcumin
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <Package size={16} />
                  <span>
                    Min. Order:{" "}
                    {product.minOrder} units
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-semibold text-yellow-700">
                    ${product.price}
                  </span>

                  <span className="text-gray-500">
                    {product.unit}
                  </span>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min={product.minOrder}
                    value={
                      quantities[
                        product.id
                      ] ||
                      product.minOrder
                    }
                    onChange={(e) =>
                      updateQuantity(
                        product.id,
                        parseInt(
                          e.target.value
                        ) ||
                          product.minOrder,
                        product.minOrder
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Button */}
                <button
                  onClick={() =>
                    handleAddToCart(
                      product
                    )
                  }
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Products;
import { useState , useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts } from '../Redux/Slice/ProductSlice';
import { addToCart } from '../Redux/Slice/CartSlice';
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  UserRoundIcon,
} from "lucide-react";
import { getImageUrl } from '../Utils/getImageUrl';
function Products() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const {products,loading,error} = useSelector((state)=>state.products);
  const {user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllProducts());
    console.log("Products loaded:", products);
  },[dispatch])


  const handleAddToCart = (product) => {
    if(!user){
      navigate("/login");
      return;
    }
    const quantity = quantities[product._id] ?? (product.minOrder ?? 1);
    dispatch(addToCart({ productId: product._id, quantity }));
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
            Browse our premium B2B hing products for retailers, distributors
            and spice traders.
          </p>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >

              {/* Image */}
              <img
                src={getImageUrl(product.image) || '/placeholder-product.png'}
                alt={product.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/placeholder-product.png';
                }}
              />

              <div className="p-6">

                <div className="flex items-start justify-between mb-2">

                  <h3 className="text-xl font-semibold flex-1">
                    {product.name}
                  </h3>

                  {product.quality && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                      {product.quality}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <Package size={16} />
                  <span>
                    Min. Order: {product.moq || product.minOrder || 1} {product.unit || 'units'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 items-center mb-4 text-sm text-gray-500">
                  {product.productType && <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1">{product.productType}</span>}
                  {product.packagingSize && <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1">Pack: {product.packagingSize}</span>}
                  {product.availability && <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2 py-1">{product.availability}</span>}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-semibold text-yellow-700">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
                    </span>
                    {product.bulkPrice ? (
                      <p className="text-xs text-gray-500">Bulk: ₹{product.bulkPrice}</p>
                    ) : null}
                  </div>

                  <span className="text-gray-500">
                    {product.unit || ''}
                  </span>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min={product.moq || product.minOrder || 1}
                    value={quantities[product._id] ?? (product.moq || product.minOrder || 1)}
                    onChange={(e) =>
                      updateQuantity(
                        product._id,
                        parseInt(e.target.value) || (product.moq || product.minOrder || 1),
                        product.moq || product.minOrder || 1
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Button */}
                <div className="grid gap-3">
                  <Link
                    to={`/products/${product._id}`}
                    className="w-full inline-flex items-center justify-center rounded-lg border border-yellow-600 text-yellow-700 py-2 hover:bg-yellow-50 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Products;
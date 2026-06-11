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
function Products() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const {products,loading,error} = useSelector((state)=>state.products);
  const {user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllProducts());
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
            Browse our premium organic
            turmeric products.
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
                src={product.image?.url || '/placeholder-product.png'}
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
                    Min. Order: {product.minOrder ?? 1} {product.unit || 'units'}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-semibold text-yellow-700">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                  </span>

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
                    min={product.minOrder}
                    value={quantities[product._id] ?? (product.minOrder ?? 1)}
                    onChange={(e) =>
                      updateQuantity(
                        product._id,
                        parseInt(e.target.value) || (product.minOrder ?? 1),
                        product.minOrder ?? 1
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
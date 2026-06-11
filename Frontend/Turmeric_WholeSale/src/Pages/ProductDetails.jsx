import { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductById } from "../Redux/Slice/ProductSlice"

function ProductDetails() {
  const {product,loading,error}=useSelector((state)=>state.products);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  useEffect(()=>{
    if (productId) dispatch(fetchProductById(productId));
  },[dispatch, productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 inline-flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={16} />
            Back to catalog
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`${quantity} units of ${product.name} added to cart (UI only)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-96 lg:h-full">
            <img
              src={product.image?.url || '/placeholder-product.png'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 lg:p-12">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 text-yellow-700 hover:text-yellow-900 mb-6"
            >
              <ArrowLeft size={18} />
              Back to products
            </button>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl bg-yellow-50 p-4">
                <p className="text-sm uppercase tracking-wide text-gray-500">Price</p>
                <p className="text-3xl font-semibold text-yellow-700">${product.price}</p>
                <p className="text-sm text-gray-500">{product.unit}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm uppercase tracking-wide text-gray-500">Minimum order</p>
                <p className="text-2xl font-semibold">{product.minOrder} units</p>
                <p className="text-sm text-gray-500">Curcumin: {product.curcuminContent}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min={product.minOrder}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minOrder, Number(e.target.value) || product.minOrder))}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-600 px-6 py-3 text-white font-semibold hover:bg-yellow-700 transition"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-yellow-600 px-6 py-3 text-yellow-700 font-semibold hover:bg-yellow-50 transition"
                >
                  Go to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

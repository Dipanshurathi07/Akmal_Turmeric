import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../Redux/Slice/ProductSlice'; // adjust path as needed
import { ArrowLeft, Upload, Save, X } from 'lucide-react';

const CATEGORIES = ['Grains', 'Spices', 'Pulses', 'Vegetables', 'Fruits', 'Dairy', 'Other'];
const UNITS = ['kg', 'g', 'ton', 'litre', 'piece', 'bag', 'box'];
const AVAILABILITY = ['In stock', 'Out of stock', 'Pre-order', 'Seasonal'];

const inputCls = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white";

const initialState = {
  name: '',
  price: '',
  description: '',
  category: '',
  stock: '',
  minOrder: '',
  moq: '',
  unit: 'kg',
  productType: '',
  quality: '',
  productGrade: '',
  packaging: '',
  packagingSize: '',
  bulkPrice: '',
  wholesaleDiscount: '',
  leadTime: '',
  exportQuality: '',
  availability: 'In stock',
};

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(addProduct(form)).unwrap();
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to add product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-4xl font-bold">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-100">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Basmati Rice" className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹)</label>
                <input name="price" type="number" min="0" value={form.price} onChange={handleChange}
                  placeholder="0.00" className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit</label>
                <select name="unit" value={form.unit} onChange={handleChange} className={inputCls}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  rows={3} placeholder="Describe the product..." className={inputCls} />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-100">Product Image</h2>
            <div className="flex items-start gap-6">
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition overflow-hidden">
                {imagePreview
                  ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  : <>
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 text-center px-2">Click to upload image</span>
                    </>
                }
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {imagePreview && (
                <button type="button" onClick={() => { setImage(null); setImagePreview(null); }}
                  className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-700 mt-2">
                  <X size={14} /> Remove image
                </button>
              )}
            </div>
          </div>

          {/* Stock & Order */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-100">Stock & Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
                <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange}
                  placeholder="0" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Order</label>
                <input name="minOrder" type="number" min="1" value={form.minOrder} onChange={handleChange}
                  placeholder="1" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">MOQ</label>
                <input name="moq" type="number" min="1" value={form.moq} onChange={handleChange}
                  placeholder="1" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label>
                <select name="availability" value={form.availability} onChange={handleChange} className={inputCls}>
                  {AVAILABILITY.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Lead Time</label>
                <input name="leadTime" value={form.leadTime} onChange={handleChange}
                  placeholder="e.g. 3-5 days" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-100">Bulk Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bulk Price (₹)</label>
                <input name="bulkPrice" type="number" min="0" value={form.bulkPrice} onChange={handleChange}
                  placeholder="0.00" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Wholesale Discount (%)</label>
                <input name="wholesaleDiscount" type="number" min="0" max="100" value={form.wholesaleDiscount}
                  onChange={handleChange} placeholder="0" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-100">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: 'productType', label: 'Product Type', placeholder: 'e.g. Organic' },
                { name: 'quality', label: 'Quality', placeholder: 'e.g. Premium' },
                { name: 'productGrade', label: 'Product Grade', placeholder: 'e.g. Grade A' },
                { name: 'packaging', label: 'Packaging', placeholder: 'e.g. Jute bag' },
                { name: 'packagingSize', label: 'Packaging Size', placeholder: 'e.g. 50kg' },
                { name: 'exportQuality', label: 'Export Quality', placeholder: 'e.g. APEDA certified' },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input name={name} value={form[name]} onChange={handleChange}
                    placeholder={placeholder} className={inputCls} />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2 pb-8">
            <button type="submit" disabled={loading}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700
                disabled:opacity-60 disabled:cursor-not-allowed
                text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md">
              <Save size={16} />
              {loading ? 'Saving...' : 'Add Product'}
            </button>
            <button type="button" onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default NewProduct;
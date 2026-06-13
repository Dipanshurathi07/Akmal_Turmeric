import React, { useEffect, useState } from 'react'
import { fetchAllProducts, deleteProduct } from '../../Redux/Slice/ProductSlice';
import { useDispatch, useSelector } from "react-redux";
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ManageProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);

  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch]);

  const handleDeleteProduct = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (confirmDelete) {
    dispatch(deleteProduct(id));
  }
};
const handleAddProduct = () => {
  navigate("/admin/add-product");
}
const handleEditProduct = (id) => {
  navigate(`/admin/edit/${id}`);
}
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Manage Products</h1>
          <button className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700
         text-white text-sm font-medium px-4 py-2 rounded-lg transition-all
         shadow-[0_2px_0_#15803d] hover:shadow-[0_3px_0_#166534]
         hover:-translate-y-px active:translate-y-px active:shadow-none"
         onClick={handleAddProduct}> <Plus />Add Product</button>
        </div>

      {/* Mobile Card View */}
      {/* Mobile Card View */}
<div className="md:hidden space-y-3 mb-6">
  {products.map((product) => (
    <div key={product._id || product.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-gray-800">{product.name}</p>
          <p className="text-xs text-gray-600 mt-1">{product.category}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold transition"
            onClick={() => handleEditProduct(product._id || product.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold transition"
            onClick={() => handleDeleteProduct(product._id || product.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-600 text-xs">Price</p>
          <p className="font-semibold text-gray-800">₹{product.price}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-600 text-xs">Availability</p>
          <p className="font-semibold text-gray-800">{product.availability || 'Pending'}</p>
        </div>
      </div>
    </div>
  ))}
</div>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">MOQ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Availability</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id || product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{product.name}</td>
                <td className="px-4 py-3 text-gray-800">₹{product.price}</td>
                <td className="px-4 py-3 text-gray-800">{product.moq || product.minOrder}</td>
                <td className="px-4 py-3 text-gray-800">{product.category}</td>
                <td className="px-4 py-3 text-gray-800">{product.availability || 'Pending'}</td>
                <td className="px-4 py-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold mr-2 transition"
                  onClick={()=>handleEditProduct(product._id || product.id)}>Edit</button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition"
                    onClick={() => handleDeleteProduct(product._id || product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default ManageProducts;

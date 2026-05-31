import React, { useState } from 'react'

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Turmeric Powder Premium', price: 450, stock: 120, category: 'Spices' },
    { id: 2, name: 'Organic Turmeric', price: 550, stock: 80, category: 'Organic' },
    { id: 3, name: 'Turmeric Capsules', price: 350, stock: 200, category: 'Supplements' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' })

  const handleAddProduct = () => {
    if (formData.name && formData.price && formData.stock) {
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      }
      setProducts([...products, newProduct])
      setFormData({ name: '', price: '', stock: '', category: '' })
      setShowForm(false)
    }
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="pb-20 md:pb-0">
      <div className="flex justify-between items-center mb-6 gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base" onClick={() => setShowForm(!showForm)}>
          ➕ Add
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:border-orange-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:border-orange-500"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:border-orange-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="button" className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-semibold transition text-sm" onClick={handleAddProduct}>
              Save
            </button>
            <button type="button" className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-semibold transition text-sm" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 mb-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-600 mt-1">{product.category}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold transition"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600 text-xs">Price</p>
                <p className="font-semibold text-gray-800">₹{product.price}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600 text-xs">Stock</p>
                <p className="font-semibold text-gray-800">{product.stock}</p>
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{product.name}</td>
                <td className="px-4 py-3 text-gray-800">₹{product.price}</td>
                <td className="px-4 py-3 text-gray-800">{product.stock}</td>
                <td className="px-4 py-3 text-gray-800">{product.category}</td>
                <td className="px-4 py-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold mr-2 transition">Edit</button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition"
                    onClick={() => handleDeleteProduct(product.id)}
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
  )
}

export default ManageProducts

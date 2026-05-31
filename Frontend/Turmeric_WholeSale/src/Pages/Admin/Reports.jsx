import React, { useState } from 'react'

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('sales')

  const [reportData] = useState({
    sales: {
      title: 'Sales Report',
      data: [
        { month: 'January', revenue: 45000, orders: 120 },
        { month: 'February', revenue: 52000, orders: 135 },
        { month: 'March', revenue: 48000, orders: 128 },
        { month: 'April', revenue: 61000, orders: 155 },
        { month: 'May', revenue: 55000, orders: 142 },
      ],
    },
    inventory: {
      title: 'Inventory Report',
      data: [
        { product: 'Turmeric Powder', quantity: 120, value: 54000 },
        { product: 'Organic Turmeric', quantity: 80, value: 44000 },
        { product: 'Turmeric Capsules', quantity: 200, value: 70000 },
        { product: 'Turmeric Tablets', quantity: 150, value: 45000 },
      ],
    },
    customers: {
      title: 'Customer Report',
      data: [
        { segment: 'New Customers', count: 245, spent: 125000 },
        { segment: 'Returning Customers', count: 1005, spent: 580000 },
        { segment: 'VIP Customers', count: 125, spent: 450000 },
      ],
    },
  })

  const currentReport = reportData[selectedReport]

  return (
    <div className="pb-20 md:pb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Reports</h2>

      {/* Button Group - Mobile optimized */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          className={`px-3 md:px-4 py-2 md:py-2 rounded-lg font-semibold transition whitespace-nowrap text-sm md:text-base ${
            selectedReport === 'sales'
              ? 'bg-orange-500 text-white'
              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500'
          }`}
          onClick={() => setSelectedReport('sales')}
        >
          📊 Sales
        </button>
        <button
          className={`px-3 md:px-4 py-2 md:py-2 rounded-lg font-semibold transition whitespace-nowrap text-sm md:text-base ${
            selectedReport === 'inventory'
              ? 'bg-orange-500 text-white'
              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500'
          }`}
          onClick={() => setSelectedReport('inventory')}
        >
          📦 Inventory
        </button>
        <button
          className={`px-3 md:px-4 py-2 md:py-2 rounded-lg font-semibold transition whitespace-nowrap text-sm md:text-base ${
            selectedReport === 'customers'
              ? 'bg-orange-500 text-white'
              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500'
          }`}
          onClick={() => setSelectedReport('customers')}
        >
          👥 Customers
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">{currentReport.title}</h3>
        
        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 mb-6">
          {currentReport.data.map((row, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              {Object.entries(row).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1">
                  <span className="text-xs font-semibold text-gray-600 uppercase">{key}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {typeof value === 'number' && value > 100 ? `₹${value.toLocaleString()}` : value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                {Object.keys(currentReport.data[0]).map((key) => (
                  <th key={key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentReport.data.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="px-4 py-3 text-sm text-gray-800">
                      {typeof value === 'number' && value > 100 ? `₹${value.toLocaleString()}` : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base">
            📥 PDF
          </button>
          <button className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base">
            📤 CSV
          </button>
          <button className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base">
            🖨️ Print
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports

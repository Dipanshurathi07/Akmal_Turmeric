import React, { useState } from 'react'

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', role: 'Customer', joinDate: '2025-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 8765432109', role: 'Customer', joinDate: '2025-02-20', status: 'Active' },
    { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com', phone: '+91 7654321098', role: 'Admin', joinDate: '2024-12-01', status: 'Active' },
    { id: 4, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 6543210987', role: 'Customer', joinDate: '2025-03-10', status: 'Inactive' },
  ])

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="pb-20 md:pb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Users</h2>

      {/* Stats - Mobile optimized */}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-6 mb-6">
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <span className="text-xs md:text-sm font-semibold uppercase text-gray-600">Total</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-900 block mt-1">{users.length}</span>
        </div>
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <span className="text-xs md:text-sm font-semibold uppercase text-gray-600">Active</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-900 block mt-1">{users.filter((u) => u.status === 'Active').length}</span>
        </div>
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <span className="text-xs md:text-sm font-semibold uppercase text-gray-600">Admins</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-900 block mt-1">{users.filter((u) => u.role === 'Admin').length}</span>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{user.phone.slice(0, 10)}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Joined</p>
                <p className="font-semibold text-gray-800">{user.joinDate.slice(5)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                className="flex-1 px-2 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-orange-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs font-semibold transition"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.joinDate}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-orange-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold transition">View</button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
                      onClick={() => handleDeleteUser(user.id)}
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

export default ManageUsers

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, deleteUser, updateUser } from '../../Redux/Slice/AdminSlice'

const ManageUsers = () => {
  const dispatch = useDispatch()
  const { users = [], loading, error } = useSelector((state) => state.admin ?? {})

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  // Poll for updates every 15 seconds to keep counts real-time-ish
  useEffect(() => {
    const id = setInterval(() => dispatch(fetchAllUsers()), 15000);
    return () => clearInterval(id);
  }, [dispatch]);

  const [pending, setPending] = useState({});

  const handleStatusChange = async (userId, newStatus) => {
    setPending((p) => ({ ...p, [userId]: true }));
    try {
      await dispatch(updateUser({ userId, userData: { status: newStatus } }));
      // ensure store is fresh
      dispatch(fetchAllUsers());
    } finally {
      setPending((p) => ({ ...p, [userId]: false }));
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return
    setPending((p) => ({ ...p, [userId]: true }));
    try {
      await dispatch(deleteUser(userId));
      dispatch(fetchAllUsers());
    } finally {
      setPending((p) => ({ ...p, [userId]: false }));
    }
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
          <span className="text-2xl md:text-3xl font-bold text-gray-900 block mt-1">{users.filter((u) => (u.status || '').toLowerCase() === 'active').length}</span>
        </div>
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <span className="text-xs md:text-sm font-semibold uppercase text-gray-600">Admins</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-900 block mt-1">{users.filter((u) => (u.role || '').toLowerCase() === 'admin').length}</span>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div key={user._id || user.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-800">{user.name || user.fullName || user.username}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {(user.role || '').charAt(0).toUpperCase() + (user.role || '').slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{(user.phone || '').slice(0, 15)}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Joined</p>
                <p className="font-semibold text-gray-800">{new Date(user.createdAt || user.joinDate || user.date || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(user._id || user.id, e.target.value)}
                disabled={loading}
                className="flex-1 px-2 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-orange-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs font-semibold transition"
                onClick={() => handleDeleteUser(user._id || user.id)}
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
                <tr key={user._id || user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{user.name || user.fullName || user.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      (user.role || '').toLowerCase() === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {(user.role || '').charAt(0).toUpperCase() + (user.role || '').slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{new Date(user.createdAt || user.joinDate || Date.now()).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user._id || user.id, e.target.value)}
                      disabled={loading}
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
                      onClick={() => handleDeleteUser(user._id || user.id)}
                      disabled={loading}
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

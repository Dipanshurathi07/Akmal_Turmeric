import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from "../../Redux/Slice/AuthSlice"; // adjust path

const AdminUserProfile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state) => state.auth ?? {});

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-center">
                    <p className="font-semibold">Something went wrong</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-gray-500 text-lg">User not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
                {/* Header / Banner */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-28 relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                            <span className="text-3xl font-bold text-indigo-600">
                                {user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-14 pb-6 px-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <span className="inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 capitalize">
                        {user.role}
                    </span>

                    <div className="mt-6 space-y-3 text-left">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 text-sm">Email</span>
                            <span className="text-gray-800 text-sm font-medium">{user.email}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 text-sm">Phone</span>
                            <span className="text-gray-800 text-sm font-medium">{user.Contact || "N/A"}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 text-sm">Joined</span>
                            <span className="text-gray-800 text-sm font-medium">
                                {new Date(user.createdAt).toDateString()}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/admin/users')}
                        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-colors"
                    >
                        ← Back to Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminUserProfile;
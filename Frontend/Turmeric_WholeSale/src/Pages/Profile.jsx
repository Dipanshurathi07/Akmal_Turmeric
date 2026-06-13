import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Smartphone, ShieldCheck, CalendarDays } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-3">No user logged in</h2>
          <p className="text-gray-500 mb-6">Please log in to view your profile details.</p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="bg-yellow-600 text-white p-8 lg:w-1/3 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-semibold">{user?.name || 'User'}</h1>
                <p className="text-sm opacity-90">{user?.role ? user.role.toUpperCase() : 'Customer'}</p>
              </div>
            </div>

            <div className="p-8 lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Profile Information</h2>
              <p className="text-gray-600 mb-8">Welcome to your Profile.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4 text-gray-700">
                    <User size={20} />
                    <span className="font-semibold">Name</span>
                  </div>
                  <p className="text-gray-900">{user.name || 'Not Provided'}</p>
                </div>

                <div className="rounded-3xl border border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4 text-gray-700">
                    <Mail size={20} />
                    <span className="font-semibold">Email</span>
                  </div>
                  <p className="text-gray-900">{user.email || 'Not Provided'}</p>
                </div>

                <div className="rounded-3xl border border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4 text-gray-700">
                    <Smartphone size={20} />
                    <span className="font-semibold">Contact</span>
                  </div>
                  <p className="text-gray-900">{user.Contact || 'Not Provided'}</p>
                </div>

                <div className="rounded-3xl border border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4 text-gray-700">
                    <ShieldCheck size={20} />
                    <span className="font-semibold">Account Type</span>
                  </div>
                  <p className="text-gray-900">{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Customer'}</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-gray-200 p-6 bg-white">
                <div className="flex items-center gap-3 text-gray-700 mb-4">
                  <CalendarDays size={20} />
                  <span className="font-semibold">Member since</span>
                </div>
                <p className="text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

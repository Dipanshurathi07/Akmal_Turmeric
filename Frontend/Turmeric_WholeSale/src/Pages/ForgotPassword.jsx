import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Redux/Slice/AuthSlice";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    if (!email) {
      setLocalError("Please enter your email address.");
      return;
    }

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message?.toLowerCase().includes("otp sent")) {
      navigate("/verify-otp", { state : {email , mode : "reset"}});
    }
  }, [message, navigate, email]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Mail className="mx-auto text-yellow-600" size={40} />
          <h2 className="text-3xl font-bold mt-4">Forgot Password</h2>
          <p className="text-gray-600 mt-2">Enter your registered email and we will send you a verification code.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {message && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="your@email.com"
                required
              />
            </div>

            {(localError || error) && <p className="text-red-600 text-sm">{localError || error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-yellow-700 hover:text-yellow-800 font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

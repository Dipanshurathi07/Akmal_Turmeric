import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Redux/Slice/AuthSlice";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);

  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is missing. Please restart the password reset flow.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please confirm your new password.");
      return;
    }

    setError("");
    const resultAction = await dispatch(resetPassword({ email, password }));

    if (resetPassword.fulfilled.match(resultAction)) {
      setSuccess("Your password has been updated successfully.");
      navigate("/login");
    } else {
      setError(resultAction.payload?.Message || resultAction.error?.message || "Failed to reset password.");
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Lock className="mx-auto text-yellow-600" size={40} />
          <h2 className="text-3xl font-bold mt-4">Reset Password</h2>
          <p className="text-gray-600 mt-2">
            {email
              ? `Create a new password for ${email}.`
              : "Create a new password to finish resetting your account."}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto text-green-600" size={36} />
              <p className="text-green-700 font-medium">{success}</p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Create New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="New password"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Confirm password"
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition"
              >
                Reset Password
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                <Link
                  to="/login"
                  className="text-yellow-700 hover:text-yellow-800 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

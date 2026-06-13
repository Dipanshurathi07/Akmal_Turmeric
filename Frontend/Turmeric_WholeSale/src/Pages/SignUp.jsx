import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../Redux/Slice/AuthSlice";

function SignUp() {
  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const verifiedEmail = location.state?.email || "";
  const [formData, setFormData] = useState({
    name: "",
    email: verifiedEmail,
    password: "",
    contact: "",
  });

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    if(message && message.toLowerCase().includes("registration successful")) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/verify-email");
    }
  }, [verifiedEmail, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">

      <div className="max-w-md w-full">

        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles
              className="text-yellow-600"
              size={32}
            />

            <h1 className="text-2xl font-semibold text-yellow-700">
              Paka Nafsa Trading Private Limited
            </h1>
          </div>

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600">Your email is already verified. Complete the registration form below.</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Company */}
            <div>
              <label className="block mb-2 font-medium">
                Name *
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your Company Ltd."
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Business Email *
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                readOnly={Boolean(verifiedEmail)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                placeholder="your@company.com"
              />
            </div>

            {/* contact */}
            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                value={formData.contact}
                onChange={(e) =>
                  updateField(
                    "contact",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password *
              </label>

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  updateField(
                    "password",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {/* Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg transition"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}

              <Link
                to="/login"
                className="text-yellow-700 hover:text-yellow-800 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUp;
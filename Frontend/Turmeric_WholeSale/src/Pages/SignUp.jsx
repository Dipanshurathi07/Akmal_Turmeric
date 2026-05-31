import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
  });

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup UI only");
  };

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

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-600">
            Start ordering premium turmeric wholesale
          </p>
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
                value={formData.companyName}
                onChange={(e) =>
                  updateField(
                    "companyName",
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
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="your@company.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block mb-2 font-medium">
                Country
              </label>

              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  updateField(
                    "country",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="India"
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

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password *
              </label>

              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateField(
                    "confirmPassword",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition"
            >
              Create Account
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

export default Signup;
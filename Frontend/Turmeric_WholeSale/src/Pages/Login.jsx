import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Eye, EyeOff } from "lucide-react";

function Login() {
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const updateField = (
    field,
    value
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login UI only");
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
            Welcome Back
          </h2>

          <p className="text-gray-600">
            Sign in to your account
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Email Address
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
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
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

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="rounded"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-yellow-700 hover:text-yellow-800"
              >
                Forgot Password?
              </button>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition"
            >
              Sign In
            </button>

          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}

              <Link
                to="/signup"
                className="text-yellow-700 hover:text-yellow-800 font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
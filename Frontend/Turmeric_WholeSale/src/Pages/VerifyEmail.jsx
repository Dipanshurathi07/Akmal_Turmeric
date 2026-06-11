import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { sendRegistrationOtp } from "../Redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRegistrationOtp(email));
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Mail className="mx-auto text-yellow-600" size={40} />

          <h2 className="text-3xl font-bold mt-4">
            Verify Your Email
          </h2>

          <p className="text-gray-600 mt-2">
            Enter your email address to receive a verification email.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition"
            >
              Verify Email
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-yellow-700 hover:text-yellow-800 font-medium"
              >
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, verifyRegistrationOtp } from "../Redux/Slice/AuthSlice";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.auth
  );
  const localError = error || (message && !message.toLowerCase().includes("otp verified") ? message : "");
  const email = location.state?.email || "";
  const mode = location.state?.mode || "register";
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if(mode==="reset"){
      const result = await dispatch(verifyOtp({ email, otp }));
      if (verifyOtp.fulfilled.match(result)) {
        navigate("/reset-password", { state: { email } });
      } else {
        alert(result.payload?.Message || "OTP verification failed. Please try again.");
      }
    }else{
    const resultAction = await dispatch(verifyRegistrationOtp({ email, otp }));

    if (verifyRegistrationOtp.fulfilled.match(resultAction)) {
      navigate("/signup", { state: { email } });
    } else {
      alert(resultAction.payload?.Message || "OTP verification failed. Please try again.");
    }
  }};

  useEffect(() => {
    if (!email) {
      navigate("/verify-email");
    }
  }, [email, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Mail
            className="mx-auto text-yellow-600"
            size={40}
          />

          <h2 className="text-3xl font-bold mt-4">
            Verify OTP
          </h2>

          <p className="text-gray-600 mt-2">
            Enter the OTP sent to your email.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={handleVerify}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 font-medium">
                OTP Code
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter OTP"
                required
              />
            </div>

            {(localError || error) && (
              <p className="text-red-600 text-sm">
                {localError || error}
              </p>
            )}

            {message && (
              <p className="text-green-600 text-sm">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 text-white py-3 rounded-lg transition"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

            <div className="text-center text-sm text-gray-600">
              <Link
                to="/signup"
                className="text-yellow-700 hover:text-yellow-800 font-medium"
              >
                Back to Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
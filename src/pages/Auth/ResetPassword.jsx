import { useState, useRef } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordValue = watch("password", "");
 
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) otpRefs.current[index + 1].focus();
    }
  };
 
  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtp(pasted.split(""));
      otpRefs.current[5].focus();
    }
  };
 
  const handleRequestOtp = async (data) => {
    setLoading(true);
    try {
      await api.post("/auth/request-reset", { email: data.email });
      toast.success("OTP sent to your email!");
      setEmail(data.email);
      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };
 
  const handleVerifyOtp = async () => {
    if (otp.join("").length < 6) {
      toast.error("Enter full OTP");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/verify-otp", { email, otp: otp.join("") });
      toast.success("OTP verified!");
      setStep(3);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
 
  const handleResetPassword = async (data) => {
    if (otp.join("").length < 6) {
      toast.error("OTP missing");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp: otp.join(""),
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Password reset successfully!");
      toast.success("You can signin now.");
      navigate("/auth/signin");
      setEmail("");
      setOtp(Array(6).fill(""));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-[500px] w-full xl:mx-auto mx-3 mt-10"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={
          step === 1
            ? handleSubmit(handleRequestOtp)
            : step === 2
            ? (e) => {
                e.preventDefault();
                handleVerifyOtp();
              }
            : handleSubmit(handleResetPassword)
        }
        className="rounded-2xl border border-zinc-200 shadow-md p-8 w-full bg-white"
      >
        <h1 className="text-primary font-semibold text-2xl text-center mb-6">
          Reset Your Password
        </h1>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="mb-4">
            <label className="text-primary font-semibold mb-1 block">
              Email
            </label>
            <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
              <Mail className="text-zinc-400 w-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="outline-none w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="mb-6">
            <label className="text-primary font-semibold mb-3 block">
              Enter OTP
            </label>
            <div className="flex justify-between" onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className="w-12 h-12 border rounded-md text-center text-lg focus:outline-none focus:border-indigo-500"
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <div>
              <div className="mb-4 relative">
                <label className="text-primary font-semibold mb-1 block">
                  New Password
                </label>
                <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
                  <Lock className="text-zinc-400 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="outline-none w-full"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4 relative">
                <label className="text-primary font-semibold mb-1 block">
                  Confirm Password
                </label>
                <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
                  <Lock className="text-zinc-400 w-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="outline-none w-full"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full "
        >
          {loading
            ? "Please wait..."
            : step === 1
            ? "Send OTP"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </button>

        <p className="text-center mt-3 text-sm text-gray-700">
          Back to?{" "}
          <Link
            to="/auth/signin"
            className="text-[#4B1E2F] font-medium underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default ResetPassword;

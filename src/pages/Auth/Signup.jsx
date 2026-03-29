/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Mail, Phone, Lock, Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../utils/api";

const Signup = () => {
  // const { setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      // setUser(res.data);
      if (res.data) {
        navigate("/auth/complete-profile");
        toast.success("Account created successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-125 w-full xl:mx-auto mx-3"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-zinc-200 shadow-md p-8 w-full bg-white"
      >
        <h1 className="text-primary font-semibold text-2xl text-center mb-6">
          Create Your Account
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="text-primary font-semibold mb-1 block">Email</label>
          <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
            <Mail className="text-zinc-400 w-5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="outline-none w-full h-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="text-primary font-semibold mb-1 block">Phone</label>
          <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
            <Phone className="text-zinc-400 w-5" />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="outline-none w-full h-full"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="text-primary font-semibold mb-1 block">
            Password
          </label>
          <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
            <Lock className="text-zinc-400 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="outline-none w-full h-full"
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
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="text-primary font-semibold mb-1 block">
            Confirm Password
          </label>
          <div className="border flex items-center gap-2 p-3 rounded-md border-zinc-200 text-sm">
            <Lock className="text-zinc-400 w-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="outline-none w-full h-full"
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
              {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 accent-[#4B1E2F]"
            {...register("terms", {
              required: "You must agree to the Terms & Conditions",
            })}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-[#4B1E2F] underline">
              Terms & Conditions
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-600 text-sm mb-4">{errors.terms.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Navigation to Signin */}
        <p className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-[#4B1E2F] font-medium underline"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Signup;

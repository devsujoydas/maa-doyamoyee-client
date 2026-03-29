import { useState } from "react";
import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form"; 
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; 
import { motion } from "framer-motion";
import api from "../../utils/api";

const Signin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then(res=>{ 
        navigate("/account")
        // setUser(res.data)
        toast.success("Logged in successfully!");
      })
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
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-zinc-200 shadow-md p-8 w-full bg-white"
      >
        <h1 className="text-primary font-semibold text-2xl text-center mb-6">
          Welcome Back
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="text-primary font-semibold mb-1 block">Email</label>
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
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
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
              className="outline-none w-full"
              {...register("password", {
                required: "Password is required",
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

        {/* Remember me & Forgot password */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#4B1E2F]"
              {...register("remember")}
              required
            />
            Remember me
          </label>
          <Link
            to="/auth/reset-password"
            className="text-[#4B1E2F] text-sm font-medium underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-md"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Navigation to Signup */}
        <p className="text-center mt-6 text-sm text-gray-700">
          New to Our Platform?{" "}
          <Link
            to="/auth/signup"
            className="text-[#4B1E2F] font-medium underline"
          >
            Sign Up here
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Signin;


const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  // 🎨 Variant styles
  const variants = {
    default: "bg-[#CF4517] text-white hover:bg-[#CF4100] ",
    secondary: "hover:bg-green-500 hover:text-white  ",

    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:text-white hover:bg-zinc-400",
    destructive: "hover:bg-red-500 text-red-500 hover:text-white hover:bg-red-600",
  };

  // 📏 Size styles
  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10 flex items-center justify-center",
  };

  return (
    <button
      className={`   
        inline-flex items-center justify-center gap-2 cursor-pointer rounded-lg font-medium transition
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.default}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
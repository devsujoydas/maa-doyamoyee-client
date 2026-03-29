
const Input = ({ className = "", type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={`
        w-full h-10 px-4 py-2 rounded-lg border border-gray-300
        bg-white text-sm placeholder-gray-400
        outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      placeholder={props.placeholder}
      className={`
        w-full min-h-16 px-3 py-2 rounded-md border  border-gray-300
        bg-white text-sm placeholder-gray-500
        outline-none 
        disabled:opacity-50
        ${className}
      `}
      {...props}
    />
  );
};

export default Textarea;

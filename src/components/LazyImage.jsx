import { useState } from "react";

const LazyImage = ({ src, alt, className, placeholder }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-200">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
      <img loading="lazy"
        src={src || placeholder}
        alt={alt}
        className={`${className} h-full  transform hover:scale-125 transition duration-500 cursor-pointer transition-all${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
import loadingImg from "/loading.webp";

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen fixed inset-0 flex justify-center items-center z-50 bg-linear-to-br from-indigo-900 via-purple-900 to-black backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Image with smooth pulse, scale, and shadow */}
        <div className="animate-pulse transform hover:scale-110 transition-transform duration-700">
          <img
            loading="lazy"
            src={loadingImg}
            alt="Loading"
            className="w-36 h-36 object-contain rounded-full shadow-2xl drop-shadow-2xl"
          />
        </div>

        {/* Loading text with gradient pulse */}
        <p className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-red-500 text-2xl font-bold animate-pulse">
          Loading...
        </p>

        {/* Colorful bouncing dots */}
        <div className="flex space-x-3 mt-4">
          <span className="w-4 h-4 rounded-full bg-purple-400 animate-bounce delay-75 shadow-lg"></span>
          <span className="w-4 h-4 rounded-full bg-pink-500 animate-bounce delay-150 shadow-lg"></span>
          <span className="w-4 h-4 rounded-full bg-red-500 animate-bounce delay-300 shadow-lg"></span>
        </div>

        {/* Optional subtext */}
        <p className="text-gray-300 text-sm animate-pulse mt-2">
          Please wait while we load the content...
        </p>
      </div>

      {/* Optional subtle background animated blur */}
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-800 via-purple-900 to-black opacity-30 blur-3xl animate-pulse"></div>
    </div>
  );
};

export default LoadingPage;
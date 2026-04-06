import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-2">
        <h1 className="font-semibold text-2xl">
          This page isn't available right now
        </h1>
        <p className="text-">
          This may be because of a technical error that we're working <br /> to
          get fixed. Try reloading this page.
        </p>
        <div className="flex justify-center items-center">
          <button onClick={() => navigate(-1)} className="btn-primary">
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

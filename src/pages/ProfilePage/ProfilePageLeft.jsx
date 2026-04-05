import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
  FaGithub,
} from "react-icons/fa";
import { Camera, DollarSign, LockIcon, LogOut, User } from "lucide-react";
import api from "../../utils/api";

const ProfilePageLeft = ({
  user,
  setUser,
  activeTab,
  setActiveTab,
  setPhotoType,
  setPhotoModalOpen,
  setProfileModalOpen,
}) => {
  const [verifying, setVerifying] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      setVerifying(true);
      const res = await api.post("/api/verify-email/request", {
        email: user.email,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return;

    const verifyToken = async () => {
      try {
        const res = await api.get(`/api/verify-email/verify?token=${token}`);
        toast.success(res.data.message);
        setUser((prev) => ({ ...prev, isVerified: true }));
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } catch (err) {
        toast.error(err.response?.data?.message || "Email verification failed");
      }
    };

    verifyToken();
  }, [setUser]);

  return (
    <div className="xl:w-1/3 bg-white rounded-xl shadow-md overflow-hidden xl:sticky top-0 h-fit">
      {/* Cover */}
      <div className="h-48 relative">
        <img src={user?.coverImage} className="w-full h-full object-cover" />
        <button
          onClick={() => {
            setPhotoType("cover");
            setPhotoModalOpen(true);
          }}
          className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative -mt-20">
          <img
            src={user?.profileImage}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow"
          />
          <button
            onClick={() => {
              setPhotoType("profile");
              setPhotoModalOpen(true);
            }}
            className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full"
          >
            <Camera size={16} />
          </button>
        </div>

        <h2 className="mt-4 text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-500">@{user?.username}</p>

        {/* Role + Verify */}
        <div className="flex gap-2 mt-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              user?.role === "admin"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user?.role}
          </span>

          {user?.isVerified ? (
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
              Verified
            </span>
          ) : (
            <button
              onClick={sendVerificationEmail}
              className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded"
            >
              {verifying ? "Sending..." : "Verify"}
            </button>
          )}
        </div>

        <p className="mt-4 text-gray-600 text-center">{user?.bio}</p>

        {user?.addressInfo && (
          <div className="mt-4 text-gray-700 text-sm w-full text-center">
            {user?.addressInfo.address && (
              <p>
                <strong>Address:</strong> {user?.addressInfo?.address},{" "}
                {user?.addressInfo?.city}, {user?.addressInfo?.state},{" "}
                {user?.addressInfo?.postalCode}, {user?.addressInfo?.country}
              </p>
            )}
          </div>
        )}

        {/* Social */}
        <div className="mt-4 w-full space-y-2">
          {user?.contactDetails &&
            Object.entries(user.contactDetails)
              .filter(([_, val]) => val)
              .map(([key, value]) => {
                let Icon, colorClass;
                switch (key) {
                  case "facebook":
                    Icon = FaFacebook;
                    colorClass = "hover:text-blue-600";
                    break;
                  case "instagram":
                    Icon = FaInstagram;
                    colorClass = "hover:text-pink-500";
                    break;
                  case "youtube":
                    Icon = FaYoutube;
                    colorClass = "hover:text-red-600";
                    break;
                  case "website":
                    Icon = FaGlobe;
                    colorClass = "hover:text-green-600";
                    break;
                  case "github":
                    Icon = FaGithub;
                    colorClass = "hover:text-gray-800";
                    break;
                  default:
                    Icon = FaGlobe;
                    colorClass = "hover:text-gray-600";
                }
                return (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 text-gray-600 ${colorClass} transition text-sm`}
                  >
                    <Icon className="text-lg" />
                    <span className="truncate max-w-xs underline">{value}</span>
                  </a>
                );
              })}
        </div>

        {/* Update Button */}
        <button
          onClick={() => setProfileModalOpen(true)}
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded"
        >
          Update Profile
        </button>

        <div className="w-full flex flex-col space-y-2 my-5 border-t border-zinc-200">
          <button
            onClick={() => setActiveTab("personal")}
            className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all cursor-pointer ${
              activeTab === "personal"
                ? "bg-[#EDE9EA] border-[#bebebe]"
                : "hover:bg-zinc-100 border-transparent"
            }`}
          >
            <User /> Personal Information
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-[#EDE9EA] border-[#bebebe]"
                : "hover:bg-zinc-100 border-transparent"
            }`}
          >
            <LockIcon /> Security
          </button>

          <hr className="text-zinc-200" />

          <button
            // onClick={signOut}
            className="md:px-4 px-3 py-2 md:py-3 rounded text-left text-red-500 hover:bg-red-100 flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOut /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageLeft;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { FaFacebook, FaYoutube, FaGlobe, FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Camera, LockIcon, LogOut, Trash2, User } from "lucide-react";
import api from "../../utils/api";
import UploadPhotoModal from "./UploadPhotoModal";
import { useAuth } from "../../AuthProvider/authProvider";
import { MdEmail, MdVerified } from "react-icons/md";
import { useTranslation } from "react-i18next";
import DeleteAccountModal from "../../components/modals/DeleteAccountModal";
import LogoutModal from "../../components/modals/LogoutModal";

const ProfilePageLeft = ({ user, setUser, activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const [verifying, setVerifying] = useState(false);
  const [photoType, setPhotoType] = useState("profile");
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='profile-image']", {});
    return () => Fancybox.unbind("[data-fancybox='profile-image']");
  }, []);
  useEffect(() => {
    Fancybox.bind("[data-fancybox='cover-image']", {});
    return () => Fancybox.unbind("[data-fancybox='cover-image']");
  }, []);

  const handlePhotoUpload = (img) => {
    const field = photoType === "profile" ? "profileImage" : "coverImage";
    setUser((prev) => ({ ...prev, [field]: img }));
  };

  const sendVerificationEmail = async () => {
    try {
      setVerifying(true);
      const res = await api.post("/users/request");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send verification");
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
        const res = await api.get(`/users/verify?token=${token}`);
        toast.success(res.data.message);
        // Update user state immediately
        setUser((prev) => ({ ...prev, isVerified: true }));
        // Remove token from URL
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
        <a
          href={user?.coverImage.url}
          data-fancybox="cover-image"
          data-caption={user.title}
          className="overflow-hidden"
        >
          <img
            src={user?.coverImage.url}
            className="w-full h-full object-cover"
          />
        </a>
        <button
          onClick={() => {
            setPhotoType("cover");
            setPhotoModalOpen(true);
          }}
          className="absolute top-2 right-2 cursor-pointer bg-white shadow-lg p-2 rounded-full"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* Profile Info */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative -mt-20">
          <a
            href={user?.profileImage?.url}
            data-fancybox="profile-image"
            data-caption={user.title}
            className="overflow-hidden"
          >
            <img
              src={user?.profileImage?.url}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow"
            />
          </a>
          <button
            onClick={() => {
              setPhotoType("profile");
              setPhotoModalOpen(true);
            }}
            className="absolute bottom-0 right-0 cursor-pointer bg-white shadow-lg p-2 rounded-full"
          >
            <Camera size={16} />
          </button>
        </div>

        <h2 className="mt-4 text-xl sm:text-2xl font-bold flex items-center gap-1 text-center">
          {user?.name}
          {user?.isVerified && (
            <MdVerified size={18} className="text-blue-500" title="Verified" />
          )}
        </h2>

        <p className="text-gray-500 text-sm sm:text-base">@{user?.username}</p>

        {/* 📞 Phone Number */}
        {user?.phone && (
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            📞 {user.phone}
          </p>
        )}

        {/* Role + Verify */}
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          <span
            className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
              user?.role === "admin"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user?.role}
          </span>

          {!user?.isVerified && (
            <button
              onClick={sendVerificationEmail}
              disabled={verifying}
              className="px-3 py-1 text-xs sm:text-sm bg-yellow-100 text-yellow-700 rounded-lg cursor-pointer hover:bg-yellow-200 transition"
            >
              {verifying ? "Sending..." : "Verify your email"}
            </button>
          )}
        </div>

        {/* Bio (Premium Style) */}
        {user?.bio && (
          <div className="mt-4 w-full ">
            <div className="relative py-2 px-3 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 shadow-sm text-sm">
              <div className=" text-gray-500 ">
                Bio: <p className=" text-gray-700 ">{user.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Address (Premium Card Style) */}
        {user?.addressInfo.address && (
          <div className="mt-3 w-full text-sm">
            <div className="py-2 px-3 rounded-2xl bg-linear-to-br flex items-center justify-baseline gap-1 from-yellow-50 to-orange-50 border border-yellow-100 shadow-sm ">
              <p className=" text-yellow-700 font-medium">Location:</p>

              <p className=" text-gray-700 ">
                {user?.addressInfo?.address && (
                  <>
                    {user.addressInfo.address}, {user.addressInfo.city},{" "}
                    {user.addressInfo.state}, {user.addressInfo.postalCode},{" "}
                    {user.addressInfo.country}
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Social Links */}

        <div className="w-full mb-2">
          <a
            href={`mailto:${user?.email}`}
            className="flex mt-4 items-center justify-baseline w-full gap-2 text-gray-600 transition text-sm hover:text-red-500"
          >
            <MdEmail className="text-lg" />
            <span className="truncate max-w-xs underline">{user?.email}</span>
          </a>
        </div>
        <div className=" w-full space-y-2">
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
                    Icon = FaSquareInstagram;
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

        {/* Tabs & Logout */}
        <div className="w-full flex flex-col space-y-2 mt-5 border-zinc-200 text-sm">
          <hr className="text-zinc-200" />

          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={() => setActiveTab("personal")}
              className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "personal" ? "bg-[#EDE9EA]" : "hover:bg-zinc-100"
              }`}
            >
              <User /> {t("personal_information")}
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2  transition-all cursor-pointer ${
                activeTab === "security" ? "bg-[#EDE9EA]" : "hover:bg-zinc-100"
              }`}
            >
              <LockIcon /> {t("security_settings")}
            </button>
          </div>

          <hr className="text-zinc-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <button
              onClick={() => setLogoutOpen(true)}
              className="md:px-4 px-3 py-2 md:py-3 rounded-lg text-left text-red-500 hover:bg-red-100 flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut />
              {t("auth_logout")}
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="md:px-4 px-3 py-2 md:py-3 rounded-lg text-left text-red-500 hover:bg-red-100 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 />
              {t("delete_account.title")}
            </button>
          </div>
        </div>
      </div>

      <LogoutModal isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />

      <DeleteAccountModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        user={user}
      />

      {/* Upload Modal */}
      <UploadPhotoModal
        isOpen={photoModalOpen}
        type={photoType}
        onClose={() => setPhotoModalOpen(false)}
        onUpload={handlePhotoUpload}
      />
    </div>
  );
};

export default ProfilePageLeft;

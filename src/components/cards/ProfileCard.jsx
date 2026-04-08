import {
  FaFacebook,
  FaYoutube,
  FaGlobe,
  FaGithub,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdVerified } from "react-icons/md";

const ProfileCard = ({ user }) => {
  return (
    <div className=" bg-white rounded-xl overflow-hidden shadow-2xl -m-5 h-fit">
      {/* Cover */}
      <div className="h-48 relative">
        <img src={user?.coverImage} className="w-full h-full object-cover" />
      </div>

      {/* Profile Info */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative -mt-20">
          <img
            src={user?.profileImage}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold flex items-center gap-1">
          {user?.name}
          {user?.isVerified && (
            <MdVerified
              size={18}
              className="text-blue-500 -mb-1"
              title="Verified"
            />
          )}
        </h2>
        <p className="text-gray-500">@{user?.username}</p>

        {/* Role + Verify */}
        <div className="flex gap-2 mt-2">
          {/* Role */}
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              user?.role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user?.role}
          </span>

          {/* Verification */}
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              user?.isVerified
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {user?.isVerified ? "Verified" : "Not Verified"}
          </span>
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
      </div>
    </div>
  );
};

export default ProfileCard;

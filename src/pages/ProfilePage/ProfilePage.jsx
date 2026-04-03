// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
  FaGithub,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import BlogCard from "../../components/BlogCard";
import { useAuth } from "../../AuthProvider/authProvider";
import UpdateProfileModal from "./UpdateProfileModal";
import UploadPhotoModal from "./UploadPhotoModal";
import BlogFormModal from "./BlogFormModal";
import { Camera } from "lucide-react";
import { useData } from "../../context/DataContext";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [photoType, setPhotoType] = useState("profile"); // profile / cover
   const {blogs, setBlogs} = useData();

  const handlePhotoUpload = (img) => {
    const field = photoType === "profile" ? "profileImage" : "coverImage";
    setUser((prev) => ({ ...prev, [field]: img }));
  };

  const addNewBlog = (blog) => setBlogs((prev) => [blog, ...prev]);

  const deletePost = (index) =>
    setBlogs((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="custom-container">
        <div className="flex flex-col xl:flex-row gap-6 md:mt-8">
          {/* Left Panel */}
          <div className="xl:w-1/3 bg-white rounded-xl shadow-md overflow-hidden lg:sticky top-0 h-fit">
            {/* Cover Photo */}
            <div className="h-48 relative">
              <img
                src={user?.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setPhotoType("cover");
                  setPhotoModalOpen(true);
                }}
                className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300"
              >
                <Camera />
              </button>
            </div>

            {/* Profile Info */}
            <div className="p-6 flex flex-col items-center">
              <div className="relative -mt-20">
                <img
                  src={user?.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <button
                  onClick={() => {
                    setPhotoType("profile");
                    setPhotoModalOpen(true);
                  }}
                  className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300"
                >
                  <Camera />
                </button>
              </div>

              <h2 className="mt-4 text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">@{user?.username}</p>
              <span
                className={`mt-2 px-3 py-1 rounded-full text-sm ${
                  user?.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {user?.role}
              </span>
              <p className="mt-4 text-gray-600 text-center">{user?.bio}</p>

              {user?.addressInfo && (
                <div className="mt-4 text-gray-700 text-sm w-full text-center">
                  {user.addressInfo.address && (
                    <p>
                      <strong>Address:</strong> {user.addressInfo.address},{" "}
                      {user.addressInfo.city}, {user.addressInfo.state},{" "}
                      {user.addressInfo.postalCode}, {user.addressInfo.country}
                    </p>
                  )}
                </div>
              )}

              {/* Social Links */}
              <div className="mt-4 space-y-2 w-full">
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
                          <span className="truncate max-w-xs underline">
                            {value}
                          </span>
                        </a>
                      );
                    })}
              </div>

              {/* Left Panel Buttons */}
              <div className="flex  w-full gap-3 mt-6">
                <button
                  onClick={() => setPostModalOpen(true)}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
                >
                  <FaEdit /> Update Profile
                </button>
                <button
                  onClick={() => setBlogModalOpen(true)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Blog
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Blogs Grid */}
          <div className="xl:w-2/3 flex flex-col gap-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No posts yet.
                </p>
              )}
              {blogs.map((blog, index) => (
                <div key={index} className="relative group">
                  <BlogCard blog={blog} />
                  {user.role === "admin" && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white p-2 rounded shadow">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deletePost(index)}
                        className="bg-white p-2 rounded shadow text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateProfileModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
      <UploadPhotoModal
        isOpen={photoModalOpen}
        type={photoType}
        onClose={() => setPhotoModalOpen(false)}
        onUpload={handlePhotoUpload}
      />
      <BlogFormModal
        isOpen={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
        onAdd={addNewBlog}
      />
    </div>
  );
};

export default ProfilePage;
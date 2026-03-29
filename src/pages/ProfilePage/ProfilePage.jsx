// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import BlogCard from "../../components/BlogCard";
import BlogPostModal from "./BlogPostModal";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const ProfilePage = () => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const user = {
    id: "user1",
    name: "রাম প্রসাদ",
    username: "ramprasad",
    email: "ramprasad@gmail.com",
    role: "admin",
    bio: "রাম প্রসাদ একজন আধ্যাত্মিক শিক্ষক ও লেখক, যিনি ভক্তি ও নৈতিক শিক্ষার উপর মনোনিবেশ করেন।",
    profileImage:
      "https://metropolitanhost.com/themes/themeforest/wp/maharatri/wp-content/uploads/2021/09/1-4-100x100.jpg",
    coverImage:
      "https://metropolitanhost.com/themes/themeforest/wp/maharatri/wp-content/uploads/2021/09/2.jpg",
    contactDetails: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      website: "#",
    },
    totalPost: 12,
    date: "2026-05-30T15:01:01.415+00:00",
  };

  useEffect(() => {
    fetch("/json/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const myPosts = data.filter((post) => post.author.id === user.id);
        setBlogs(myPosts);
      });
  }, []);

  const handlePost = (newPost) => {
    setBlogs([{ ...newPost, author: user.name }, ...blogs]);
  };

  const deletePost = (index) => {
    const filtered = blogs.filter((_, i) => i !== index);
    setBlogs(filtered);
  };

  return (
    <div className="pb-20">
      {/* Profile Header */}
      <div className="relative h-30 md:h-72 overflow-hidden">
        <img loading="lazy"
          src={user.coverImage}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="custom-container ">
        {/* Profile Info */}
        <div className="flex flex-col items-center">
          <div className="w-36 h-36">
            <img loading="lazy"
              src={user.profileImage}
              className="w-36 h-36 rounded-full border-4 border-white md:-mt-30 -mt-20 z-10 absolute"
            />
          </div>


          <h1 className="text-3xl font-bold -mt-16 md:-mt-26">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>

          {/* Role Badge */}
          <span
            className={`mt-2 px-3 py-1 rounded-full text-sm ${user.role === "admin" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
          >
            {user.role}
          </span>

          {/* Post Count & Joined Date */}
          <div className="flex gap-6 mt-4">
            <div className="text-center">
              <span className="text-lg font-bold">{blogs.length}</span>
              <p className="text-gray-500 text-sm">Posts</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">
                {formatDateDynamic(user.date)}
              </span>
              <p className="text-gray-500 text-sm">Joined</p>
            </div>
          </div>

          <p className="mt-3 text-gray-600 text-center max-w-lg">{user.bio}</p>

          {/* Social */}
          <div className="flex gap-5 mt-4 text-xl text-gray-600">
            <a href={user.contactDetails.facebook}>
              <FaFacebook />
            </a>
            <a href={user.contactDetails.instagram}>
              <FaInstagram />
            </a>
            <a href={user.contactDetails.youtube}>
              <FaYoutube />
            </a>
            <a href={user.contactDetails.website}>
              <FaGlobe />
            </a>
          </div>

          {/* Create Post */}
          <button
            onClick={() => setPostModalOpen(true)}
            className="mt-6 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus /> Create Blog Post
          </button>
        </div>

        {/* Blog Posts */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {blogs.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No posts yet.
            </p>
          )}

          {blogs.map((blog, index) => (
            <div key={index} className="relative group">
              <BlogCard blog={blog} />

              {/* Admin Controls - show on hover */}
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

      {/* Blog Modal */}
      <BlogPostModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        onPost={handlePost}
      />
    </div>
  );
};

export default ProfilePage;

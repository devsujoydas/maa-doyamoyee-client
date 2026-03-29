import { HiTrash } from "react-icons/hi";
import SEOHead from "../../components/SEOHead";
import { useState } from "react";
import { formatDateDynamic } from "../../utils/formatDateDynamic";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

import BlogViewModal from "../../components/modals/BlogViewModal";
import DeleteModal from "../../components/modals/DeleteModal";

const AdminBlogs = () => {
  const { blogs, setBlogs } = useData();
  const [blog, setBlog] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openViewModal = (blog) => {
    setBlog(blog);
    setViewModalOpen(true);
  };

  const openDeleteModal = (blog) => {
    setBlog(blog);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter((b) => b.slug !== blog.slug));
    toast.success("Blog deleted successfully");
    setDeleteModalOpen(false);
    setViewModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <SEOHead
        title="Blog Management"
        description="Manage blog posts."
        path="/admin/blogs"
      />

      <div className="flex justify-between items-center">
        <h1 className="">
          <span className="text-lg md:text-2xl font-bold">
            Blogs Management{" "}
          </span>
          <span className="border rounded-full px-1 font-semibold text-sm md:text-lg lang-en-US">
            {blogs.length}
          </span>
        </h1>

        <button className="flex items-center gap-1 sm:gap-2 bg-[#CF4517] hover:bg-[#e24e1c] active:scale-95  transition-all text-white cursor-pointer px-2 sm:px-4 py-2 rounded-md sm:text-base text-sm sm:rounded-lg">
          <Plus size={16} /> Add Blog
        </button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {blogs.map((post) => (
              <tr key={post.slug} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 lang-bn-BD">
                  <Link
                    to={`/blogs/${post?.slug}`}
                    className="hover:underline font-medium text-nowrap"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4  text-gray-500 lang-bn-BD ">
                  <span className="text-sm hover:underline font-medium cursor-pointer text-nowrap">
                    {post.author.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 text-nowrap">
                  {formatDateDynamic(post.createdAt)}
                </td>

                <td className={`px-6 py-4 text-xs `}>
                  <span
                    className={` px-2 py-0.5 rounded-full
                        ${post.isApproved === "Pending" && "text-yellow-800 bg-yellow-100"}
                        ${post.isApproved === "Approved" && "text-green-800 bg-green-100"}
                        ${post.isApproved === "Rejected" && "text-red-800 bg-red-100"}
                        `}
                  >
                    {post.isApproved}
                  </span>
                </td>

                <td className="px-6 py-4 text-center flex justify-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => openViewModal(post)}
                  >
                    <Eye size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => openDeleteModal(post)}
                  >
                    <HiTrash size={18} />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* View Blog Modal */}
      <BlogViewModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedBlog={blog}
        setSelectedBlog={setBlog}
        setDeleteModalOpen={setDeleteModalOpen}
      />

      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDelete={confirmDelete}
        selected={blog}
      />
    </div>
  );
};

export default AdminBlogs;

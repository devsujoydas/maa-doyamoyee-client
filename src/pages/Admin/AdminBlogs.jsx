import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus, Edit2 } from "lucide-react";

import SEOHead from "../../components/SEOHead";
import { formatDynamicDate } from "../../utils/formatDateDynamic";

import BlogViewModal from "../../components/modals/BlogViewModal";
import DeleteModal from "../../components/modals/DeleteModal";
import BlogFormModal from "../../components/modals/BlogFormModal";
import useBlogs from "../../hooks/useBlogs";

const AdminBlogs = () => {
  const { blogs = [], createOrUpdate, deleteBlog } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    setViewModalOpen(true);
  };
  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };
  const openFormModal = (blog = null) => {
    setSelectedBlog(blog);
    setFormModalOpen(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      setDeleteModalOpen(false);
      setViewModalOpen(false);
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await createOrUpdate.mutateAsync({ id: selectedBlog?._id, formData });
      toast.success(
        selectedBlog?._id
          ? "Blog updated successfully"
          : "Blog created successfully",
      );
      setFormModalOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="flex flex-col space-y-6 lang-bn-BD">
      <SEOHead
        title="Blog Management"
        description="Manage blog posts."
        path="/admin/blogs"
      />

      <div className="flex justify-between items-center">
        <h1>
          <span className="text-lg md:text-2xl font-bold">
            Blogs Management{" "}
          </span>
          <span className="border rounded-full px-3 font-semibold text-sm md:text-lg ">
            {blogs?.length}
          </span>
        </h1>

        <button className="btn-primary" onClick={() => openFormModal(null)}>
          <Plus size={16} /> Add Blog
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 text-left ">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Likes</th>
              <th className="px-6 py-3 text-left">Comments</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {blogs.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">
                  <Link
                    to={`/blogs/${post?._id}`}
                    className="hover:underline font-medium text-nowrap"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-500">{post.author.name}</td>
                <td className="px-6 py-4 text-gray-500">
                  {post.reacts?.length || 0}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {post.commentCount || 0}
                </td>
                <td className="px-6 py-4 text-gray-500 text-nowrap">
                  {formatDynamicDate(post.createdAt)}
                </td>
                <td className="px-6 py-4 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full ${post.status === "pending" ? "text-yellow-800 bg-yellow-100" : post.status === "approved" ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}
                  >
                    {post.status}
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
                    className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                    onClick={() => openFormModal(post)}
                  >
                    <Edit2 size={18} />
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

      {/* Modals */}
      <BlogFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        initialData={selectedBlog}
      />
      <BlogViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        selectedBlog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
        setDeleteModalOpen={setDeleteModalOpen}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        confirmDelete={confirmDelete}
        selected={selectedBlog}
      />
    </div>
  );
};

export default AdminBlogs;

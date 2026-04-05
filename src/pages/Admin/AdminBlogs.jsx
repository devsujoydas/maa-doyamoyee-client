  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { motion } from "framer-motion";
  import toast from "react-hot-toast";
  import { HiTrash } from "react-icons/hi";
  import { Eye, Plus, Edit2 } from "lucide-react";

  import SEOHead from "../../components/SEOHead"; 
  import { formatDateDynamic } from "../../utils/formatDateDynamic";

  import BlogViewModal from "../../components/modals/BlogViewModal";
  import DeleteModal from "../../components/modals/DeleteModal";
  import BlogFormModal from "../../components/modals/BlogFormModal";
  import { useData } from "../../context/useData";

  const AdminBlogs = () => {
    const { blogs, setBlogs } = useData();
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Modals
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModalOpen, setFormModalOpen] = useState(false);

    // Open modals
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

    // Delete blog
    const confirmDelete = () => {
      if (!selectedBlog) return;
      setBlogs(blogs.filter((b) => b.slug !== selectedBlog.slug));
      toast.success("Blog deleted successfully");
      setDeleteModalOpen(false);
      setViewModalOpen(false);
    };

    // Add or Update blog
    const handleFormSubmit = (blogData) => {
      if (blogData._id && blogs.some((b) => b._id === blogData._id)) {
        // Update
        setBlogs(blogs.map((b) => (b._id === blogData._id ? blogData : b)));
        toast.success("Blog updated successfully");
      } else {
        // Add
        blogData._id = Date.now().toString();
        setBlogs([blogData, ...blogs]);
        toast.success("Blog added successfully");
      }
    };

    return (
      <div className="flex flex-col space-y-6">
        <SEOHead
          title="Blog Management"
          description="Manage blog posts."
          path="/admin/blogs"
        />

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1>
            <span className="text-lg md:text-2xl font-bold">Blogs Management </span>
            <span className="border rounded-full px-1 font-semibold text-sm md:text-lg lang-en-US">
              {blogs?.length}
            </span>
          </h1>

          <button
            className="btn-primary"
            onClick={() => openFormModal(null)}
          >
            <Plus size={16} /> Add Blog
          </button>
        </div>

        {/* Blogs Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto bg-white shadow rounded-lg"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
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
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 lang-bn-BD">
                    <Link
                      to={`/blogs/${post?.slug}`}
                      className="hover:underline font-medium text-nowrap"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500 lang-bn-BD">
                    <span className="text-sm hover:underline font-medium cursor-pointer text-nowrap">
                      {post.author.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-nowrap">
                    {formatDateDynamic(post.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-full
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
          onSubmit={handleFormSubmit}
          initialData={selectedBlog}
        />

        <BlogViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          selectedBlog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          setDeleteModalOpen={setDeleteModalOpen}
        />

        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          confirmDelete={confirmDelete}
          selected={selectedBlog}
        />
      </div>
    );
  };

  export default AdminBlogs;
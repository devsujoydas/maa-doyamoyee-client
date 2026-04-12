import { useState } from "react";
import toast from "react-hot-toast";
import DonationPreviewModal from "../../components/modals/DonationPreviewModal";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";
import { formatDateEnglish } from "../../utils/formatDateDynamic";
import LoadingSpinner from "../../components/LoadingSpinner";
import useDonationQuery from "../../hooks/useDonationQuery";
import useDonationActions from "../../hooks/useDonationActions";
import { useAuth } from "../../AuthProvider/authProvider";
import DeleteModal from "../../components/modals/DeleteModal";

const AdminDonations = () => {
  const { user } = useAuth();
  const { donations, isLoading } = useDonationQuery();
  const { updateStatus, deleteDonation, isDeleting } = useDonationActions();

  // 🔥 SEPARATE STATES (IMPORTANT FIX)
  const [previewData, setPreviewData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [filter, setFilter] = useState("all");

  const safeDonations = donations || [];

  const filtered = safeDonations.filter((d) =>
    filter === "all" ? true : d.status === filter,
  );

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status });
      toast.success(`Updated to ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sumAmount = (list) =>
    list.reduce((acc, curr) => acc + (curr.paymentAmount || 0), 0);

  const stats = [
    { label: "Total Amount", value: sumAmount(safeDonations) },
    {
      label: "Pending",
      value: sumAmount(safeDonations.filter((d) => d.status === "pending")),
    },
    {
      label: "Approved",
      value: sumAmount(safeDonations.filter((d) => d.status === "approved")),
    },
    {
      label: "Rejected",
      value: sumAmount(safeDonations.filter((d) => d.status === "rejected")),
    },
  ];

  // 👁️ Preview handler
  const handlePreview = (d) => {
    setPreviewData(d);
  };

  // 🗑️ Delete handler
  const handleDelete = (d) => {
    setDeleteData(d);
    setDeleteOpen(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteDonation(id);
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Donation Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition text-center"
          >
            <p className="text-xl font-bold">৳{s.value}</p>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full border border-zinc-200 cursor-pointer ${
              filter === f ? "bg-black text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Payment</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {filtered.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-500">
                    <span className="font-semibold">{d.accountName}</span>
                    <div>{d.email}</div>
                  </td>

                  <td className="px-6 py-3 text-gray-500">{d.phone}</td>

                  <td className="px-6 py-3 text-gray-500 text-nowrap">
                    {formatDateEnglish(d.createdAt)}
                  </td>

                  <td className="px-6 py-3 text-gray-500">
                    ৳{d.paymentAmount}
                  </td>

                  <td className="px-6 py-3 text-gray-500 text-nowrap">
                    {d.paymentMethod === "Bank"
                      ? d.bankPayment?.bankName
                      : d.mobilePayment?.provider}
                  </td>

                  <td className="px-6 py-3 text-gray-500">
                    <select
                      value={d.status}
                      onChange={(e) => handleStatus(d._id, e.target.value)}
                      className="border border-zinc-200 px-2 rounded cursor-pointer outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center flex justify-center space-x-3">
                    {/* 👁️ Preview */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => handlePreview(d)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <Eye size={18} />
                    </motion.button>

                    {/* 🗑️ Delete */}
                    {user.role !== "ceo" && (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleDelete(d)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* DELETE MODAL */}
      <DeleteModal
        isUser={true}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        selected={deleteData}
        confirmDelete={confirmDelete}
      />

      {/* PREVIEW MODAL */}
      <DonationPreviewModal
        isOpen={!!previewData}
        onClose={() => setPreviewData(null)}
        donation={previewData}
      />
    </div>
  );
};

export default AdminDonations;
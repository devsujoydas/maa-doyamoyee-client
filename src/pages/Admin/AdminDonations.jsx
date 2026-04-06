import { useState } from "react";
import SEOHead from "../../components/SEOHead";
import { HiTrash } from "react-icons/hi";
import { Eye } from "lucide-react";
import {
  HiOutlineCurrencyBangladeshi,
  HiCheckCircle,
  HiClock,
  HiXCircle,
} from "react-icons/hi2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
 
import DeleteModal from "../../components/modals/DeleteModal";
import DonationViewModal from "../../components/modals/DonationViewModal";
import { formatDateDynamic } from "../../utils/formatDateDynamic";
import SectionReveal from "../../components/SectionReveal"; 
import useDonations from "../../hooks/useDonations";

const AdminDonations = () => { 
   const { data: donations = [] } = useDonations();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Status Update
  const handleStatusChange = (id, newStatus) => {
    const updated = donations.map((d) =>
      d._id === id ? { ...d, status: newStatus } : d
    );
    if (selectedDonation?._id === id) {
      setSelectedDonation({ ...selectedDonation, status: newStatus });
    }
  };

  const openViewModal = (donation) => {
    setSelectedDonation(donation);
    setViewModalOpen(true);
  };
  const openDeleteModal = (donation) => {
    setSelectedDonation(donation);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success("Donation deleted successfully");
    setDeleteModalOpen(false);
    setViewModalOpen(false);
  };

  const stats = [
    {
      label: "Total Donation",
      value: `৳ ${donations.reduce((sum, d) => sum + (d.amount || 0), 0)}`,
      icon: HiOutlineCurrencyBangladeshi,
      color: "bg-gradient-to-br from-amber-200 to-orange-300 text-orange-900",
      path: "/admin/donations",
    },
    {
      label: "Verified",
      value: donations
        .filter((d) => d.status === "verified")
        .reduce((sum, d) => sum + d.amount, 0),
      icon: HiCheckCircle,
      color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800",
      path: "/admin/donations",
    },
    {
      label: "Pending",
      value: donations
        .filter((d) => d.status === "pending")
        .reduce((sum, d) => sum + d.amount, 0),
      icon: HiClock,
      color: "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800",
      path: "/admin/donations",
    },
    {
      label: "Rejected",
      value: donations
        .filter((d) => d.status === "rejected")
        .reduce((sum, d) => sum + d.amount, 0),
      icon: HiXCircle,
      color: "bg-gradient-to-br from-red-100 to-red-200 text-red-700",
      path: "/admin/donations",
    },
  ];

  return (
    <div className="space-y-6">
      <SEOHead
        title="Donation Overview"
        description="Temple donation records."
        path="/admin/donations"
      />

      <h1 className="text-2xl font-bold">Donation Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lang-en-US">
        {stats.map((stat, i) => (
          <SectionReveal key={stat.label} delay={i * 0.05}>
            <Link to={stat.path}>
              <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 active:scale-100 transition-all flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl text-[#251D18] font-bold">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#251D18]">{stat.label}</p>
                </div>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>

      {/* Responsive Table */}
      <motion.div className="overflow-x-auto max-w-full bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100 text-xs">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Donor
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Payment
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Transaction
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Message
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donations.map((d) => (
              <tr key={d._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 max-w-37.5 truncate">
                  <div className="font-medium truncate">{d.donorName}</div>
                  <div className="text-xs text-gray-500 truncate">{d.email}</div>
                  <div className="text-xs text-gray-500 truncate">{d.phone}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ৳{d.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-xs truncate max-w-30">
                  {d.paymentMethod === "bank"
                    ? `${d.paymentDetails.bankName} (${d.paymentDetails.branchName})`
                    : d.paymentDetails.mobileBankName}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 truncate max-w-30">
                  {d.paymentDetails.transactionID}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs
                      ${d.status === "verified" ? "bg-blue-100 text-blue-800" : ""}
                      ${d.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${d.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                    `}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 truncate max-w-25">
                  {formatDateDynamic(d.createdAt)}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 truncate max-w-37.5">
                  {d.message}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-blue-600"
                      onClick={() => openViewModal(d)}
                    >
                      <Eye size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-red-600"
                      onClick={() => openDeleteModal(d)}
                    >
                      <HiTrash size={18} />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modals */}
      <DonationViewModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedDonation={selectedDonation}
        handleStatusChange={handleStatusChange}
        handleDelete={confirmDelete}
      />

      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDelete={confirmDelete}
        selected={selectedDonation}
        isUser={false}
      />
    </div>
  );
};

export default AdminDonations;
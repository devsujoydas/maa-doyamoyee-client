import { useState } from "react";
import useDonations from "../../hooks/useDonations";
import toast from "react-hot-toast";
import { HiTrash, HiEye } from "react-icons/hi";
import DonationPreviewModal from "../../components/modals/DonationPreviewModal";
import { motion } from "framer-motion";
import { Edit2, Eye } from "lucide-react";
import { formatDateDynamic, formatDateEnglish } from "../../utils/formatDateDynamic";

const AdminDonations = () => {
  const { donations = [], deleteDonation, updateStatus } = useDonations();
  const [selected, setSelected] = useState(null);
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

  // 👉 helper: sum function
  const sumAmount = (list) =>
    list.reduce((acc, curr) => acc + (curr.paymentAmount || 0), 0);

  // 👉 stats with PRICE instead of COUNT
  const stats = [
    {
      label: "Total Amount",
      value: sumAmount(safeDonations),
    },
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

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Donation Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-4 shadow rounded text-center"
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
            className={`px-3 py-1 rounded border border-zinc-200 cursor-pointer ${
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
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 text-left ">Name</th>
              <th className="px-6 py-4 text-left ">Phone</th>
              <th className="px-6 py-4 text-left ">Date</th>
              <th className="px-6 py-4 text-left ">Amount</th>
              <th className="px-6 py-4 text-left ">Payment</th>
              <th className="px-6 py-4 text-left ">Status</th>
              <th className="px-6 py-4 text-center ">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {filtered.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-500">
                  {d.accountName}
                  <div>{d.email}</div>
                </td>

                <td className="px-6 py-3 text-gray-500">{d.phone}</td>
                <td className="px-6 py-3 text-gray-500">{formatDateEnglish(d.createdAt)}</td>
                <td className="px-6 py-3 text-gray-500">৳{d.paymentAmount}</td>


                <td className="px-6 py-3 text-gray-500 text-nowrap">
                  {d.paymentMethod === "Bank"
                    ? d.bankPayment?.bankName
                    : d.mobilePayment?.provider}
                </td>

                <td className="px-6 py-3 text-gray-500">
                  <select
                    value={d.status}
                    onChange={(e) => handleStatus(d._id, e.target.value)}
                    className={`border px-2  rounded outline-none cursor-pointer font-medium ${d.status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : d.status === "approved" ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}`}
                  >
                    <option
                      value="pending"
                      className="bg-yellow-100 text-yellow-700"
                    >
                      Pending
                    </option>

                    <option
                      value="approved"
                      className="bg-green-100 text-green-700"
                    >
                      Approved
                    </option>

                    <option
                      value="rejected"
                      className="bg-red-100 text-red-700"
                    >
                      Rejected
                    </option>
                  </select>
                </td>

                <td className=" gap-2 px-6 py-4 text-gray-500  flex justify-center items-center mt-2">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer "
                    onClick={() => setSelected(d)}
                  >
                    <Eye size={18} />
                  </motion.button>
                  {/* 
                  <button onClick={() => deleteDonation(d._id)}>
                    <HiTrash />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* MODAL */}
      <DonationPreviewModal
        isOpen={!!selected}
        donation={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default AdminDonations;

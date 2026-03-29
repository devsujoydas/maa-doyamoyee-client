import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

const DonationViewModal = ({
  viewModalOpen,
  setViewModalOpen,
  selectedDonation,
  handleStatusChange,
  handleDelete,
}) => {
  // Local state for instant dropdown update
  const [localDonation, setLocalDonation] = useState(selectedDonation);

  // Update localDonation whenever selectedDonation changes
  useEffect(() => {
    setLocalDonation(selectedDonation);
  }, [selectedDonation]);

  if (!localDonation) return null;

  return (
    <Modal
      wClass="max-w-lg sm:max-w-xl"
      isOpen={viewModalOpen}
      onClose={() => setViewModalOpen(false)}
    >
      <div className="flex flex-col space-y-6 p-4 sm:p-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{localDonation.donorName}</h2>
          <p className="text-sm text-gray-500">{localDonation.email}</p>
        </div>

        {/* Donation Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Amount</span>
            <span className="text-green-600 font-medium">
              ৳{localDonation.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Payment Method</span>
            <span>
              {localDonation.paymentMethod === "bank"
                ? `${localDonation.paymentDetails.bankName} (${localDonation.paymentDetails.branchName})`
                : localDonation.paymentDetails.mobileBankName}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Transaction ID</span>
            <span className="text-gray-600">{localDonation.paymentDetails.transactionID}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Status</span>
            <select
              value={localDonation.status}
              onChange={(e) => {
                const newStatus = e.target.value;
                setLocalDonation({ ...localDonation, status: newStatus }); // Update local state
                handleStatusChange(localDonation._id, newStatus); // Update parent state
                toast.success(`Status updated to ${newStatus}`);
              }}
              className="border border-zinc-200 rounded px-2 py-1 text-sm outline-none"
            >
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-700 text-sm">
          <span className="font-semibold">Message: </span>
          {localDonation.message || "No message provided"}
        </div>

        {/* Actions */}
        <div className="flex justify-center sm:justify-end gap-3">
          <button
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            onClick={() => handleDelete(localDonation)}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition"
            onClick={() => setViewModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DonationViewModal;
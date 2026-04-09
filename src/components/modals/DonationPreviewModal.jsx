import { motion, AnimatePresence } from "framer-motion";

const DonationPreviewModal = ({ isOpen, onClose, donation }) => {
  if (!isOpen || !donation) return null;

  const proofImage = donation?.paymentProof?.url;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-2xl rounded-2xl p-6 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-4 top-3 text-lg font-bold"
          >
            ✖
          </button>

          <h2 className="text-xl font-bold mb-4">Donation Details</h2>

          <div className="space-y-2 text-sm">

            <p><b>Name:</b> {donation.accountName}</p>
            <p><b>Email:</b> {donation.email}</p>
            <p><b>Phone:</b> {donation.phone}</p>
            <p><b>Amount:</b> ৳{donation.paymentAmount}</p>
            <p><b>Status:</b> {donation.status}</p>
            <p><b>Method:</b> {donation.paymentMethod}</p>

            {/* BANK */}
            {donation.paymentMethod === "Bank" && (
              <div className="bg-gray-50 p-2 rounded">
                <p><b>Bank:</b> {donation.bankPayment?.bankName}</p>
                <p><b>Account:</b> {donation.bankPayment?.accountNumber}</p>
              </div>
            )}

            {/* MOBILE */}
            {donation.paymentMethod === "MobileBanking" && (
              <div className="bg-gray-50 p-2 rounded">
                <p><b>Provider:</b> {donation.mobilePayment?.provider}</p>
                <p><b>TRX ID:</b> {donation.mobilePayment?.transactionId}</p>
              </div>
            )}

            {/* 🔥 LIVE IMAGE PREVIEW */}
            <div className="mt-3">
              <p className="font-semibold mb-1">Payment Proof:</p>

              {proofImage ? (
                <img
                  src={proofImage}
                  alt="payment proof"
                  className="w-full max-h-80 object-contain rounded-lg border"
                />
              ) : (
                <p className="text-gray-400">No image uploaded</p>
              )}
            </div>

            {donation.message && (
              <p className="mt-2"><b>Message:</b> {donation.message}</p>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationPreviewModal;
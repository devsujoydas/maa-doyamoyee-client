import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const DonationPreviewModal = ({ isOpen, onClose, donation }) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='paymentProof-image']", {});
    return () => Fancybox.unbind("[data-fancybox='paymentProof-image']");
  }, [isOpen]);

  if (!isOpen || !donation) return null;

  const {
    accountName,
    email,
    phone,
    paymentAmount,
    status,
    paymentMethod,
    message,
    paymentProof,
    bankPayment,
    mobilePayment,
  } = donation;

  const proofImage = paymentProof?.url;

  // 🔥 Smart caption (IMPORTANT IMPROVEMENT)
  const captionText = `
Donation Proof
Name: ${accountName}
Amount: ৳${paymentAmount}
Method: ${paymentMethod}
Provider: ${mobilePayment?.provider || bankPayment?.bankName || "N/A"}
Transaction: ${mobilePayment?.transactionId || bankPayment?.accountNumber || "N/A"}
Status: ${status}
`.trim();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-4 top-3 text-lg font-bold hover:text-red-500"
          >
            ✖
          </button>

          <h2 className="text-xl font-bold mb-4">Donation Details</h2>

          <div className="space-y-3 text-sm">

            {/* BASIC INFO */}
            <div className="space-y-1">
              <p><b>Name:</b> {accountName}</p>
              <p><b>Email:</b> {email}</p>
              <p><b>Phone:</b> {phone}</p>
              <p><b>Amount:</b> ৳{paymentAmount}</p>
              <p><b>Status:</b> {status}</p>
              <p><b>Method:</b> {paymentMethod}</p>
            </div>

            {/* BANK */}
            {paymentMethod === "Bank" && bankPayment && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p><b>Bank:</b> {bankPayment.bankName}</p>
                <p><b>Account:</b> {bankPayment.accountNumber}</p>
              </div>
            )}

            {/* MOBILE */}
            {paymentMethod === "MobileBanking" && mobilePayment && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p><b>Provider:</b> {mobilePayment.provider}</p>
                <p><b>Transaction ID:</b> {mobilePayment.transactionId}</p>
                <p><b>Sender:</b> {mobilePayment.senderNumber}</p>
              </div>
            )}

            {/* IMAGE PREVIEW */}
            <div className="mt-4">
              <p className="font-semibold mb-2">Payment Proof</p>

              {proofImage ? (
                <a
                  href={proofImage}
                  data-fancybox="paymentProof-image"
                  data-caption={captionText}
                  className="block overflow-hidden rounded-lg border border-zinc-300 hover:opacity-90 transition"
                >
                  <img
                  loading="lazy"
                    src={proofImage}
                    alt="payment proof"
                    className="w-full max-h-80 object-contain"
                  />
                </a>
              ) : (
                <p className="text-gray-400">No image uploaded</p>
              )}
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="mt-3 bg-yellow-50 p-3 rounded">
                <b>Message:</b>
                <p className="mt-1 text-gray-700">{message}</p>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationPreviewModal;
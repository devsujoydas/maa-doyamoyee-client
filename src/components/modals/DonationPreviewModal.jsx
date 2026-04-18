import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Modal from "../ui/Modal";

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
    // <Modal wClass="max-w-2xl" isOpen={isOpen} onClose={onClose}>
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="fixed h-screen inset-0 bg-black/40 "
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

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

          <div className="space-y-3 text-sm">
            {/* BASIC INFO */}

            <h2 className="text-xl font-bold mb-2 md:mb-5">
              Donation Transaction Details
            </h2>

            {/* TOP INFO (BANK STYLE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 md:gap-3 bg-gray-50 p-2 md:p-4 rounded-xl border border-zinc-200 mb-2 md:mb-5 text-sm">
              <div>
                <b>Name:</b> {accountName}
              </div>
              <div>
                <b>Email:</b> {email}
              </div>
              <div>
                <b>Phone:</b> {phone}
              </div>
              <div>
                <b>Amount:</b> ৳{paymentAmount}
              </div>
              <div>
                <b>Status:</b> {status}
              </div>
              <div>
                <b>Method:</b> {paymentMethod}
              </div>
            </div>

            {/* BANK DETAILS */}
            {paymentMethod === "Bank" && bankPayment && (
              <div className="bg-blue-50 border border-zinc-200 p-3 rounded-lg mb-4 text-sm">
                <p><b>Bank:</b> {bankPayment.bankName}</p>
                <p><b>Account:</b> {bankPayment.accountNumber}</p>
              </div>
            )}

             {/* MOBILE DETAILS */}
            {paymentMethod === "MobileBanking" && mobilePayment && (
              <div className="bg-green-50 border border-zinc-200 p-2 md:p-3 rounded-lg mb-2 md:mb-4 text-sm">
                <p><b>Provider:</b> {mobilePayment.provider}</p>
                <p><b>Sender:</b> {mobilePayment.senderNumber}</p>
                <p><b>Transaction ID:</b> {mobilePayment.transactionId}</p>
              </div>
            )}
            

            {/* IMAGE PREVIEW */}
            <div className="md:mt-4 mt-2">
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
                    className="w-full max-h-65 object-contain"
                  />
                </a>
              ) : (
                <p className="text-gray-400">No image uploaded</p>
              )}
            </div>

           {/* MESSAGE */}
            {message && (
              <div className="bg-yellow-50 border border-zinc-200 p-2 md:p-3 rounded-lg text-sm">
                <b>Message:</b>
                <p className="md:mt-1 text-gray-700">{message}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    // </Modal>
  );
};

export default DonationPreviewModal;

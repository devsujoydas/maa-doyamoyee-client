import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next"; 
import ImageUpload from "../../components/resuable/ImageUpload";
import toast from "react-hot-toast";
import useDonationActions from "../../hooks/useDonationActions";

const DonationForm = () => {
  const { t } = useTranslation();
 const { createDonation, isCreating } = useDonationActions();

  const [preview, setPreview] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    accountName: "",
    email: "",
    phone: "",
    paymentAmount: "",
    paymentMethod: "Bank",
    screenshot: null,
  });

  useEffect(() => {
    if (!formData.screenshot) return setPreview(null);

    const url = URL.createObjectURL(formData.screenshot);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [formData.screenshot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("accountName", formData.accountName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("paymentAmount", formData.paymentAmount);
      data.append("message", formData.message || "");
      data.append("paymentMethod", formData.paymentMethod);

      if (formData.paymentMethod === "Bank") {
        data.append(
          "bankPayment",
          JSON.stringify({
            bankName: formData.bankName,
            branchName: formData.branchName,
            branchCode: formData.branchCode,
            swiftCode: formData.swiftCode,
            routingNumber: formData.routingNumber,
            accountNumber: formData.accountNumber,
          }),
        );
      } else {
        data.append(
          "mobilePayment",
          JSON.stringify({
            provider: formData.mobileBankName,
            senderNumber: formData.senderNumber,
            transactionId: formData.transactionID,
          }),
        );
      }

      if (formData.screenshot) {
        data.append("paymentProof", formData.screenshot);
      }

      await createDonation(data);

      toast.success("Donation submitted successfully 🎉");

      setFormData({
        accountName: "",
        email: "",
        phone: "",
        paymentAmount: "",
        paymentMethod: "Bank",
        screenshot: null,
      });

      setPreview(null);
      setIsSuccessModalOpen(true);
    } catch (err) {
      toast.error(err.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center md:px-3 md:py-10 ">
      <motion.div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-3 md:p-8  border border-zinc-200">
        {/* TITLE */}
        <h2 className="text-xl font-bold text-center mb-6">
          {t("donation.title")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 "
        >
          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("donation.name.label")} <span className="text-red-500">*</span>
            </label>
            <input
              name="accountName"
              onChange={handleChange}
              placeholder={t("donation.name.placeholder")}
              className="input-field"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("donation.email.label")} <span className="text-red-500"> *</span>
            </label>
            <input
              name="email"
              onChange={handleChange}
              placeholder={t("donation.email.placeholder")}
              className="input-field"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("donation.phone.label")} <span className="text-red-500"> *</span>
            </label>
            <input
              name="phone"
              onChange={handleChange}
              placeholder={t("donation.phone.placeholder")}
              className="input-field"
              required
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("donation.amount.label")} <span className="text-red-500"> *</span>
            </label>
            <input
              name="paymentAmount"
              type="number"
              onChange={handleChange}
              placeholder={t("donation.amount.placeholder")}
              className="input-field"
              required
            />
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("donation.paymentMethod.label")} <span className="text-red-500"> *</span>
            </label>
            <select
              name="paymentMethod"
              onChange={handleChange}
              className="input-field"
            >
              <option value="Bank">{t("donation.paymentMethod.bank")}</option>
              <option value="MobileBanking">
                {t("donation.paymentMethod.mobile")} 
              </option>
            </select>
          </div>

          {/* BANK FIELDS */}
          {formData.paymentMethod === "Bank" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.accountNumber.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="accountNumber"
                  onChange={handleChange}
                  placeholder={t("donation.accountNumber.placeholder")}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.bankName.label")}  <span className="text-red-500"> *</span>
                </label>
                <input
                  name="bankName"
                  onChange={handleChange}
                  placeholder={t("donation.bankName.placeholder")}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.branchName.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="branchName"
                  onChange={handleChange}
                  placeholder={t("donation.branchName.placeholder")}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.branchCode.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="branchCode"
                  onChange={handleChange}
                  placeholder={t("donation.branchCode.placeholder")}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.swiftCode.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="swiftCode"
                  onChange={handleChange}
                  placeholder={t("donation.swiftCode.placeholder")}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.routingNumber.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="routingNumber"
                  onChange={handleChange}
                  placeholder={t("donation.routingNumber.placeholder")}
                  className="input-field"
                />
              </div>
            </>
          )}

          {/* MOBILE */}
          {formData.paymentMethod === "MobileBanking" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.mobileBank.label")} <span className="text-red-500"> *</span>
                </label>
                <select
                  name="mobileBankName"
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">{t("donation.mobileBank.select")}</option>
                  <option value="Bkash">
                    {t("donation.mobileBank.bkash")}
                  </option>
                  <option value="Nagad">
                    {t("donation.mobileBank.nagad")}
                  </option>
                  <option value="Rocket">
                    {t("donation.mobileBank.rocket")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.senderNumber.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="senderNumber"
                  onChange={handleChange}
                  placeholder={t("donation.senderNumber.placeholder")}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t("donation.transactionId.label")} <span className="text-red-500"> *</span>
                </label>
                <input
                  name="transactionID"
                  onChange={handleChange}
                  placeholder={t("donation.transactionId.placeholder")}
                  className="input-field"
                  required
                />
              </div>
            </>
          )}

          {/* IMAGE */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              {t("donation.screenshot.label")} <span className="text-red-500"> *</span>
            </label>
            <ImageUpload
              value={formData.screenshot}
              onChange={(file) =>
                setFormData((p) => ({ ...p, screenshot: file }))
              }
              preview={preview}
              setPreview={setPreview}
            />
          </div>

          {/* MESSAGE */}
          <div className="sm:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              {t("donation.message.label")} <span className="text-red-500"> *</span>
            </label>
            <textarea
              name="message"
              onChange={handleChange}
              placeholder={t("donation.message.placeholder")}
              className="input-field"
            />
          </div>

          {/* SUBMIT */}
          <button className="btn-primary sm:col-span-2">
            {isCreating ? t("donation.submitting") : t("donation.submit")}
          </button>
        </form>
      </motion.div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-xl text-center max-w-sm w-full"
            >
              {/* ICON */}
              <div className="text-5xl mb-2">🎉</div>

              {/* TITLE */}
              <h2 className="text-xl font-bold">
                {t("donationSuccess.title")}
              </h2>

              {/* MESSAGE */}
              <p className="text-gray-600 mt-2 text-sm">
                {t("donationSuccess.messageLine1")}
                <br />
                {t("donationSuccess.messageLine2")}
              </p>

              {/* PROCESSING */}
              <p className="mt-3 text-sm font-medium text-green-600">
                {t("donationSuccess.processing")}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="btn-primary mt-5 w-full"
              >
                {t("donationSuccess.close")}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationForm;

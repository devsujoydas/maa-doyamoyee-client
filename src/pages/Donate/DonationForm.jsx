import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const DonationForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    paymentMethod: "bank",
    bankName: "",
    accountNumber: "",
    branchName: "",
    routingNumber: "",
    senderAccount: "",
    mobileBankName: "",
    senderMobile: "",
    transactionID: "",
    amount: "",
    screenshot: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t("donation.donation_success"));
  };

  return (
    <div className="flex justify-center">
      <motion.div
        className="w-full md:w-2/3 p-8 rounded-2xl bg-white/80 backdrop-blur border border-zinc-200 shadow-lg mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("donation.submit_donation_proof")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Name */}
          <div>
            <label className="font-medium">{t("donation.name")}</label>
            <input
              type="text"
              name="donorName"
              placeholder={t("donation.name")}
              value={formData.donorName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">{t("donation.email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("donation.email")}
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium">{t("donation.phone")}</label>
            <input
              type="text"
              name="phone"
              placeholder={t("donation.phone")}
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="font-medium">
              {t("donation.payment_method")}
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="input-field"
            >
              <option value="bank">{t("donation.bank_transfer")}</option>
              <option value="mobile">
                {t("donation.mobile_banking_option")}
              </option>
            </select>
          </div>

          {/* Bank Fields */}
          {formData.paymentMethod === "bank" && (
            <>
              <div>
                <label className="font-medium">{t("donation.bank_name")}</label>
                <input
                  type="text"
                  name="bankName"
                  placeholder={t("donation.bank_name")}
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="font-medium">
                  {t("donation.account_number")}
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder={t("donation.account_number")}
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="font-medium">
                  {t("donation.branch_name")}
                </label>
                <input
                  type="text"
                  name="branchName"
                  placeholder={t("donation.branch_name")}
                  value={formData.branchName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="font-medium">
                  {t("donation.routing_number")}
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  placeholder={t("donation.routing_number")}
                  value={formData.routingNumber}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-medium">
                  {t("donation.sender_account")}
                </label>
                <input
                  type="text"
                  name="senderAccount"
                  placeholder={t("donation.sender_account")}
                  value={formData.senderAccount}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                />
              </div>
            </>
          )}

          {/* Mobile Banking Fields */}
          {formData.paymentMethod === "mobile" && (
            <>
              <div>
                <label className="font-medium">
                  {t("donation.select_mobile_banking")}
                </label>
                <select
                  name="mobileBankName"
                  value={formData.mobileBankName}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">
                    {t("donation.select_mobile_banking")}
                  </option>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                  <option value="taptap">Taptap Send</option>
                </select>
              </div>

              <div>
                <label className="font-medium">
                  {t("donation.sender_mobile")}
                </label>
                <input
                  type="text"
                  name="senderMobile"
                  placeholder={t("donation.sender_mobile")}
                  value={formData.senderMobile}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </>
          )}

          {/* Amount */}
          <div>
            <label className="font-medium">
              {t("donation.donation_amount")}
            </label>
            <input
              type="number"
              name="amount"
              placeholder={t("donation.donation_amount")}
              value={formData.amount}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Transaction ID */}
          <div>
            <label className="font-medium">
              {t("donation.transaction_id")}
            </label>
            <input
              type="text"
              name="transactionID"
              placeholder={t("donation.transaction_id")}
              value={formData.transactionID}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Screenshot */}
          <div className="sm:col-span-2">
            <label className="font-medium">
              {t("donation.upload_screenshot")}
            </label>
            <label className="upload-area">
              {formData.screenshot ? (
                <img
                  src={URL.createObjectURL(formData.screenshot)}
                  className="h-32 object-contain"
                  alt="proof"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#EDE9EA] flex items-center justify-center rounded-lg mb-4">
                    <FaUpload className="text-2xl text-[#4b1e2f]" />
                  </div>
                  <p className="text-gray-600">
                    Drop your image here, or{" "}
                    <span className="text-[#4b1e2f] cursor-pointer font-medium">
                      browse
                    </span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Supports: PNG, JPG, JPEG, WEBP
                  </p>
                </div>
              )}
              <input
                type="file"
                name="screenshot"
                onChange={handleChange}
                accept="image/*"
                hidden
              />
            </label>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label className="font-medium">{t("donation.message")}</label>
            <textarea
              name="message"
              placeholder={t("donation.message_placeholder")}
              value={formData.message}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Submit Button */}
          <button className="btn-primary sm:col-span-2">
            {t("donation.submit_donation")}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DonationForm;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { createDonationService } from "../../services/donationService";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    donationAmount: "",
    optionalMessage: "",
    paymentMethod: "bank transfer",
    bankDetails: {},
    mobileBankingDetails: {},
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDonationService(formData);
      toast.success("Donation submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        donationAmount: "",
        optionalMessage: "",
        paymentMethod: "bank transfer",
        bankDetails: {},
        mobileBankingDetails: {},
      });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
        <option value="bank transfer">Bank Transfer</option>
        <option value="mobile banking">Mobile Banking</option>
      </select>

      {/* BANK */}
      {formData.paymentMethod === "bank transfer" && (
        <>
          <input placeholder="Bank Name" onChange={(e)=>handleNestedChange("bankDetails","bankName",e.target.value)} />
          <input placeholder="Branch Name" onChange={(e)=>handleNestedChange("bankDetails","branchName",e.target.value)} />
          <input placeholder="Branch Code" onChange={(e)=>handleNestedChange("bankDetails","branchCode",e.target.value)} />
          <input placeholder="SWIFT Code" onChange={(e)=>handleNestedChange("bankDetails","SWIFTCode",e.target.value)} />
          <input placeholder="Routing Number" onChange={(e)=>handleNestedChange("bankDetails","routingNumber",e.target.value)} />
          <input placeholder="Sender Account Number" onChange={(e)=>handleNestedChange("bankDetails","senderAccountNumber",e.target.value)} />
        </>
      )}

      {/* MOBILE */}
      {formData.paymentMethod === "mobile banking" && (
        <>
          <select onChange={(e)=>handleNestedChange("mobileBankingDetails","selectMobileBanking",e.target.value)}>
            <option value="">Select</option>
            <option value="bkash">Bkash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
          </select>

          <input placeholder="Sender Mobile"
            onChange={(e)=>handleNestedChange("mobileBankingDetails","senderMobileNumber",e.target.value)} />

          <input placeholder="Transaction ID"
            onChange={(e)=>handleNestedChange("mobileBankingDetails","transactionId",e.target.value)} />
        </>
      )}

      <input type="number" name="donationAmount" placeholder="Amount" value={formData.donationAmount} onChange={handleChange} required />

      <input type="file" name="paymentScreenshot" onChange={handleChange} />

      <textarea name="optionalMessage" placeholder="Message" value={formData.optionalMessage} onChange={handleChange} />

      <button type="submit">Submit Donation</button>
    </form>
  );
};

export default DonationForm;
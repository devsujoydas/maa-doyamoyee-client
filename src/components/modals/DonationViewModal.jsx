const DonationViewModal = ({ selectedDonation }) => {
  if (!selectedDonation) return null;

  return (
    <div>
      <h2>{selectedDonation.name}</h2>

      <p>৳ {selectedDonation.donationAmount}</p>

      <p>
        {selectedDonation.paymentMethod === "bank transfer"
          ? selectedDonation.bankDetails?.bankName
          : selectedDonation.mobileBankingDetails?.selectMobileBanking}
      </p>

      <p>
        {selectedDonation.mobileBankingDetails?.transactionId}
      </p>

      <p>{selectedDonation.optionalMessage}</p>
    </div>
  );
};

export default DonationViewModal;
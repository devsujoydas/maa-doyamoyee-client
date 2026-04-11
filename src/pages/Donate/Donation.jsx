import { motion } from "framer-motion";
import PageHeading from "../../shared/PageHeading";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import DonationForm from "./DonationForm";

/* ------------------ DATA ------------------ */
const bankAccounts = [
  {
    bank: "Dutch-Bangla Bank (DBBL)",
    accountName: "Maa Doyamoyee Mandir",
    number: "112233445566778899",
    branch: "Jamalpur Branch",
    branchCode: "206",
    swiftCode: "DBBLBDDH",
    routingNumber: "090390625",
    logo: "https://images.seeklogo.com/logo-png/31/1/dutch-bangla-bank-ltd-logo-png_seeklogo-310356.png",
  },
  {
    bank: "Sonali Bank",
    accountName: "Maa Doyamoyee Mandir",
    number: "112233445566778899",
    branch: "Jamalpur Branch",
    branchCode: "001",
    swiftCode: "SONALIBD",
    routingNumber: "SONALIBD",
    logo: "https://images.seeklogo.com/logo-png/31/1/sonali-bank-limited-logo-png_seeklogo-318183.png",
  },
  {
    bank: "Islami Bank",
    accountName: "Maa Doyamoyee Mandir",
    number: "112233445566778899",
    branch: "Jamalpur Branch",
    branchCode: "102",
    swiftCode: "IBBLBDDH",
    routingNumber: "IBBLBDDH",
    logo: "https://images.seeklogo.com/logo-png/55/1/islami-bank-bangladesh-plc-logo-png_seeklogo-550096.png",
  },
];

const mobileBanking = [
  {
    name: "bKash",
    accountName: "Maa Doyamoyee Mandir",
    number: "0123456789",
    logo: "https://images.seeklogo.com/logo-png/27/1/bkash-logo-png_seeklogo-273684.png",
  },
  {
    name: "Nagad",
    accountName: "Maa Doyamoyee Mandir",
    number: "0123456789",
    logo: "https://images.seeklogo.com/logo-png/41/1/nagad-logo-png_seeklogo-411803.png",
  },
  {
    name: "Rocket",
    accountName: "Maa Doyamoyee Mandir",
    number: "0123456789",
    logo: "https://images.seeklogo.com/logo-png/31/1/dutch-bangla-rocket-logo-png_seeklogo-317692.png",
  },
];

/* ------------------ COMPONENT ------------------ */
const Donation = () => {
  const { t } = useTranslation();

  const copyNumber = (num) => {
    navigator.clipboard.writeText(num);
    toast.success(t("number_copied"));
  };

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-500/30 blur-3xl rounded-full"></div>

      <div className="custom-container">
        <PageHeading section="donation" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ---------------- BANK ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {t("bank_accounts")}
            </h2>

            {bankAccounts.map((acc, i) => (
              <div
                key={i}
                className="flex justify-between items-start bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-4 hover:shadow-xl transition"
              >
                <div className="flex gap-3 w-full">
                  <img
                    src={acc.logo}
                    alt={acc.bank}
                    className="w-10 h-10 object-contain"
                  />

                  <div className="w-full">
                    <p className="text-sm text-gray-500">{acc.bank}</p>

                    <p className="font-medium text-gray-800">
                      {acc.accountName}
                    </p>

                    {/* Highlighted Account Number */}
                    <p className="text-lg font-semibold tracking-wider text-gray-900 mt-1">
                      {acc.number}
                    </p>

                    <div className="grid grid-cols-2 gap-x-4 text-xs text-gray-500 mt-2">
                      <span>Branch Name: {acc.branch}</span>
                      <span>Branch Code: {acc.branchCode}</span>
                      <span>SWIFT: {acc.swiftCode}</span>
                      <span>Routing: {acc.routingNumber}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyNumber(acc.number)}
                  className="ml-3 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-black transition active:scale-95"
                >
                  Copy
                </button>
              </div>
            ))}
          </motion.div>

          {/* ---------------- MOBILE ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {t("mobile_banking_option")}
            </h2>

            {mobileBanking.map((acc, i) => (
              <div
                key={i}
                className="flex justify-between items-start bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-4 hover:shadow-xl transition"
              >
                <div className="flex gap-3 w-full">
                  <img
                    src={acc.logo}
                    alt={acc.name}
                    className="w-10 h-10 object-contain"
                  />

                  <div className="w-full">
                    <p className="text-sm text-gray-500">{acc.name}</p>

                    <p className="font-medium text-gray-800">
                      {acc.accountName}
                    </p>

                    {/* Highlight Number */}
                    <p className="text-lg font-semibold tracking-wider text-gray-900 mt-1">
                      {acc.number}
                    </p>

                    {acc.note && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        {acc.note}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => copyNumber(acc.number)}
                  className="ml-3 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-black transition active:scale-95"
                >
                  Copy
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* FORM */}
        <div className="mt-10">
          <DonationForm />
        </div>
      </div>
    </div>
  );
};

export default Donation;
import { motion } from "framer-motion";
import { Sun, Clock, AlertCircle, Moon } from "lucide-react";
import PageHeading from "../../shared/PageHeading";
import SEO from "../../components/SEO";
import { useTranslation } from "react-i18next";

const PujaSchedule = () => {
  const { t } = useTranslation();

  const morningItems = ["wake", "shiv", "annapurna", "anjali", "bhog"];

  return (
    <div className="custom-container">
      <SEO
        title="পূজার সময়সূচী | Maa Doyamoyee Temple"
        description="মা দয়াময়ী মন্দিরের দৈনিক পূজার সময়সূচী, অঞ্জলি, আরতি ও ভোগের সময় বিস্তারিত জানুন।"
        url="https://maa-doyamoyee.vercel.app/puja-schedule"
        keywords="puja schedule Bangladesh, temple puja time"
      />

      <PageHeading title={t("puja.title")} desc={t("puja.desc")} />

      {/* Grid Layout Design */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Morning Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-orange-600 font-semibold text-lg mb-4">
            <Sun size={18} /> {t("puja.morning")}
          </h2>

          <div className="space-y-3">
            {morningItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition"
              >
                <Clock size={16} className="mt-1" />
                <p className="text-gray-700 text-sm md:text-base">
                  {t(`puja.${item}`)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Evening Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-purple-600 font-semibold text-lg mb-4">
            <Moon size={18} /> {t("puja.evening")}
          </h2>

          <div className="bg-purple-50 p-4 rounded-xl flex items-center gap-2">
            <Clock size={16} />
            <p className="text-gray-700 text-sm md:text-base">
              {t("puja.arati")}
            </p>
          </div>
        </motion.div>

        {/* Closed Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-red-600 font-semibold text-lg mb-4">
            <AlertCircle size={18} /> {t("puja.closed")}
          </h2>

          <p className="text-gray-700 text-sm md:text-base mb-2">
            {t("puja.closed_desc")}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            {t("puja.closed_time")}
          </p>
        </motion.div>

        {/* Notes Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-yellow-700 font-semibold text-lg mb-4">
            <AlertCircle size={18} /> {t("puja.notes")}
          </h2>

          <ul className="space-y-2 text-gray-700 text-sm md:text-base">
            <li>• {t("puja.note1")}</li>
            <li>• {t("puja.note2")}</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
};

export default PujaSchedule;
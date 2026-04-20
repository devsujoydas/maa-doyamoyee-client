import { motion } from "framer-motion";
import { Sun, Clock, AlertCircle, Moon } from "lucide-react";
import PageHeading from "../../shared/PageHeading";
import SEO from "../../components/SEO";
import { useTranslation } from "react-i18next";

const PujaSchedule = () => {
  const { t } = useTranslation();

  const morningItems = ["wake", "shiv", "annapurna"];
  const afternoonItems = ["anjali", "anjoli_start"];

  return (
    <div className="custom-container">
      <SEO
        title="পূজার সময়সূচী | Maa Doyamoyee Temple"
        description="মা দয়াময়ী মন্দিরের দৈনিক পূজার সময়সূচী, অঞ্জলি, আরতি ও ভোগের সময় বিস্তারিত জানুন।"
        url="https://www.maa-doyamoyee.com/puja-schedule"
        keywords="puja schedule Bangladesh, temple puja time"
      />

      <PageHeading title={t("puja.title")} desc={t("puja.desc")} />

      <div className="grid md:grid-cols-2 gap-6">

        {/* Morning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-orange-600 font-semibold text-lg mb-4">
            <Sun size={18} /> {t("puja.morning.title")}
          </h2>

          <div className="space-y-3">
            {morningItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition"
              >
                <Clock size={16} className="mt-1" />
                <p className="text-gray-700 text-sm md:text-base">
                  {t(`puja.morning.${item}`)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Afternoon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-blue-600 font-semibold text-lg mb-4">
            <Sun size={18} /> {t("puja.afternoon.title")}
          </h2>

          <div className="space-y-3">
            {afternoonItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
              >
                <Clock size={16} className="mt-1" />
                <p className="text-gray-700 text-sm md:text-base">
                  {t(`puja.afternoon.${item}`)}
                </p>
              </div>
            ))}

            {/* Bhog Section */}
            <div className="p-3 rounded-xl bg-blue-50 space-y-2">
              <p className="font-medium text-gray-800">
                {t("puja.afternoon.bhog.title")}
              </p>
              <p className="text-sm text-gray-700">
                {t("puja.afternoon.bhog.time")}
              </p>

              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>{t("puja.afternoon.bhog.details.0")}</li>
                <li>{t("puja.afternoon.bhog.details.1")}</li>
              </ul>

              <p className="text-sm text-green-700 font-medium">
                {t("puja.afternoon.bhog.pera_vog")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Evening */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-purple-600 font-semibold text-lg mb-4">
            <Moon size={18} /> {t("puja.evening.title")}
          </h2>

          <div className="space-y-3">
            <div className="bg-purple-50 p-4 rounded-xl flex items-center gap-2">
              <Clock size={16} />
              <p className="text-gray-700 text-sm md:text-base">
                {t("puja.evening.evening_arati")}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl flex items-center gap-2">
              <Clock size={16} />
              <p className="text-gray-700 text-sm md:text-base">
                {t("puja.evening.evening_puja")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 rounded-xl md:rounded-3xl shadow-lg p-5 md:p-6"
        >
          <h2 className="flex items-center gap-2 text-red-600 font-semibold text-lg mb-4">
            <AlertCircle size={18} /> {t("puja.closing.title")}
          </h2>

          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <p>{t("puja.closing.summer")}</p>
            <p>{t("puja.closing.winter")}</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PujaSchedule;
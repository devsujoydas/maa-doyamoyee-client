import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div className=" bg-gray-50 py-10 md:py-16 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10"
      >
        {/* Title */}
        <motion.h1
          variants={item}
          className="text-2xl md:text-3xl font-bold text-gradient text-center mb-6"
        >
          {t("terms.title")}
        </motion.h1>

        {/* Intro */}
        <motion.p variants={item} className="text-gray-600 mb-6 text-center text-sm md:text-[16px]">
          {t("terms.intro")}
        </motion.p>

        {/* Purpose */}
        <motion.section variants={item} className="mb-6">
          <h2 className="md:text-xl text-lg font-semibold mb-2 text-gray-800">
            {t("terms.purposeTitle")}
          </h2>
          <p className="text-gray-600 text-sm md:text-[16px]">{t("terms.purpose")}</p>
        </motion.section>

        {/* Donations */}
        <motion.section variants={item} className="mb-6">
          <h2 className="md:text-xl text-lg font-semibold mb-2 text-gray-800">
            {t("terms.donationTitle")}
          </h2>
          <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm md:text-[16px]">
            <li>{t("terms.donation1")}</li>
            <li>{t("terms.donation2")}</li>
            <li>{t("terms.donation3")}</li>
          </ul>
        </motion.section>

        {/* User Conduct */}
        <motion.section variants={item} className="mb-6">
          <h2 className="md:text-xl text-lg font-semibold mb-2 text-gray-800">
            {t("terms.userTitle")}
          </h2>
          <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm md:text-[16px]">
            <li>{t("terms.user1")}</li>
            <li>{t("terms.user2")}</li>
            <li>{t("terms.user3")}</li>
            <li>{t("terms.user4")}</li>
          </ul>
        </motion.section>

        {/* Info */}
        <motion.section variants={item} className="mb-6">
          <h2 className="md:text-xl text-lg font-semibold mb-2 text-gray-800">
            {t("terms.infoTitle")}
          </h2>
          <p className="text-gray-600 text-sm md:text-[16px]">{t("terms.info")}</p>
        </motion.section>

        {/* Changes */}
        <motion.section variants={item}>
          <h2 className="md:text-xl text-lg font-semibold mb-2 text-gray-800">
            {t("terms.changeTitle")}
          </h2>
          <p className="text-gray-600 text-sm md:text-[16px]">{t("terms.change")}</p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;
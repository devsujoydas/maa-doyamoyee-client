import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SupporttheTemple = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-primary text-color-primary py-5 md:py-0 relative overflow-hidden ">
      <div className="text-center  custom-container">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} 
          className="text-2xl md:text-5xl font-bold  mb-6 text-gradient"
        >
          {t("supportTemple_title")}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=" max-w-2xl mx-auto text-sm md:text-lg mb-10"
        >
          {t("supportTemple_description")}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center"
        >
          <Link to="/donation">
            <button className="btn-primary">
              {t("supportTemple_button")}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SupporttheTemple;

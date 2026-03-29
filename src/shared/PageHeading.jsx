import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PageHeading = ({ title, desc, shortdesc, section }) => {
  const { t } = useTranslation();
 
  const headingTitle = section ? t(`${section}_title`) : title;
  const headingDesc = section ? t(`${section}_desc`) : desc;
  const headingShortDesc = section ? t(`${section}_shortdesc`) : shortdesc;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#7a0c0c] leading-snug">
          {headingTitle}
        </h1>

        <p className="text-sm sm:text-base md:text-lg mt-3 text-gray-700">
          {headingDesc}
        </p>

        {headingShortDesc && (
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {headingShortDesc}
          </p>
        )}

        <div className="flex items-center justify-center mt-3 sm:mt-6">
          <div className="h-0.5 w-12 sm:w-20 bg-linear-to-r from-transparent via-yellow-600 to-transparent"></div>
          <div className="mx-3 text-yellow-700 text-base sm:text-xl">🔱</div>
          <div className="h-0.5 w-12 sm:w-20 bg-linear-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default PageHeading;
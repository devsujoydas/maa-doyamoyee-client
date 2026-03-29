import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LinkButton = ({ path, title, isArrow }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }} 

      className="mt-4 hover:scale-105 active:scale-95 transition-all sm:mt-6 flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start "
    >
      <Link
        to={`${path}`}
        className="group relative inline-flex items-center rounded-full border border-white/15 p-0.5  w-full sm:w-auto"
      >
        <span
          className="
            btn-bg-primary btn-text-primary 
             
            inline-flex items-center justify-center gap-1
            rounded-full 
            px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
            text-xs sm:text-sm font-semibold
            transition-all duration-300
            w-full sm:w-auto
            group-hover:shadow-[0_0_24px_rgba(201,103,232,0.35)]
           
          "
        >
          {t(title)}

          {isArrow && (
            <span
              className="
                flex items-center justify-center
                h-5 w-5 
                rounded-full
                shrink-0
              "
            >
              <ArrowRight size={14} className="" />
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );
};

export default LinkButton;

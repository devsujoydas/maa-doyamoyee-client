import { motion } from "framer-motion"; 
import { useTranslation } from "react-i18next";
import SectionHeading from "../../shared/SectionHeading";

const About = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="history"
      className="bg-primary text-color-primary overflow-hidden"
    >
      <div className="custom-container">

        {/* Section Heading */}
        <SectionHeading
          title={t("about_title")}
          pathname={t("read_more")}
          path="/history" 
        />

        <div className="flex flex-col xl:flex-row items-center gap-12 lg:gap-20">

          {/* Temple Image */}
          <motion.div
            className="lg:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200 hover:scale-105 transition-transform duration-500"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img loading="lazy"
              src={"/about/tample-about.webp"}
              alt="Doyamoyee Temple"
              className="w-full h-90 sm:h-112.5 md:h-125 lg:h-137.5 xl:h-150 object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 w-full space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{  delay: 0.2 }}
          >
            {/* About Description */}
            <p className=" text-sm sm:text-lg leading-relaxed">
              {t("about_text")}
            </p>

            {/* Divider */}
            <div className="w-20 h-1 bg-amber-500 rounded-full my-2"></div>

            {/* History */}
            <h3 className="text-xl md:text-2xl font-bold text-gradient">
              {t("history_title")}
            </h3>
            <p className=" text-sm sm:text-lg leading-relaxed">
              {t("history_text")}
            </p>

            {/* Establishment Card */}
            <motion.div
              className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-3 md:p-6 border border-amber-200 space-y-3 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-xl md:text-2xl font-bold text-gradient mb-3">
                {t("establishment_title")}
              </h4>

              <ul className=" space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base list-disc list-inside">
                <li>{t("established")}</li>
                <li>{t("founder")}</li>
                <li className="">{t("estate_founder")}</li>
                <li className="">{t("development")}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
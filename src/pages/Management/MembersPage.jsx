import { motion } from "framer-motion";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";
import { membersData } from "../../data/data";

const MembersPage = () => {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
      <div className="custom-container">
        <PageHeading
          title={t("member_title")}
          desc={t("member_desc")}
          shortdesc={t("member_shortdesc", { count: membersData.length })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lang-bn-BD">
          {membersData.map((member, index) => (
            <motion.div
              key={member.sl_no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.001 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer  bg-white/80 backdrop-blur border border-yellow-500/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-5 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 active:-translate-y-2 transition-all "
            >
              {/* Glow Hover Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 
                  bg-linear-to-r from-yellow-400/10 to-red-600/10 
                  transition duration-500"
              ></div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-yellow-500 to-red-700 text-white px-2 sm:px-4 py-1 rounded-full text-xs">
                {member.sl_no}
              </div>

              <h3 className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-gray-800 ">
                {member.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersPage;

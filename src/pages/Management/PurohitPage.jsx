import { motion } from "framer-motion";
import PageHeading from "../../shared/PageHeading";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO";

const PurohitPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    Fancybox.bind("[data-fancybox='purohit-image']", {});
    return () => Fancybox.unbind("[data-fancybox='purohit-image']");
  }, []);

  const purohitsData = t("purohit.data", { returnObjects: true }) || [];

  return (
    <div className="relative">
      <SEO
        title="Temple Purohit | Maa Doyamoyee Temple"
        description="Meet the purohits of Maa Doyamoyee Temple. Learn about their roles, rituals and religious responsibilities."
        url="https://www.maa-doyamoyee.com/purohit"
        image={"https://www.maa-doyamoyee.com/purohit/sajal.webp"}
        keywords="purohit, temple priest Bangladesh, Hindu priest Jamalpur, পূজারী"
      />
      {/* BG Effects */}
      <div className="absolute top-10 left-4 w-32 h-32 sm:w-40 sm:h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-4 w-40 h-40 sm:w-52 sm:h-52 bg-red-600 blur-3xl opacity-20 rounded-full animate-pulse"></div>

      <div className="custom-container">
        <PageHeading section="purohit" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto">
          {purohitsData.map((pandit, index) => (
            <motion.div
              key={pandit.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl border border-zinc-200 overflow-hidden shadow-xl  bg-white"
            >
              {/* BACKGROUND */}

              {/* TOP BORDER */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500"></div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 
                  bg-linear-to-r from-yellow-400/5 to-red-600/5 
                  transition duration-500"
              ></div>

              {/* MAIN CONTENT */}
              <div className="relative p-5 flex flex-col md:flex-row gap-6 items-stretch  h-full">
                {/* LEFT IMAGE FULL HEIGHT */}
                <div className="relative overflow-hidden rounded-lg shrink-0 md:w-[40%] w-full h-72 md:h-full ">
                  <a
                    href={pandit.image}
                    data-fancybox="purohit-image"
                    data-caption={pandit.name}
                    className="block w-full h-full"
                  >
                    <img
                      src={pandit.image}
                      alt={pandit.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700"
                    />
                  </a>

                  {/* overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1 text-center md:text-left">
                  {/* NAME */}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {pandit.name}
                  </h2>

                  {/* DESIGNATION */}
                  <span className="inline-block mt-2 px-4 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
                    {pandit.designation}
                  </span>

                  {/* DIVIDER */}
                  <div className="w-20 h-0.5 bg-linear-to-r from-yellow-400 to-red-400 mt-4 mx-auto md:mx-0"></div>

                  {pandit?.bio2 && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-lg">
                      {pandit?.bio2}
                    </p>
                  )}
                  {/* BIO */}
                  {pandit.bio && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-lg">
                      {pandit.bio}
                    </p>
                  )}

                  {/* CONTACT */}
                  <div className="mt-5 grid  grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/70 border border-zinc-100 rounded-xl p-3">
                      <p className="font-semibold">{t("purohit.phone")}</p>
                      <a href={`tel:${pandit.phone}`} className="text-blue-600">
                       +88 {pandit.phone}
                      </a>
                    </div>

                    {pandit.email && (
                      <div className="bg-white/70 border border-zinc-100 rounded-xl p-3">
                        <p className="font-semibold">{t("purohit.email")}</p>
                        <a
                          href={`mailto:${pandit.email}`}
                          className="text-blue-600"
                        >
                          {pandit.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                    <a
                      href={`tel:${pandit.phone}`}
                      className="px-6 py-2 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium shadow-md hover:scale-105 transition"
                    >
                      {t("purohit.call")}
                    </a>

                    {pandit.email && (
                      <a
                        href={`mailto:${pandit.email}`}
                        className="px-6 py-2 rounded-full border border-yellow-500 text-yellow-700 text-sm font-medium hover:bg-yellow-50 transition"
                      >
                        {t("purohit.mail")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurohitPage;

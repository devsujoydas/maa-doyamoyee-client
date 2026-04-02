import { motion } from "framer-motion";
import PageHeading from "../../shared/PageHeading";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const PurohitPage = () => {

  const { t } = useTranslation();

  useEffect(() => {
    Fancybox.bind("[data-fancybox='purohit-image']", {});
    return () => Fancybox.unbind("[data-fancybox='purohit-image']");
  }, []);

  const purohitsData = t("purohit.data", { returnObjects: true });

  return (
    <section className="custom-container py-10">
      <PageHeading section="purohit" />

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-10">

        {purohitsData.map((pandit, index) => (
          <motion.div
            key={pandit.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group flex flex-col sm:flex-row items-stretch gap-5 bg-white/60 backdrop-blur-md rounded-3xl shadow-md hover:shadow-xl border border-zinc-100 p-4 sm:p-5 md:p-6"
          >

            {/* IMAGE */}
            <div className="w-full sm:w-[40%] shrink-0">
              <div className="w-full aspect-4/5 rounded-2xl overflow-hidden">
                <a
                  href={pandit.image}
                  data-fancybox="purohit-image"
                  data-caption={pandit.name}
                >
                  <img
                    src={pandit.image}
                    alt={pandit.name}
                    className="w-full h-full object-cover object-top  transition"
                  />
                </a>
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-4 text-center sm:text-left">

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {pandit.name}
                </h2>
                <p className="text-yellow-600">
                  {pandit.designation}
                </p>
              </div>

              <div className="text-sm space-y-2">
                <p><b>{t("purohit.experience")}:</b> {pandit.experience}</p>
                <p><b>{t("purohit.speciality")}:</b> {pandit.speciality}</p>
                <p><b>{t("purohit.availability")}:</b> {pandit.availableDays}</p>

                <p>
                  <b>{t("purohit.phone")}:</b>{" "}
                  <a href={`tel:${pandit.phone}`} className="text-blue-600">
                    {pandit.phone}
                  </a>
                </p>

                {pandit.email && (
                  <p>
                    <b>{t("purohit.email")}:</b>{" "}
                    <a href={`mailto:${pandit.email}`} className="text-blue-600">
                      {pandit.email}
                    </a>
                  </p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href={`tel:${pandit.phone}`}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-full text-sm"
                >
                  {t("purohit.call")}
                </a>

                {pandit.email && (
                  <a
                    href={`mailto:${pandit.email}`}
                    className="px-4 py-2 border border-yellow-600 rounded-full text-sm"
                  >
                    {t("purohit.mail")}
                  </a>
                )}
              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default PurohitPage;
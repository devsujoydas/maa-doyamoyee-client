import { motion } from "framer-motion";
import { MapPin, PhoneCall, Mail } from "lucide-react";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="relative">
      {/* Existing Glow */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container ">
        <PageHeading section="contact" />

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start w-7xl mx-auto">

          {/* ================= LEFT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
              <Mail className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="text-sm text-gray-600">{t("contact_email")}</h4>
                <p className="text-gray-900 font-medium">{t("footer_contact_email")}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
              <PhoneCall className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="text-sm text-gray-600">{t("contact_phone")}</h4>
                <p className="text-gray-900 font-medium">{t("footer_contact_phone")}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
              <MapPin className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="text-sm text-gray-600">{t("contact_address")}</h4>
                <p className="text-gray-900 font-medium">
                  {t("footer_contact_address")}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.1118780753955!2d89.94966128738012!3d24.92327856258347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd7f6c3dfab4c3%3A0xb69912834310fba9!2sDoyamoyee%20Temple!5e1!3m2!1sbn!2sbd!4v1772283605228!5m2!1sbn!2sbd"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                title="map"
              ></iframe>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-bold text-gray-900  text-center mb-2">
              {t("send_message")}
            </h3> 

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  {t("name")}
                </label>
                <input
                  type="text"
                  placeholder={t("enter_name")}
                  className="input-field"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  {t("email")}
                </label>
                <input
                  type="email"
                  placeholder={t("email_placeholder")}
                  className="input-field"
                />
              </div>
              
              {/* Phone */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  {t("contact_phone")}
                </label>
                <input
                  type="number"
                  placeholder={t("phone_placeholder")}
                  className="input-field"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  {t("message")}
                </label>
                <textarea
                  rows={5}
                  placeholder={t("message_placeholder")}
                  className="input-field"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn-primary w-full"
              >
                {t("submit")}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
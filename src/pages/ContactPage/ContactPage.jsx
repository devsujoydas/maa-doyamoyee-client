import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, PhoneCall, Mail } from "lucide-react";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";
import { createMessage } from "../../services/messageService";
import toast from "react-hot-toast";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Required fields missing");
    }

    try {
      await createMessage(form);
      toast.success("Message sent!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send message");
    }
  };

  return (
    <section className="relative">
      <div className="custom-container">
        <PageHeading section="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start w-7xl mx-auto">

          {/* LEFT SAME */}
          <motion.div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
              <Mail className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="text-sm text-gray-600">{t("contact_email")}</h4>
                <p className="text-gray-900 font-medium">{t("footer_contact_email")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
              <PhoneCall className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="text-sm text-gray-600">{t("contact_phone")}</h4>
                <p className="text-gray-900 font-medium">{t("footer_contact_phone")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
              <MapPin className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="text-sm text-gray-600">{t("contact_address")}</h4>
                <p className="text-gray-900 font-medium">{t("footer_contact_address")}</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM SAME */}
          <motion.div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-2">
              {t("send_message")}
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("enter_name")}
                className="input-field"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("email_placeholder")}
                className="input-field"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("phone_placeholder")}
                className="input-field"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("message_placeholder")}
                rows={5}
                className="input-field"
              />

              <button type="submit" className="btn-primary w-full">
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
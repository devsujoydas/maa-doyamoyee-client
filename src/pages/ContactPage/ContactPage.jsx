import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, PhoneCall, Mail } from "lucide-react";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";
import { createMessage } from "../../services/messageService";
import toast from "react-hot-toast";
import SEO from "../../components/SEO";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error(t("required_fields"));
    }

    try {
      setSending(true);
      await createMessage(form);

      toast.success(t("message_sent"));

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error(t("message_failed"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative">
      <SEO
        title="Contact Maa Doyamoyee Temple | যোগাযোগ"
        description="Get in touch with Maa Doyamoyee Temple. Find location, phone number and contact details."
        url="https://maa-doyamoyee.vercel.app/contact"
        keywords="contact temple, Jamalpur temple contact, Maa Doyamoyee contact, যোগাযোগ"
      />

      <div className="custom-container">
        <PageHeading section="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  items-start max-w-352.5 mx-auto">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <motion.div className="space-y-4">
              {/* EMAIL */}
              <div className="flex items-center border border-zinc-100 gap-4 bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <Mail className="w-6 h-6 text-yellow-600" />
                <div>
                  <h4 className="text-sm text-gray-600">
                    {t("contact_email")}
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {t("footer_contact_email")}
                  </p>
                </div>
              </div>
              {/* PHONE */}
              <div className="flex items-center border border-zinc-100 gap-4 bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <PhoneCall className="w-6 h-6 text-yellow-600" />
                <div>
                  <h4 className="text-sm text-gray-600">
                    {t("contact_phone")}
                  </h4>
                  <p className="text-gray-900 font-medium">+880 1234-567890</p>
                  <p className="text-gray-900 font-medium">
                    শ্রী শ্রীঁ রী দয়াময়ী মন্দির পরিচালনা পরিষদ, জামালপুর
                  </p>
                </div>
              </div>
              <div className="flex items-center border border-zinc-100 gap-4 bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <PhoneCall className="w-6 h-6 text-yellow-600" />
                <div>
                  <h4 className="text-sm text-gray-600">
                    {t("contact_phone")}
                  </h4>
                  <p className="text-gray-900 font-medium">+880 1711-975862</p>
                  <p className="text-gray-900 font-medium">
                    শ্রী সিদ্ধার্থ শংকর রায়
                  </p>
                  <p className="text-gray-900 font-medium">
                    সভাপতি, শ্রী শ্রীঁ রী দয়াময়ী মন্দির পরিচালনা পরিষদ, জামালপুর
                  </p>
                </div>
              </div>
              <div className="flex items-center border border-zinc-100 gap-4 bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <PhoneCall className="w-6 h-6 text-yellow-600" />
                <div>
                  <h4 className="text-sm text-gray-600">
                    {t("contact_phone")}
                  </h4>
                  <p className="text-gray-900 font-medium">+880 1711-645044</p>
                  <p className="text-gray-900 font-medium">
                    শ্রী রঞ্জন কুমার সিংহ
                  </p>
                  <p className="text-gray-900 font-medium">
                    সাধারণ সম্পাদক, শ্রী শ্রীঁ রী দয়াময়ী মন্দির পরিচালনা পরিষদ,
                    জামালপুর
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-center border border-zinc-100 gap-4 bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <MapPin className="w-6 h-6 text-yellow-600" />
                <div>
                  <h4 className="text-sm text-gray-600">
                    {t("contact_address")}
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {t("footer_contact_address")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* MAP */}
          </div>

          {/* RIGHT FORM */}
          <motion.div className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30">
            <h3 className="text-2xl font-bold text-center mb-6">
              {t("send_message")}
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("name")} <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("enter_name")}
                  className="input-field"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("email")} <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("email_placeholder")}
                  className="input-field"
                />
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("phone")}
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("phone_placeholder")}
                  className="input-field"
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  j
                  placeholder={t("message_placeholder")}
                  rows={5}
                  className="input-field resize-y"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full"
              >
                {sending ? t("sending") : t("submit")}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="max-w-352.5 mx-auto mt-10 h-120 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.1118780753955!2d89.94966128738012!3d24.92327856258347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd7f6c3dfab4c3%3A0xb69912834310fba9!2sDoyamoyee%20Temple!5e1!3m2!1sbn!2sbd!4v1772283605228!5m2!1sbn!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Location Map"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;

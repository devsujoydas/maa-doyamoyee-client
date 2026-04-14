import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLocationSharp, IoCall } from "react-icons/io5";

const Footer = () => {
  const { t } = useTranslation();

  const templeLinks = [
    { to: "/history", label: t("nav_history") },
    { to: "/events", label: t("nav_events") },
    { to: "/puja-schedule", label: t("nav_puja_schedule") },
  ];

  const mediaLinks = [
    { to: "/gallery", label: t("nav_gallery") },
    { to: "/videos", label: t("nav_video") },
  ];

  const managementLinks = [
    { to: "/purohit", label: t("nav_purohit") },
    { to: "/committee", label: t("nav_committee") },
    { to: "/members", label: t("nav_members") },
    { to: "/advisors", label: t("nav_advisor") },
  ];

  const otherLinks = [
    { to: "/blogs", label: t("nav_posts") },
    { to: "/notices", label: t("nav_notice") },
    { to: "/contact", label: t("nav_contact") },
    { to: "/donation", label: t("nav_donation") },
  ];

  const renderLinks = (links) =>
    links.map((item, i) => (
      <li key={i}>
        <Link to={item.to} className="hover:text-yellow-500 transition-colors">
          {item.label}
        </Link>
      </li>
    ));

  return (
    <footer className="bg-shared-primary text-shared-color-primary pt-16 pb-8  border-gray-200  transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10 lg:gap-20">
        {/* Left Column: About + Links */}
        <div className="flex-1 flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* About */}
          <div className="lg:w-1/3">
            <h3 className="text-xl md:text-2xl font-bold text-gradient mb-4 ">
              {t("site_name")}
            </h3>
            <p className="desc-text leading-relaxed mb-4">
              {t("footer_about_text")}
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <IoCall className="text-yellow-600 " />{" "}
                {t("footer_contact_phone")}
              </p>
              <p className="flex items-center gap-2">
                <MdOutlineAlternateEmail className="text-yellow-600 " />{" "}
                {t("footer_contact_email")}
              </p>
              <p className="flex items-center gap-2">
                <IoLocationSharp className="text-yellow-600 " />{" "}
                {t("footer_contact_address")}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {/* Temple */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4 ">
                {t("nav_temple_title")}
              </h3>
              <ul className="space-y-2 text-sm md:text-base">{renderLinks(templeLinks)}</ul>
            </div>

            {/* Media */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4 ">
                {t("nav_media")}
              </h3>
              <ul className="space-y-2 text-sm md:text-base">{renderLinks(mediaLinks)}</ul>
            </div>

            {/* Management */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4 ">
                {t("nav_management")}
              </h3>
              <ul className="space-y-2 text-sm md:text-base">{renderLinks(managementLinks)}</ul>
            </div>

            {/* Others */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4 ">
                {t("nav_media")}
              </h3>
              <ul className="space-y-2 text-sm md:text-base">{renderLinks(otherLinks)}</ul>
            </div>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="lg:w-1/3">
          <h3 className="text-xl font-bold text-gradient mb-4 ">
            {t("footer_location_title")}
          </h3>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.1118780753955!2d89.94966128738012!3d24.92327856258347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd7f6c3dfab4c3%3A0xb69912834310fba9!2sDoyamoyee%20Temple!5e1!3m2!1sbn!2sbd!4v1772283605228!5m2!1sbn!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Doyamoyee Temple Location"
            />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 border-t border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} {t("site_name")}. {t("footer_rights")}
          </p>
          {/* <p className="flex items-center gap-1">
            {t("footer_developed")} {t("footer_by")}{" "}
            <a
              href="https://devsujoydas.vercel.app"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-yellow-600  font-semibold hover:underline"
            >
              Sujoy Das
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown, CloudLightning } from "lucide-react";
import DarkModeToggler from "./DarkModeToggler";
import { useAuth } from "../AuthProvider/authProvider";
import DeleteAccountModal from "./modals/DeleteAccountModal";
import LogoutModal from "./modals/LogoutModal";

const Header = ({ setLogoutOpen }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const { user, setUser } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setLangOpen(false);
  };

  const toggleMobileDropdown = (index) => {
    setMobileDropdown(mobileDropdown === index ? null : index);
  };

  const navItems = [
    { label: t("nav_home"), to: "/" },
    { label: t("nav_history"), to: "/history" },
    { label: t("nav_puja_schedule"), to: "/puja-schedule" },
    { label: t("nav_events"), to: "/events" },
    {
      label: t("nav_media"),
      dropdown: [
        { label: t("nav_gallery"), to: "/gallery" },
        { label: t("nav_video"), to: "/videos" },
      ],
    },
    {
      label: t("nav_management"),
      dropdown: [
        { label: t("nav_purohit"), to: "/purohit" },
        { label: t("nav_committee"), to: "/committee" },
        { label: t("nav_members"), to: "/members" },
        { label: t("nav_advisor"), to: "/advisors" },
      ],
    },
    { label: t("nav_posts"), to: "/blogs" },
    { label: t("nav_notice"), to: "/notices" },
    { label: t("nav_contact"), to: "/contact" },
    { label: t("nav_donation"), to: "/donation" },
  ];

  return (
    <header
      className={`sticky top-0 w-full z-50 backdrop-blur-md transition-transform duration-300 shadow-sm 
        bg-shared-primary text-shared-color-primary
      `}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-gradient  ">
          {t("site_name")}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 font-medium">
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <div key={idx} className="relative group">
                <button
                  onClick={() => toggleDropdown(idx)}
                  className="flex items-center gap-1 transition-colors hover:text-yellow-400"
                >
                  {item.label}

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openDropdown === idx
                        ? "rotate-180"
                        : "group-hover:rotate-180"
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full left-0 mt-2 w-38 bg-shared-primary text-shared-color-primary shadow-lg rounded-md overflow-hidden transition-all ${openDropdown === idx ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.dropdown.map((sub, i) => (
                    <NavLink
                      key={i}
                      to={sub.to}
                      onClick={() => setOpenDropdown(null)}
                      className={({ isActive }) =>
                        `transition block px-4 py-2 hover:text-black hover:bg-yellow-100 ${
                          isActive ? "text-yellow-400 font-semibold" : ""
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-yellow-500  ${
                    isActive ? "text-yellow-400  font-semibold" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-zinc-200 px-3 py-1 rounded-md  text-[14px] flex items-center gap-1 cursor-pointer"
            >
              {i18n.language === "bn-BD" ? "বাংলা" : "English"}
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onMouseLeave={() => setLangOpen(!langOpen)}
                  className="absolute right-0 mt-2 bg-shared-primary text-shared-color-primary shadow-md rounded-md overflow-hidden text-sm"
                >
                  <div
                    onClick={() => changeLang("bn-BD")}
                    className={`px-4 py-1.5  cursor-pointer hover:text-black hover:bg-yellow-100 ${
                      i18n.language === "bn-BD"
                        ? "bg-yellow-300 text-black"
                        : ""
                    }`}
                  >
                    {t("nav_bangla")}
                  </div>
                  <div
                    onClick={() => changeLang("en-US")}
                    className={`px-4 py-1.5 cursor-pointer hover:text-black hover:bg-yellow-100 ${
                      i18n.language === "en-US"
                        ? "bg-yellow-300 text-black"
                        : ""
                    }`}
                  >
                    {t("nav_english")}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <div onClick={() => setUserMenuOpen(!userMenuOpen)}>
              {user ? (
                <div className=" h-10 w-10 rounded-full overflow-hidden cursor-pointer shadow-lg">
                  <img
                    className="h-full object-cover w-full"
                    src={user?.profileImage?.url}
                    alt=""
                  />
                </div>
              ) : (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="ml-2 w-10 h-10 bg-yellow-600 cursor-pointer  text-white rounded-full flex items-center justify-center"
                >
                  <User size={18} />
                </button>
              )}
            </div>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 mt-2 w-40 bg-shared-primary text-shared-color-primary shadow-md rounded-md overflow-hidden"
                  onMouseLeave={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {user ? (
                    <>
                      {(user.role === "admin" || user.role === "ceo") && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 hover:bg-yellow-100 hover:text-black transition-colors border border-zinc-100"
                        >
                          {t("auth_dashboard")}
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="block px-4 py-2  hover:bg-yellow-100 hover:text-black  transition-colors border border-zinc-100"
                      >
                        {t("auth_profile")}
                      </Link>
                      <button
                        onClick={() => setLogoutOpen(true)}
                        className="w-full text-left px-4 py-2 cursor-pointer text-red-500 hover:bg-red-100 transition-colors"
                      >
                        {t("auth_logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="block px-4 py-2  hover:bg-yellow-100 hover:text-black  transition-colors"
                      >
                        {t("auth_signin")}
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2  hover:bg-yellow-100 hover:text-black  transition-colors"
                      >
                        {t("auth_signup")}
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <DarkModeToggler /> */}
        </nav>

        <div className="lg:hidden flex gap-2">
          {/* <DarkModeToggler /> */}
          {/* Mobile Toggle */}
          {user && (
            <div onClick={() => setMenuOpen(!menuOpen)}>
              <div className=" h-8 w-8 rounded-full overflow-hidden cursor-pointer shadow-lg">
                <img
                  className="h-full object-cover w-full"
                  src={user?.profileImage?.url}
                  alt=""
                />
              </div>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-shared-color-primary cursor-pointer"
          >
            <Menu size={28} className="" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm text-"
            onClick={() => setMenuOpen(false)}
          >
            <div className=" bg-black/40 backdrop-blur-sm p-5 h-dvh"></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="absolute right-0 top-0 h-dvh w-full bg-white text-black shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 space-y-6">
                {/* HEADER STYLE (like ecommerce category title) */}
                <div className="text-lg font-bold border-b border-zinc-200 pb-3 flex justify-between">
                  <Link
                    to="/"
                    className="text-xl md:text-2xl font-bold text-gradient  "
                  >
                    {t("site_name")}
                  </Link>

                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className=" cursor-pointer"
                  >
                    <X size={28} className="" />
                  </button>
                </div>

                {/* NAV ITEMS - ECOMMERCE STYLE ACCORDION */}
                <div className="space-y-1">
                  {navItems.map((item, idx) =>
                    item.dropdown ? (
                      <div key={idx} className=" rounded-lg overflow-hidden">
                        {/* CATEGORY BUTTON */}
                        <button
                          onClick={() => toggleMobileDropdown(idx)}
                          className="w-full flex justify-between items-center px-4 py-1.5 font-semibold bg-gray-50 hover:bg-gray-100 transition "
                        >
                          {item.label}

                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                              mobileDropdown === idx ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* SUB MENU */}
                        <AnimatePresence>
                          {mobileDropdown === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-white text-sm"
                            >
                              {item.dropdown.map((sub, i) => (
                                <NavLink
                                  key={i}
                                  to={sub.to}
                                  onClick={() => setMenuOpen(false)}
                                  className={({ isActive }) =>
                                    `block px-6 py-1.5  rounded-md  transition ${
                                      isActive
                                        ? "bg-yellow-100 text-black font-semibold"
                                        : "hover:bg-gray-50"
                                    }`
                                  }
                                >
                                  {sub.label}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        key={idx}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-1.5 rounded-sm  transition  ${
                            isActive
                              ? "bg-yellow-400 text-black font-semibold"
                              : "hover:bg-gray-100 "
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ),
                  )}
                </div>

                {/* LANGUAGE (ecommerce style box) */}
                <div className="border border-zinc-200 rounded-lg p-3 space-y-2 ">
                  <p className=" text-gray-500">Language</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => changeLang("bn-BD")}
                      className={`flex-1 py-1.5 rounded-md  border border-zinc-200 ${
                        i18n.language === "bn-BD"
                          ? "bg-yellow-400 text-black font-semibold"
                          : ""
                      }`}
                    >
                      বাংলা
                    </button>

                    <button
                      onClick={() => changeLang("en-US")}
                      className={`flex-1 py-1.5 rounded-md border border-zinc-200  ${
                        i18n.language === "en-US"
                          ? "bg-yellow-400 text-black font-semibold"
                          : ""
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* AUTH SECTION (ecommerce account box style) */}
                <div className="border border-zinc-200  rounded-lg p-3 space-y-2 ">
                  {user ? (
                    <>
                      <p className=" text-gray-500">Account</p>

                      <div className="flex gap-3 ">
                        {(user.role === "admin" || user.role === "ceo") && (
                          <NavLink
                            to="/admin"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-1.5 rounded-sm  transition flex-1  ${
                                isActive
                                  ? "bg-yellow-400 text-black font-semibold"
                                  : "hover:bg-gray-100 border border-zinc-200"
                              }`
                            }
                          >
                            {t("auth_dashboard")}
                          </NavLink>
                        )}

                        <NavLink
                          to="/profile"
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-1.5 rounded-sm  transition flex-1  ${
                              isActive
                                ? "bg-yellow-400 text-black font-semibold"
                                : "hover:bg-gray-100 border border-zinc-200"
                            }`
                          }
                        >
                          {t("auth_profile")}
                        </NavLink>
                      </div>
                      <button
                        onClick={() => {
                          setLogoutOpen(true);
                          setMenuOpen(false);
                        }}
                        className="w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        {t("auth_logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <p className=" text-gray-500">Account</p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <NavLink
                          to="/signin"
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-1.5 rounded-sm  transition  ${
                              isActive
                                ? "bg-yellow-400 text-black font-semibold"
                                : "hover:bg-gray-100 border border-zinc-200"
                            }`
                          }
                        >
                          {t("auth_signin")}
                        </NavLink>

                        <NavLink
                          to="/signup"
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-1.5 rounded-sm  transition ${
                              isActive
                                ? "bg-yellow-400 text-black font-semibold"
                                : "hover:bg-gray-100 border border-zinc-200"
                            }`
                          }
                        >
                          {t("auth_signup")}
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

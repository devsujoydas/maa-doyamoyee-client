import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown } from "lucide-react";
import DarkModeToggler from "./DarkModeToggler";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [user, setUser] = useState(true);

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
    { label: t("nav_donation"), to: "/donate" },
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
                <button className="flex items-center gap-1 transition-colors hover:text-yellow-400 ">
                  {item.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>
                <div className="absolute top-full left-0 mt-2 w-38 bg-shared-primary text-shared-color-primary shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-active::visible group-active:opacity-100 group-hover:visible transition-all">
                  {item.dropdown.map((sub, i) => (
                    <NavLink
                      key={i}
                      to={sub.to}
                      className={({ isActive }) =>
                        `transition  block px-4 py-2 hover:text-black hover:bg-yellow-100   ${
                          isActive ? "text-yellow-400  font-semibold" : ""
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
              className="border px-3 py-1 rounded-md  text-sm flex items-center gap-1"
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
                  className="absolute right-0 mt-2 bg-shared-primary text-shared-color-primary shadow-md rounded-md overflow-hidden"
                >
                  <div
                    onClick={() => changeLang("bn-BD")}
                    className={`px-4 py-2  cursor-pointer hover:text-black hover:bg-yellow-100 ${
                      i18n.language === "bn-BD"
                        ? "bg-yellow-300 text-black"
                        : ""
                    }`}
                  >
                    {t("nav_bangla")}
                  </div>
                  <div
                    onClick={() => changeLang("en-US")}
                    className={`px-4 py-2  cursor-pointer hover:text-black hover:bg-yellow-100 ${
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
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="ml-2 w-10 h-10 bg-yellow-600 cursor-pointer  text-white rounded-full flex items-center justify-center"
            >
              <User size={18} />
            </button>
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
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-yellow-100 hover:text-black transition-colors"
                      >
                        {t("auth_dashboard")}
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="block px-4 py-2  hover:bg-yellow-100 hover:text-black  transition-colors"
                      >
                        {t("auth_profile")}
                      </Link>
                      <button
                        onClick={() => setUser(null)}
                        className="w-full text-left px-4 py-2 hover:bg-yellow-100 hover:text-black transition-colors"
                      >
                        {t("auth_logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/signin"
                        className="block px-4 py-2 text-gray-800  hover:bg-yellow-100  transition-colors"
                      >
                        {t("auth_signin")}
                      </Link>
                      <Link
                        to="/auth/signup"
                        className="block px-4 py-2 text-gray-800  hover:bg-yellow-100  transition-colors"
                      >
                        {t("auth_signup")}
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DarkModeToggler />
        </nav>

        <div className="lg:hidden flex gap-2">
          <DarkModeToggler />
          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-shared-color-primary cursor-pointer"
          >
            {menuOpen ? (
              <X size={28} className="" />
            ) : (
              <Menu size={28} className="" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden  border-t border-zinc-400 bg-shared-primary text-shared-color-primary"
          >
            <div className="flex flex-col px-4 py-4 space-y-3">
              {navItems.map((item, idx) =>
                item.dropdown ? (
                  <div key={idx}>
                    <button
                      onClick={() => toggleMobileDropdown(idx)}
                      className="flex justify-between items-center w-full font-semibold transition-colors cursor-pointer"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition ${mobileDropdown === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileDropdown === idx && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="ml-3 mt-2 flex flex-col space-y-1"
                        >
                          {item.dropdown.map((sub, i) => (
                            <NavLink
                              key={i}
                              to={sub.to}
                              onClick={() => setMenuOpen(false)}
                              className={({ isActive }) =>
                                `transition  block   ${
                                  isActive
                                    ? "text-yellow-400  font-semibold"
                                    : "hover:text-yellow-400"
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
                      `transition hover:text-yellow-500  ${
                        isActive ? "text-yellow-400  font-semibold" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}

              {/* Mobile Language Switch */}
              <div className="">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="w-full px-3 py-2 border border-zinc-400 cursor-pointer  rounded-md flex justify-between items-center"
                >
                  {i18n.language === "bn-BD" ? "বাংলা" : "English"}
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col mt-2 border border-zinc-600 rounded-md overflow-hidden"
                    >
                      <div
                        onClick={() => {
                          changeLang("bn-BD");
                          setMenuOpen(!menuOpen);
                        }}
                        className={`px-4 py-2  cursor-pointer hover:text-black hover:bg-yellow-100 ${
                          i18n.language === "bn-BD"
                            ? "bg-yellow-300 text-black"
                            : ""
                        }`}
                      >
                        {t("nav_bangla")}
                      </div>
                      <div
                        onClick={() => {
                          changeLang("en-US");
                          setMenuOpen(!menuOpen);
                        }}
                        className={`px-4 py-2  cursor-pointer hover:text-black hover:bg-yellow-100 ${
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

              {/* Auth */}
              <div className="  flex flex-col space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/admin"
                      className="px-3 py-2 border border-zinc-500 rounded-md text-center"
                    >
                      {t("auth_dashboard")}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="px-3 py-2 border border-zinc-500 rounded-md text-center"
                    >
                      {t("auth_profile")}
                    </Link>
                    <button
                      onClick={() => setUser(null)}
                      className="px-3 py-2 border border-zinc-500 bg-red-500 text-white hover:bg-white hover:text-red-500 active:scale-95 transition-all cursor-pointer rounded-md text-center "
                    >
                      {t("auth_logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/signin"
                      className="px-3 py-2 border border-zinc-500 rounded-md text-center"
                    >
                      {t("auth_signin")}
                    </Link>
                    <Link
                      to="/auth/signup"
                      className="px-3 py-2 border border-zinc-500 rounded-md text-center"
                    >
                      {t("auth_signup")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

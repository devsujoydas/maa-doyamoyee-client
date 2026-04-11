import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import MusicPlayer from "../components/MusicPlayer";
import { useTranslation } from "react-i18next";
import LogoutModal from "../components/modals/LogoutModal";

const MainLayout = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.body.classList.remove("lang-bn-BD", "lang-en-US");
    document.body.classList.add(`lang-${currentLang}`);
  }, [i18n.language]);

  return (
    <div className="relative">
      <MusicPlayer open={open} setOpen={setOpen} />
      <LogoutModal isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
      <Header setLogoutOpen={setLogoutOpen}/>
      <Toaster position="bottom-center" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

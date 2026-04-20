/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarContent from "../components/SidebarContent";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import LogoutModal from "../components/modals/LogoutModal";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", String(!prev));
      return !prev;
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden lang-bn-BD">
      <Toaster position="top-right" />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent
          setLogoutOpen={setLogoutOpen}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.25 }}
            className="relative w-64 h-full bg-white shadow-xl"
          >
            <SidebarContent
              setLogoutOpen={setLogoutOpen}
              collapsed={false}
              toggleCollapsed={() => setSidebarOpen(false)}
              setSidebarOpen={setSidebarOpen}
            />
          </motion.aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className=" bg-white border-b border-zinc-200 flex items-center p-4.5 sticky top-0 z-40">
          <button
            className="lg:hidden mr-3"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Maa Doyamoyee Admin
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
        <LogoutModal isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
      </div>
    </div>
  );
};

export default AdminLayout;

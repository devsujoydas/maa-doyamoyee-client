import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  HandCoins,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { useAuth } from "../AuthProvider/authProvider";

const SidebarContent = ({ collapsed, toggleCollapsed }) => {
  const location = useLocation();

  const { user, logout } = useAuth();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      className="flex flex-col h-full border border-zinc-100 shadow-lg bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-zinc-200">
        {!collapsed && (
          <h2 className="text-lg font-bold text-nowrap">Admin Dashboard</h2>
        )}

        <button
          onClick={toggleCollapsed}
          className="hover:bg-black/10 cursor-pointer rounded-sm p-1"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        <Link
          to={"/admin"}
          title={"Dashboard"}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
            location.pathname === "/admin"
              ? "bg-black text-white"
              : " hover:bg-black/10"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <LayoutDashboard size={18} />
          {!collapsed && "Dashboard"}
        </Link>

        <Link
          to={"/admin/users"}
          title={"Users"}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
            location.pathname === "/admin/users"
              ? "bg-black text-white"
              : " hover:bg-black/10"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <Users size={18} />
          {!collapsed && "Users"}
        </Link>

        {user.role == "admin" && (
          <>
            <Link
              to={"/admin/blogs"}
              title={"Blog"}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                location.pathname === "/admin/blogs"
                  ? "bg-black text-white"
                  : " hover:bg-black/10"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <FileText size={18} />
              {!collapsed && "Blog"}
            </Link>

            <Link
              to={"/admin/notices"}
              title={"Notice"}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                location.pathname === "/admin/notices"
                  ? "bg-black text-white"
                  : " hover:bg-black/10"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Bell size={18} />
              {!collapsed && "Notice"}
            </Link>

            <Link
              to={"/admin/gallery"}
              title={"Gallery"}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                location.pathname === "/admin/gallery"
                  ? "bg-black text-white"
                  : " hover:bg-black/10"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Image size={18} />
              {!collapsed && "Gallery"}
            </Link>
          </>
        )}

        <Link
          to={"/admin/events"}
          title={"Event"}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
            location.pathname === "/admin/events"
              ? "bg-black text-white"
              : " hover:bg-black/10"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <Calendar size={18} />
          {!collapsed && "Event"}
        </Link>

        <Link
          to={"/admin/messages"}
          title={"Messages"}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
            location.pathname === "/admin/messages"
              ? "bg-black text-white"
              : " hover:bg-black/10"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <Bell size={18} />
          {!collapsed && "Messages"}
        </Link>

        <Link
          to={"/admin/donations"}
          title={"Donations"}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
            location.pathname === "/admin/donations"
              ? "bg-black text-white"
              : " hover:bg-black/10"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <HandCoins size={18} />
          {!collapsed && "Donations"}
        </Link>

        <Link
          to={"/"}
          title={"Back to Site"}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
            location.pathname === "/"
              ? "bg-black text-white"
              : " hover:bg-black/10"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && "Back to Site"}
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto p-3 border-t border-black/10 space-y-2">
        {!collapsed && (
          <p className="text-xs text-black truncate px-2">{user.email}</p>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm cursor-pointer font-medium text-red-400 hover:bg-red-500/10 transition ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default SidebarContent;

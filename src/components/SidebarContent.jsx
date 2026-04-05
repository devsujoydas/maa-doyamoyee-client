import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { useAuth } from "../AuthProvider/authProvider";

const SidebarContent = ({ collapsed, toggleCollapsed, logout }) => {
  const location = useLocation();
  const { user } = useAuth();

  const adminLinks = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Messages", path: "/admin/messages", icon: Mail },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Blog", path: "/admin/blogs", icon: FileText },
    { label: "Notice", path: "/admin/notices", icon: Bell },
    { label: "Event", path: "/admin/events", icon: Calendar },
    { label: "Donations", path: "/admin/donations", icon: HandCoins },
    { label: "Back to Site", path: "/", icon: LogOut },
  ];

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
        {adminLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            title={link.label}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
              location.pathname === link.path
                ? "bg-black text-white"
                : " hover:bg-black/10"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <link.icon size={18} />
            {!collapsed && link.label}
          </Link>
        ))}
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

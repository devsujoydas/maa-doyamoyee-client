import { useState, lazy, Suspense, useMemo } from "react";
import SEOHead from "../../components/SEOHead";
import { Bell, Calendar, FileText, HandCoins, Mail, Users } from "lucide-react";
import {
  generateMonthlyData,
  calculateGrowth,
} from "../../utils/dashboardUtils";
import SectionReveal from "../../components/SectionReveal";
import { Link } from "react-router-dom";

import useBlogs from "../../hooks/useBlogs";
import useUsers from "../../hooks/useUsers";
import useEvents from "../../hooks/useEvents";
import useNotices from "../../hooks/useNotices";
import useMessages from "../../hooks/useMessages";
import useDonations from "../../hooks/useDonations";

const ChartCard = lazy(() => import("../../components/admin/ChartCard"));
const PieChartCard = lazy(() => import("../../components/admin/PieChartCard"));
const TopDonors = lazy(() => import("../../components/admin/TopDonors"));
const RecentActivity = lazy(
  () => import("../../components/admin/RecentActivity"),
);

const AdminOverview = () => {
  const { data: users = [] } = useUsers();
  const { blogs = [] } = useBlogs();
  const { events = [] } = useEvents();
  const { data: notices = [] } = useNotices();
  const { messages = [] } = useMessages();
  const { donations = [] } = useDonations();

  const [year, setYear] = useState(2026);

  // 🔥 charts (memo optimized)
  const userChart = useMemo(
    () => generateMonthlyData(users, "createdAt"),
    [users],
  );

  const blogChart = useMemo(
    () => generateMonthlyData(blogs, "createdAt"),
    [blogs],
  );

  const eventChart = useMemo(
    () => generateMonthlyData(events, "createdAt"),
    [events],
  );

  const noticeChart = useMemo(
    () => generateMonthlyData(notices, "createdAt"),
    [notices],
  );

  const userGrowth = useMemo(
    () => calculateGrowth(users, "createdAt"),
    [users],
  );

  // 🔥 safe donation sum (IMPORTANT FIX)
  const totalDonationAmount = useMemo(() => {
    return donations.reduce(
      (sum, d) => sum + (Number(d.paymentAmount) || 0),
      0,
    );
  }, [donations]);

  // pie data
  const pieData = [
    { name: "Users", value: users.length },
    { name: "Blogs", value: blogs.length },
    { name: "Events", value: events.length },
    { name: "Notices", value: notices.length },
  ];

  // stats
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700",
      path: "/admin/users",
    },
    {
      label: "Total Messages",
      value: messages.length,
      icon: Mail,
      color: "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800",
      path: "/admin/messages",
    },
    {
      label: "Total Blogs",
      value: blogs.length,
      icon: FileText,
      color: "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800",
      path: "/admin/blogs",
    },
    {
      label: "Total Notices",
      value: notices.length,
      icon: Bell,
      color: "bg-gradient-to-br from-rose-100 to-rose-200 text-rose-700",
      path: "/admin/notices",
    },
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      color: "bg-gradient-to-br from-red-100 to-red-200 text-red-700",
      path: "/admin/events",
    },
    {
      label: "Total Donations",
      value: `৳ ${totalDonationAmount}`,
      icon: HandCoins,
      color: "bg-gradient-to-br from-amber-200 to-orange-300 text-orange-900",
      path: "/admin/donations",
    },
  ];

  return (
    <div className="space-y-6">
      <SEOHead title="Admin Dashboard" />

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border border-zinc-200 outline-none cursor-pointer px-3 py-1 rounded"
        >
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <SectionReveal key={stat.label} delay={i * 0.05}>
            <Link to={stat.path}>
              <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-all">
                <div
                  className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}
                >
                  <stat.icon size={20} />
                </div>

                <p className="text-2xl font-bold text-[#251D18]">
                  {stat.value}
                </p>
                <p className="text-xs text-[#251D18]">{stat.label}</p>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>

      {/* USER GROWTH */}
      <div className="bg-white p-4 rounded shadow">
        <p className="font-medium">User Growth: {userGrowth}%</p>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Suspense fallback={<p>Loading Charts...</p>}>
          <ChartCard title="Users" data={userChart} />
        </Suspense>

        <Suspense fallback={<p>Loading Charts...</p>}>
          <ChartCard title="Blogs" data={blogChart} />
        </Suspense>

        <Suspense fallback={<p>Loading Charts...</p>}>
          <ChartCard title="Events" data={eventChart} />
        </Suspense>

        <Suspense fallback={<p>Loading Charts...</p>}>
          <ChartCard title="Notices" data={noticeChart} />
        </Suspense>
      </div>

      {/* BOTTOM */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Suspense fallback={<p>Loading Pie...</p>}>
          <PieChartCard pieData={pieData} />
        </Suspense>

        <Suspense fallback={<p>Loading Top Donors...</p>}>
          <TopDonors donations={donations} />
        </Suspense>

        <Suspense fallback={<p>Loading Activity...</p>}>
          <RecentActivity
            users={users}
            blogs={blogs}
            events={events}
            notices={notices}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminOverview;

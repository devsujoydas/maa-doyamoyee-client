import { useState, lazy, Suspense, useMemo } from "react";
import SEOHead from "../../components/SEOHead";
import { Bell, Calendar, FileText, HandCoins, Mail, Users } from "lucide-react";
import {
  generateMonthlyData,
  calculateMonthlyGrowth, 
} from "../../utils/dashboardUtils";
import SectionReveal from "../../components/SectionReveal";
import { Link } from "react-router-dom";

import useBlogs from "../../hooks/useBlogs";
import useUsers from "../../hooks/useUsers";
import useEvents from "../../hooks/useEvents";
import useNotices from "../../hooks/useNotices";
import useMessages from "../../hooks/useMessages";
import useDonationQuery from "../../hooks/useDonationQuery";

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
  const { notices = [] } = useNotices();
  const { messages = [] } = useMessages();
  const { donations } = useDonationQuery();

  const [year, setYear] = useState(2026);

  const filterByYear = (data) =>
    data.filter((item) => new Date(item.createdAt).getFullYear() === year);

  const userChart = useMemo(
    () => generateMonthlyData(filterByYear(users), "createdAt"),
    [users, year],
  );

  const blogChart = useMemo(
    () => generateMonthlyData(filterByYear(blogs), "createdAt"),
    [blogs, year],
  );

  const eventChart = useMemo(
    () => generateMonthlyData(filterByYear(events), "createdAt"),
    [events, year],
  );

  const noticeChart = useMemo(
    () => generateMonthlyData(filterByYear(notices), "createdAt"),
    [notices, year],
  );

  const userGrowth = useMemo(
    () => calculateMonthlyGrowth(users, "createdAt"),
    [users],
  );
 

  const totalDonationAmount = useMemo(() => {
    return donations.reduce(
      (sum, d) => sum + (Number(d.paymentAmount) || 0),
      0,
    );
  }, [donations]);

 
  const pieData = [
    { name: "Users", value: users.length },
    { name: "Blogs", value: blogs.length },
    { name: "Events", value: events.length },
    { name: "Notices", value: notices.length },
  ];

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      path: "/admin/users",
      color: "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700",
    },
    {
      label: "Total Messages",
      value: messages.length,
      icon: Mail,
      path: "/admin/messages",
      color: "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800",
    },
    {
      label: "Total Blogs",
      value: blogs.length,
      icon: FileText,
      path: "/admin/blogs",
      color: "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800",
    },
    {
      label: "Total Notices",
      value: notices.length,
      icon: Bell,
      path: "/admin/notices",
      color: "bg-gradient-to-br from-rose-100 to-rose-200 text-rose-700",
    },
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      path: "/admin/events",
      color: "bg-gradient-to-br from-red-100 to-red-200 text-red-700",
    },
    {
      label: "Total Donations",
      value: `৳ ${totalDonationAmount}`,
      icon: HandCoins,
      path: "/admin/donations",
      color: "bg-gradient-to-br from-amber-200 to-orange-300 text-orange-900",
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
          className="border border-zinc-200 px-3 rounded outline-none"
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
              <div
                className={`bg-white shadow-md rounded-xl p-4 hover:scale-105 transition`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3 `}
                >
                  <stat.icon size={20} />
                </div>

                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs">{stat.label}</p>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>

      {/* USER GROWTH
      <div className="bg-white p-4 rounded shadow">
        <h2>
          Growth:{" "}
          <span className={userGrowth > 0 ? "text-green-500" : "text-red-500"}>
            {userGrowth}%
          </span>
        </h2>
      </div> */}
 
      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Suspense fallback={<p>Loading...</p>}>
          <ChartCard title="Users" data={userChart} />
          <ChartCard title="Blogs" data={blogChart} />
          <ChartCard title="Events" data={eventChart} />
          <ChartCard title="Notices" data={noticeChart} />
        </Suspense>
      </div>

      {/* BOTTOM */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Suspense fallback={<p>Loading...</p>}>
          <PieChartCard pieData={pieData} />
          <TopDonors donations={donations} />
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

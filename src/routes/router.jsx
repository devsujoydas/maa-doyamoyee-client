// src/router/router.jsx
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { HelmetProvider } from "react-helmet-async";

/**
 * 🔥 Smart Suspense Wrapper
 */
const withSuspense = (Component, Loader = LoadingPage) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

/* ---------------- Lazy Pages ---------------- */
const Home = lazy(() => import("../pages/Home/Home"));
const HistoryPage = lazy(() => import("../pages/HistoryPage/HistoryPage"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));
const EventDetailsPage = lazy(() => import("../pages/EventsPage/EventDetailsPage"));
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const Donation = lazy(() => import("../pages/Donate/Donation"));

const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const Signin = lazy(() => import("../pages/Auth/Signin"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));

const DashboardLayout = lazy(() => import("../layouts/AdminLayout"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));

const AdminOverview = lazy(() => import("../pages/Admin/AdminOverview"));
const AdminNotices = lazy(() => import("../pages/Admin/AdminNotices"));
const AdminEvents = lazy(() => import("../pages/Admin/AdminEvents"));
const AdminDonations = lazy(() => import("../pages/Admin/AdminDonations"));
const AdminUsers = lazy(() => import("../pages/Admin/AdminUsers"));
const AdminMessages = lazy(() => import("../pages/Admin/AdminMessages"));
const AdminBlogs = lazy(() => import("../pages/Admin/AdminBlogs"));

const NoticePage = lazy(() => import("../pages/NoticePage/NoticePage"));
const NoticeDetails = lazy(() => import("../pages/NoticePage/NoticeDetails"));

const BlogsPage = lazy(() => import("../pages/BlogsPage/BlogsPage"));
const BlogsDetails = lazy(() => import("../pages/BlogsPage/BlogsDetails"));

const PurohitPage = lazy(() => import("../pages/Management/PurohitPage"));
const CommitteePage = lazy(() => import("../pages/Management/CommitteePage"));
const AdvisorsPage = lazy(() => import("../pages/Management/AdvisorsPage"));
const MembersPage = lazy(() => import("../pages/Management/MembersPage"));

const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const VideoPage = lazy(() => import("../pages/MediaPage/VideoPage"));
const GalleryPage = lazy(() => import("../pages/MediaPage/GalleryPage"));

/* ---------------- 🔥 Preload Important Pages ---------------- */
const PreloadCritical = () => {
  useEffect(() => {
    // 👇 preload high traffic pages
    import("../pages/EventsPage/EventsPage");
    import("../pages/BlogsPage/BlogsPage");
    import("../pages/NoticePage/NoticePage");
  }, []);

  return null;
};

/* ---------------- Router ---------------- */
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HelmetProvider>
        <PreloadCritical /> {/* 🔥 preload added */}
        {withSuspense(MainLayout)}
      </HelmetProvider>
    ),
    errorElement: withSuspense(ErrorPage),
    children: [
      { path: "/", element: withSuspense(Home) },
      { path: "/history", element: withSuspense(HistoryPage) },
      { path: "/gallery", element: withSuspense(GalleryPage) },
      { path: "/videos", element: withSuspense(VideoPage) },
      { path: "/purohit", element: withSuspense(PurohitPage) },
      { path: "/committee", element: withSuspense(CommitteePage) },
      { path: "/advisors", element: withSuspense(AdvisorsPage) },
      { path: "/members", element: withSuspense(MembersPage) },
      { path: "/contact", element: withSuspense(ContactPage) },
      { path: "/donate", element: withSuspense(Donation) },
      { path: "/profile", element: withSuspense(ProfilePage) },

      { path: "/events", element: withSuspense(EventsPage) },
      { path: "/events/:slug", element: withSuspense(EventDetailsPage) },

      { path: "/notices", element: withSuspense(NoticePage) },
      { path: "/notices/:id", element: withSuspense(NoticeDetails) },

      { path: "/blogs", element: withSuspense(BlogsPage) },
      { path: "/blogs/:slug", element: withSuspense(BlogsDetails) },
    ],
  },
  {
    path: "/auth",
    element: withSuspense(AuthLayout),
    children: [
      { path: "signup", element: withSuspense(Signup) },
      { path: "signin", element: withSuspense(Signin) },
      { path: "reset-password", element: withSuspense(ResetPassword) },
    ],
  },
  {
    path: "/admin",
    element: withSuspense(DashboardLayout),
    children: [
      { path: "", element: withSuspense(AdminOverview) },
      { path: "users", element: withSuspense(AdminUsers) },
      { path: "messages", element: withSuspense(AdminMessages) },
      { path: "blogs", element: withSuspense(AdminBlogs) },
      { path: "notices", element: withSuspense(AdminNotices) },
      { path: "events", element: withSuspense(AdminEvents) },
      { path: "donations", element: withSuspense(AdminDonations) },
    ],
  },
]);
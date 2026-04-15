// src/router/router.jsx
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { HelmetProvider } from "react-helmet-async";

// Auth Guards
import PrivateRoutes from "./PrivateRoutes";
import AuthPrivateRoutes from "./AuthPrivateRoutes";
import AdminPrivateRoutes from "./AdminPrivateRoutes"; 
import ModeratorPrivateRoutes from "./AdminOnlyRoutes";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PujaSchedule from "../pages/PujaSchedule/PujaSchedule";
import AdminComments from "../pages/Admin/AdminComments";

/* ---------------- Lazy Pages ---------------- */
const Home = lazy(() => import("../pages/Home/Home"));
const HistoryPage = lazy(() => import("../pages/HistoryPage/HistoryPage"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));
const EventDetailsPage = lazy(
  () => import("../pages/EventsPage/EventDetailsPage"),
);
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const Donation = lazy(() => import("../pages/Donation/Donation"));

const Signup = lazy(() => import("../pages/Authentication/Signup"));
const Signin = lazy(() => import("../pages/Authentication/Signin"));
const ResetPassword = lazy(
  () => import("../pages/Authentication/ResetPassword"),
);
const ForgotPassword = lazy(
  () => import("../pages/Authentication/ForgotPassword"),
);

const DashboardLayout = lazy(() => import("../layouts/AdminLayout"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));

const AdminOverview = lazy(() => import("../pages/Admin/AdminOverview"));
const AdminNotices = lazy(() => import("../pages/Admin/AdminNotices"));
const AdminEvents = lazy(() => import("../pages/Admin/AdminEvents"));
const AdminDonations = lazy(() => import("../pages/Admin/AdminDonations"));
const AdminUsers = lazy(() => import("../pages/Admin/AdminUsers"));
const AdminMessages = lazy(() => import("../pages/Admin/AdminMessages"));
const AdminBlogs = lazy(() => import("../pages/Admin/AdminBlogs"));
const AdminGallary = lazy(() => import("../pages/Admin/AdminGallary"));

const NoticePage = lazy(() => import("../pages/NoticePage/NoticePage"));
const BlogsPage = lazy(() => import("../pages/BlogsPage/BlogsPage"));
const BlogsDetails = lazy(() => import("../pages/BlogsPage/BlogsDetails"));

const PurohitPage = lazy(() => import("../pages/Management/PurohitPage"));
const CommitteePage = lazy(() => import("../pages/Management/CommitteePage"));
const AdvisorsPage = lazy(() => import("../pages/Management/AdvisorsPage"));
const MembersPage = lazy(() => import("../pages/Management/MembersPage"));

const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const VideoPage = lazy(() => import("../pages/MediaPage/VideoPage"));
const GalleryPage = lazy(() => import("../pages/MediaPage/GalleryPage"));

/* ---------------- Suspense Wrapper ---------------- */
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingPage />}>{Component}</Suspense>
);

/* ---------------- Preload Critical Pages ---------------- */
const PreloadCritical = () => {
  useEffect(() => {
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
    element: withSuspense(
      <HelmetProvider>
        <PreloadCritical />
        <MainLayout />
      </HelmetProvider>,
    ),
    errorElement: withSuspense(<ErrorPage />),
    children: [
      { path: "/", element: withSuspense(<Home />) },
      { path: "/history", element: withSuspense(<HistoryPage />) },
      { path: "/gallery", element: withSuspense(<GalleryPage />) },
      { path: "/videos", element: withSuspense(<VideoPage />) },
      { path: "/purohit", element: withSuspense(<PurohitPage />) },
      { path: "/committee", element: withSuspense(<CommitteePage />) },
      { path: "/advisors", element: withSuspense(<AdvisorsPage />) },
      { path: "/members", element: withSuspense(<MembersPage />) },
      { path: "/contact", element: withSuspense(<ContactPage />) },
      { path: "/donation", element: withSuspense(<Donation />) },

      { path: "/events", element: withSuspense(<EventsPage />) },
      { path: "/events/:id", element: withSuspense(<EventDetailsPage />) },

      { path: "/notices", element: withSuspense(<NoticePage />) },
      { path: "/puja-schedule", element: withSuspense(<PujaSchedule />) },
      { path: "/terms-and-conditions", element: withSuspense(<TermsAndConditions />) },

      { path: "/blogs", element: withSuspense(<BlogsPage />) },
      { path: "/blogs/:id", element: withSuspense(<BlogsDetails />) },

      // 🔒 Protected User Profile
      {
        path: "/profile",
        element: withSuspense(
          <PrivateRoutes>
            <ProfilePage />
          </PrivateRoutes>,
        ),
      },

      // 🔑 Auth pages (redirect if already logged in)
      {
        path: "signin",
        element: withSuspense(
          <AuthPrivateRoutes>
            <Signin />
          </AuthPrivateRoutes>,
        ),
      },
      {
        path: "signup",
        element: withSuspense(
          <AuthPrivateRoutes>
            <Signup />
          </AuthPrivateRoutes>,
        ),
      },
      { path: "forgot-password", element: withSuspense(<ForgotPassword />) },
      { path: "reset-password", element: withSuspense(<ResetPassword />) },
    ],
  },

  {
    path: "/admin",
    element: withSuspense(
      <AdminPrivateRoutes>
        <DashboardLayout />
      </AdminPrivateRoutes>,
    ),
    children: [
      { path: "", element: withSuspense(<AdminOverview />) },
      { path: "users", element: withSuspense(<AdminUsers />) },
      { path: "messages", element: withSuspense(<AdminMessages />) },
      { path: "donations", element: withSuspense(<AdminDonations />) },
      
      // 🔒 CEO Restricted Routes
      {
        element: <ModeratorPrivateRoutes />,
        children: [
          { path: "comments", element: withSuspense(<AdminComments />) },
          { path: "gallery", element: withSuspense(<AdminGallary />) },
          { path: "blogs", element: withSuspense(<AdminBlogs />) },
          { path: "notices", element: withSuspense(<AdminNotices />) },
          { path: "events", element: withSuspense(<AdminEvents />) },
        ],
      },
    ],
  },
]);

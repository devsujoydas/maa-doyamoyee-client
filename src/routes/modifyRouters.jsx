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

// Pages
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PujaSchedule from "../pages/PujaSchedule/PujaSchedule";

import Home from "../pages/Home/Home";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import EventsPage from "../pages/EventsPage/EventsPage";
import EventDetailsPage from "../pages/EventsPage/EventDetailsPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Donation from "../pages/Donation/Donation";

import Signup from "../pages/Authentication/Signup";
import Signin from "../pages/Authentication/Signin";
import ResetPassword from "../pages/Authentication/ResetPassword";
import ForgotPassword from "../pages/Authentication/ForgotPassword";

import DashboardLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import AdminOverview from "../pages/Admin/AdminOverview";
import AdminNotices from "../pages/Admin/AdminNotices";
import AdminEvents from "../pages/Admin/AdminEvents";
import AdminDonations from "../pages/Admin/AdminDonations";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminMessages from "../pages/Admin/AdminMessages";
import AdminBlogs from "../pages/Admin/AdminBlogs";
import AdminGallary from "../pages/Admin/AdminGallary";

import NoticePage from "../pages/NoticePage/NoticePage";
import BlogsPage from "../pages/BlogsPage/BlogsPage";
import BlogsDetails from "../pages/BlogsPage/BlogsDetails";

import PurohitPage from "../pages/Management/PurohitPage";
import CommitteePage from "../pages/Management/CommitteePage";
import AdvisorsPage from "../pages/Management/AdvisorsPage";
import MembersPage from "../pages/Management/MembersPage";

import ProfilePage from "../pages/ProfilePage/ProfilePage";
import VideoPage from "../pages/MediaPage/VideoPage";
import GalleryPage from "../pages/MediaPage/GalleryPage";
import AdminComments from "../pages/Admin/AdminComments";

/* ---------------- Suspense Wrapper ---------------- */
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingPage />}>{Component}</Suspense>
);

// /* ---------------- Preload Critical Pages ---------------- */
// const PreloadCritical = () => {
//   useEffect(() => {
//     import("../pages/EventsPage/EventsPage");
//     import("../pages/BlogsPage/BlogsPage");
//     import("../pages/NoticePage/NoticePage");
//   }, []);
//   return null;
// };

/* ---------------- Router ---------------- */
export const modifyRouter = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(
      <HelmetProvider>
        {/* <PreloadCritical /> */}
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
      {
        path: "/terms-and-conditions",
        element: withSuspense(<TermsAndConditions />),
      },

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
       { path: "comments", element: withSuspense(<AdminComments />) },

      // 🔒 CEO Restricted Routes
      {
        element: <ModeratorPrivateRoutes />,
        children: [
          { path: "gallery", element: withSuspense(<AdminGallary />) },
          { path: "blogs", element: withSuspense(<AdminBlogs />) },
          { path: "notices", element: withSuspense(<AdminNotices />) },
          { path: "events", element: withSuspense(<AdminEvents />) },
        ],
      },
    ],
  },
]);

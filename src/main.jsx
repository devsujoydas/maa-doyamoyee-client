import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { HelmetProvider } from "react-helmet-async";
import "../src/i18n/i18n";
import { AuthProvider } from "./AuthProvider/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔥 Query Client config (optional but recommended)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min cache
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);

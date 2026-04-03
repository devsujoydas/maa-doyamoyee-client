import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { HelmetProvider } from "react-helmet-async";
import { DataProvider } from "./context/DataContext";
import "../src/i18n/i18n";
import { AuthProvider } from "./AuthProvider/authProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);

import { Suspense } from "react";
import LoadingPage from "../LoadingPage";

const LazyWrapper = ({ children }) => (
  <Suspense fallback={<LoadingPage />}>{children}</Suspense>
);

export default LazyWrapper;
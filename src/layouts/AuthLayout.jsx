import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-dvh flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

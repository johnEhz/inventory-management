import { Outlet } from "react-router-dom";
import { AuthProvider } from "../helpers/AuthProvider";

import React from "react";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthLayout;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'

const HomeLayout = () => {
  const { user } = useAuth()

  if (user){
    return <Navigate to='/app' />
  }

  return <Outlet />;
};

export default HomeLayout;

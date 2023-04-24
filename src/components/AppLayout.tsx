import React, { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AppLayout = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const { user } = useAuth();

  const toggleShowNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header
        toggleShowNavigation={toggleShowNavigation}
        showNavigation={showNavigation}
      />
      <Navigation showNavigation={showNavigation} />
      <main className="bg-gray-50 w-full h-screen min-h-[700px] sm:px-5 sm:py-12 px-3 py-7">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;

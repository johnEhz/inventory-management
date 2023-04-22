import React, { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const toggleShowNavigation = () => {
    setShowNavigation(!showNavigation);
  };
  return (
    <>
      <Header
        toggleShowNavigation={toggleShowNavigation}
        showNavigation={showNavigation}
      />
      <Navigation showNavigation={showNavigation} />
      <main className="bg-gray-50 w-full h-screen min-h-[700px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

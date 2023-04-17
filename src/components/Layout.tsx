import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

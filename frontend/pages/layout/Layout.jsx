import React from "react";
import Navbar from "../components/Navbar";
import ASidebar from "../components/ASidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ASidebar />
      {children}
    </>
  );
};

export default Layout;

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="norcont"> 
      <Outlet/>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

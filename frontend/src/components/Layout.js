import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

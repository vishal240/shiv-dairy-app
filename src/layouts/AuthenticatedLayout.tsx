import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="wrrap mainheader">
      <div className="container pt-4">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;

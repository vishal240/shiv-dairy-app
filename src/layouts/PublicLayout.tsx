import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div className="mainheader">
      <Outlet />
    </div>
  );
};

export default PublicLayout;

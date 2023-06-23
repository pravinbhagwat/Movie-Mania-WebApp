import React, { useEffect } from "react";

const Layout = ({ title, children }) => {
  useEffect(() => {
    document.title = `MovieApp | ${title ? title : "Loading"}`;
  }, [title]);

  return (
    <div className="min-h-screen pl-[90px] max-lg:min-h-[calc(100vh-60px)] max-lg:pl-0 max-lg:mb-[60px]">
      {children}
    </div>
  );
};

export default Layout;

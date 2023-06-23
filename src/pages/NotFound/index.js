import React from "react";

import Layout from "../../components/Layout";

const NotFound = () => {
  return (
    <Layout title="Page not found">
      <h1 className="fade_in text-2xl text-center flex justify-center items-center h-screen max-lg:h-[calc(100vh-60px)]">
        404 | Page not found
      </h1>
    </Layout>
  );
};

export default NotFound;

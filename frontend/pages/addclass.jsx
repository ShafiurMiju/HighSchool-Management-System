import React from "react";
import Layout from "./layout/Layout";
import AddClass from "./features/addClass";

const NoticePage = () => {
  return (
    <Layout>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"><AddClass /></div>
      </div>
    </Layout>
  );
};

export default NoticePage;

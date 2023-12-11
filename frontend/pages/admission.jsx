// pages/notice.js
import React from "react";
import Layout from "./layout/Layout";
import Admission from "./features/addStudent";

const AdmissionPage = () => {
  return (
    <Layout>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"><Admission /></div>
      </div>
    </Layout>
  );
};

export default AdmissionPage;

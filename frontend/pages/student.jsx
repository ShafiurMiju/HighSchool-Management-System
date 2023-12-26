import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import { TiArrowLeftThick } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";

const Student = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchClassList();
  }, [selectedClass]);

  const fetchClassList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/administrator/viewClass"
      );
      setClassList(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.get(
        selectedClass
          ? `http://localhost:3000/administrator/viewStudentByClass/${selectedClass}`
          : "http://localhost:3000/administrator/viewstudent"
      );
      const jsonData = response.data;
      setJsonData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };



  return (
    <>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
            <div className="font-bold flex justify-between items-center px-6 py-4 mb-5 text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <a href="/">
                <TiArrowLeftThick className="text-4xl cursor-pointer" />
              </a>
              <div className="text-2xl">STUDENT</div>
              <a href="/admission">
                <FaPlusCircle className="text-3xl cursor-pointer" />
              </a>
            </div>

            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div>
                    <label
                      htmlFor="classFilter"
                      className="inline-flex items-center text-gray-500 bg-white border border-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Select Class:
                      <select
                        id="classFilter"
                        className="ml-2 bg-gray-800"
                        onChange={handleClassChange}
                        value={selectedClass}
                      >
                        <option  className="bg-gray-500" value="">All Classes</option>
                        {classList.map((classItem) => (
                          <option className="bg-gray-500" key={classItem.ID} value={classItem.ClassName}>
                            {classItem.ClassName}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Class
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Section
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Contact Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Gender
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {jsonData !== null && (
                    <>
                      {Array.isArray(jsonData) ? (
                        <tbody>
                          {jsonData.map((item, index) => (
                            <tr
                              key={index}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item.FirstName + " " + item.LastName}
                              </th>
                              <td className="px-6 py-4">
                                {item.Class.ClassName}
                              </td>
                              <td className="px-6 py-4">
                                {item.Section.SectionName}
                              </td>
                              <td className="px-6 py-4">{item.Email}</td>
                              <td className="px-6 py-4">
                                {item.ContactNumber}
                              </td>
                              <td className="px-6 py-4">{item.Gender}</td>
                              <td className="px-6 py-4 flex gap-5">
                                <a
                                  href={`/student/${item.ID}`}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  View
                                </a>
                                <a
                                  href={`/student-edit/${item.ID}`}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.AcademicNoticeDate}
                            </th>
                            <td className="px-6 py-4">
                              {item.AcademicNoticeTitle}
                            </td>
                            <td className="px-6 py-4 flex gap-5">
                              <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                View
                              </a>
                              <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Student;

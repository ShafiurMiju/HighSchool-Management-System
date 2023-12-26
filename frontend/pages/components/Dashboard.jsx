import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowAltCircleRight } from "react-icons/fa";


const Dashboard = (
  // { onStudentClick, onTeacherClick, onStaffClick }
  ) => {
  const [loading, setLoading] = useState(true);
  const [totalStudent, setTotalStudent] = useState(null);
  const [totalTeacher, setTotalTeacher] = useState(null);
  const [totalStaff, setTotalStaff] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const student = await axios.get(
        "http://localhost:3000/administrator/viewstudent"
      );
      const totalStudent = student.data;
      setTotalStudent(totalStudent.length);

      const teacher = await axios.get(
        "http://localhost:3000/administrator/viewteacher"
      );
      const totalTeacher = teacher.data;
      setTotalTeacher(totalTeacher.length);

      const staff = await axios.get(
        "http://localhost:3000/administrator/viewstaff"
      );
      const totalStaff = staff.data;
      setTotalStaff(totalStaff.length);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          <div className="grid grid-cols-3 gap-4 mb-4">

            {/* School */}
            <div className="flex flex-col gap-5 items-center justify-center h-44 rounded bg-gray-200 dark:bg-gray-800">
              <p className="text-2xl font-bold text-black dark:text-gray-500">
                SCHOOL INFO
              </p>
              <hr class="h-px bg-gray-900 border-0 dark:bg-gray-700" />
              <button
                type="button"
                className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span>View</span>
                <FaArrowAltCircleRight />
              </button>
            </div>

            {/* Student */}
            <div className="flex flex-col gap-5 items-center justify-center h-44 rounded bg-gray-200 dark:bg-gray-800">
              <div className="w-[90%] flex justify-between items-center text-black dark:text-gray-500">
                <h1 className="text-2xl font-bold">STUDENTS</h1>
                <div className="flex flex-col items-center text-xl font-semibold">
                  <div>
                    {loading ? (
                      <p>0</p>
                    ) : (
                      <div>
                        <p>{totalStudent}</p>
                      </div>
                    )}
                  </div>
                  <span>Students</span>
                </div>
              </div>
              <hr class="h-px bg-gray-900 border-0 dark:bg-gray-700" />
              <a
                href="/student"
                // onClick={onStudentClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            {/* Teacher */}
            <div className="flex flex-col gap-5 items-center justify-center h-44 rounded bg-gray-200 dark:bg-gray-800">
              <div className="w-[90%] flex justify-between items-center text-black dark:text-gray-500">
                <h1 className="text-2xl font-bold">TEACHERS</h1>
                <div className="flex flex-col items-center text-xl font-semibold">
                  <div>
                    {loading ? (
                      <p>0</p>
                    ) : (
                      <div>
                        <p>{totalTeacher}</p>
                      </div>
                    )}
                  </div>
                  <span>Tearchers</span>
                </div>
              </div>
              <hr class="h-px bg-gray-900 border-0 dark:bg-gray-700" />
              <a
                href="/teacher"
                // onClick={onTeacherClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            {/* Staff */}
            <div className="flex flex-col gap-5 items-center justify-center h-44 rounded bg-gray-200 dark:bg-gray-800">
              <div className="w-[90%] flex justify-between items-center text-black dark:text-gray-500">
                <h1 className="text-2xl font-bold">STAFFS</h1>
                <div className="flex flex-col items-center text-xl font-semibold">
                  <div>
                    {loading ? (
                      <p>0</p>
                    ) : (
                      <div>
                        <p>{totalStaff}</p>
                      </div>
                    )}
                  </div>
                  <span>Staffs</span>
                </div>
              </div>
              <hr class="h-px bg-gray-900 border-0 dark:bg-gray-700" />
              <a
                href="/staff"
                // onClick={onStaffClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

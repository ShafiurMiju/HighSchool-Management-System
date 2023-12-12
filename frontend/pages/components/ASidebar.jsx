import React from "react";
import { useRouter } from "next/router";
import "flowbite";
import {
  MdDashboard,
  MdMessage,
  MdAdminPanelSettings,
  MdCalendarMonth,
} from "react-icons/md";
import { IoCalendarNumber, IoSettings } from "react-icons/io5";
import { AiFillNotification } from "react-icons/ai";

const ASidebar = () => {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/") && "bg-gray-300 text-gray-900 dark:bg-gray-600"
                  }`}
                href="/"
              >
                <MdDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/inbox") && "bg-gray-300 text-gray-900 dark:bg-gray-600"
                  }`}
                href="/inbox"
              >
                <MdMessage className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/admmissionrequest") && "bg-gray-300 text-gray-900 dark:bg-gray-600"
                  }`}
                href="/admissionrequest"
              >
                <MdAdminPanelSettings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Admission Request
                </span>
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/classroutine") && "bg-gray-300 text-gray-900 dark:bg-gray-600"
                  }`}
                href="/classroutine"
              >
                <MdCalendarMonth className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Class Routine
                </span>
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/examroutine") && "bg-gray-300 text-gray-900 dark:bg-gray-600"}`}
                href="/examroutine"
              >
                <IoCalendarNumber className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Exam Routine
                </span>
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/notice") && "bg-gray-300 text-gray-900 dark:bg-gray-600"}`}
                href="/notice"
              >
                <AiFillNotification className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Notice</span>
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive("/setting") && "bg-gray-300 text-gray-900 dark:bg-gray-600"}`}
                href="/setting"
              >
                <IoSettings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default ASidebar;

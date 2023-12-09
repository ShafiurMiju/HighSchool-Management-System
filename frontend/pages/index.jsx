import React, { useState } from "react";
import Navbar from "./component/Navbar";
import ASidebar from "./component/ASidebar";
import Dashboard from "./component/Dashboard";
import Notice from "./component/Notice";
import Student from "./component/Student";
import Teacher from "./component/Teacher";
import Staff from "./component/Staff";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <Navbar />
      <ASidebar
        onDashboardClick={() => handleComponentChange("dashboard")}
        onNoticeClick={() => handleComponentChange("notice")}
        onInboxClick={() => handleComponentChange("inbox")}
        onAdmissionClick={() => handleComponentChange("admission")}
        onClassClick={() => handleComponentChange("class")}
        onExamClick={() => handleComponentChange("exam")}
      />
      {activeComponent === "dashboard" && (
        <Dashboard
          onStudentClick={() => handleComponentChange("student")}
          onTeacherClick={() => handleComponentChange("teacher")}
          onStaffClick={() => handleComponentChange("staff")}
        />
      )}
      {activeComponent === "notice" && <Notice />}
      {activeComponent === "student" && <Student />}
      {activeComponent === "teacher" && <Teacher />}
      {activeComponent === "staff" && <Staff />}
    </>
  );
};

export default Home;

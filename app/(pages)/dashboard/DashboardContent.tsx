"use client";
import StudentDashboard from "./_studentComponents/StudentDashboard";
import AdvisorDashboard from "./_advisorComponents/AdvisorDashboard";
const DashboardContent = () => {
  //get from redux store
  const user = {
    role: "ADVISOR",
  };

  return (
    <div>
      {user.role === "STUDENT" ? (
        <StudentDashboard />
      ) : user.role === "ADVISOR" ? (
        <AdvisorDashboard />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DashboardContent;

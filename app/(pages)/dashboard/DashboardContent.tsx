"use client";
import StudentDashboard from "./_studentComponents/StudentDashboard";
import AdvisorDashboard from "./_advisorComponents/AdvisorDashboard";
import AdminDashboard from "./_adminComponents/AdminDashboard";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
const DashboardContent = () => {
  //get from redux store
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <div>
    
      {user.role === "STUDENT" ? (
        <StudentDashboard />
      ) : user.role === "ADVISOR" ? (
        <AdvisorDashboard />
      ) : user.role==="ADMIN"? (<AdminDashboard/>) : (
        <></>
      )}
    </div>
  );
};

export default DashboardContent;

"use client";
import AdvisorAppointments from "./_advisorComponents/AdvisorAppointments";
import StudentAppointments from "./_studentComponents/StudentAppointments";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";

//this will be gotten from context


const AppointmentsPageContent = () => {
  const user = useAppSelector((state: RootState) => state.user);
  return (
    <div>
      {user.role === "STUDENT" ? (
        <StudentAppointments />
      ) : user.role === "ADVISOR" ? (
        <AdvisorAppointments />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AppointmentsPageContent;

"use client";

import AdvisorAppointmentDetails from "./_advisorComponents/AdvisorAppointmentDetails";
import StudentAppointmentDetails from "./_studentComponents/StudentAppointmentDetails";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
//this will be gotten from context

interface Props{
  appointmentId:number
}
const AppointmentContent = ({appointmentId}:Props) => {
  const user = useAppSelector((state: RootState) => state.user);
  return (
    <div>
      {user.role === "STUDENT" ? (
        <StudentAppointmentDetails appointmentId={appointmentId} />
      ) : user.role === "ADVISOR" ? (
        <AdvisorAppointmentDetails appointmentId={appointmentId} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AppointmentContent;

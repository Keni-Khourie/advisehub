"use client";

import AdvisorAppointmentDetails from "./_advisorComponents/AdvisorAppointmentDetails";
import StudentAppointmentDetails from "./_studentComponents/StudentAppointmentDetails";

//this will be gotten from context
const user = {
  role: "STUDENT",
};
interface Props{
  appointmentId:number
}
const AppointmentContent = ({appointmentId}:Props) => {
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

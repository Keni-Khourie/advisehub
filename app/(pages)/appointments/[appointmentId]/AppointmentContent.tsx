"use client";

import AdvisorAppointmentDetails from "./_advisorComponents/AdvisorAppointmentDetails";
import StudentAppointmentDetails from "./_studentComponents/StudentAppointmentDetails";

//this will be gotten from context
const user = {
  role: "STUDENT",
};
const AppointmentContent = () => {
  return (
    <div>
      {user.role === "STUDENT" ? (
        <StudentAppointmentDetails />
      ) : user.role === "ADVISOR" ? (
        <AdvisorAppointmentDetails />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AppointmentContent;

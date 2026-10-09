"use client"
import AdvisorAppointments from "./_advisorComponents/AdvisorAppointments";
import StudentAppointments from "./_studentComponents/StudentAppointments";

//this will be gotten from context
const user = {
  role:"STUDENT"
}

const AppointmentsPageContent = () => {
  return (
    <div>{user.role==="STUDENT"?(<StudentAppointments/>):user.role==="ADVISOR"?(<AdvisorAppointments/>):<></>}</div>
  )
}

export default AppointmentsPageContent
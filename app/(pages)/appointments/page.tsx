import AdvisorAppointments from "./_advisorComponents/AdvisorAppointments";
import StudentAppointments from "./_studentComponents/StudentAppointments";


const user = {
  role:"STUDENT"
}

const AppointmentsPage = () => {
  return (
    <div>
      {user.role==="STUDENT"?(<StudentAppointments/>):user.role==="ADVISOR"?(<AdvisorAppointments/>):<></>}
    </div>
  )
}

export default AppointmentsPage
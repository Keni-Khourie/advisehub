import AppointmentContent from "./AppointmentContent";

interface Props{
  params:{
    appointmentId:string
  }
}
const StudentAppointment = ({params:{appointmentId}}:Props) => {
  return (
    <AppointmentContent appointmentId={parseInt(appointmentId)}/>
  )
}

export default StudentAppointment
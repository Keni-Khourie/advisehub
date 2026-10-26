"use client"
import PageHeader from '@/customUI/PageHeader';
import StudentAppointmentContent from "./StudentAppointmentContent"
interface Props{
  appointmentId:number
}
const StudentAppointmentDetails = ({appointmentId}:Props) => {
  
  return (
    <div>
      <PageHeader headerText="Appointment Details" additionalClass=""/>
     <StudentAppointmentContent appointmentId={appointmentId}/>
    </div>
  )
}

export default StudentAppointmentDetails
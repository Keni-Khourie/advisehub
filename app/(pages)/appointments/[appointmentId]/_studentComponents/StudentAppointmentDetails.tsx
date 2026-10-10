"use client"
import PageHeader from '@/customUI/PageHeader';
interface Props{
  appointmentId:number
}
const StudentAppointmentDetails = ({appointmentId}:Props) => {
  console.log(appointmentId);
  return (
    <div>
      <PageHeader headerText="Appointment Details" additionalClass=""/>
     
    </div>
  )
}

export default StudentAppointmentDetails
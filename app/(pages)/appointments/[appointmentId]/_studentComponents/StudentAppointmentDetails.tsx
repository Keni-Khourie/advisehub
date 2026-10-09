"use client"
import PageHeader from '@/customUI/PageHeader';
interface Props{
  appointmentId:number
}
const StudentAppointmentDetails = ({appointmentId}:Props) => {
  return (
    <div>
      <PageHeader headerText="Appointment Details" additionalClass=""/>
      <div>{`${appointmentId}`}</div>
    </div>
  )
}

export default StudentAppointmentDetails
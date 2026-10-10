"use client"
import PageHeader from '@/customUI/PageHeader';
import AdvisorAppointmentContent from './AdvisorAppointmentContent';
interface Props{
  appointmentId:number
}
const AdvisorAppointmentDetails = ({appointmentId}:Props) => {
  //fetch appointment users here.
  console.log(appointmentId);
  return (
    <div>
      <PageHeader headerText="Appointment Details" additionalClass=""/>
      <AdvisorAppointmentContent/>
    </div>
  )
}

export default AdvisorAppointmentDetails
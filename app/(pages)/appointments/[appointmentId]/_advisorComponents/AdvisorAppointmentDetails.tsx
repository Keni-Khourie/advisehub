"use client"
import PageHeader from '@/customUI/PageHeader';
import AdvisorAppointmentContent from './AdvisorAppointmentContent';

 interface Props{
  appointmentId:number
}

const AdvisorAppointmentDetails = ({appointmentId}:Props) => {
  
  
  return (
    <div>
      <PageHeader headerText="Appointment Details" additionalClass=""/>
      <AdvisorAppointmentContent appointmentId={appointmentId}/>
    </div>
  )
}

export default AdvisorAppointmentDetails
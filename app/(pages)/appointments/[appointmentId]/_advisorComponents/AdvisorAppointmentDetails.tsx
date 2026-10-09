
import PageHeader from '@/customUI/PageHeader';
interface Props{
  appointmentId:number
}
const AdvisorAppointmentDetails = ({appointmentId}:Props) => {
  return (
    <div>
      <PageHeader headerText="Appointment Details" additionalClass=""/>
    </div>
  )
}

export default AdvisorAppointmentDetails
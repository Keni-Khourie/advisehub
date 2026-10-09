
import StudentAppointmentSchedule from './_studentComponents/StudentAppointmentSchedule';
//prevent access to page if user is advisor.
const ScheduleAppointmentsPage = () => {
  return (
    <div>
        <StudentAppointmentSchedule/>
    </div>
  )
}

export default ScheduleAppointmentsPage
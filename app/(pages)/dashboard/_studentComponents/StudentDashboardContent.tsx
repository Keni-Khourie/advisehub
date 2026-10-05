import NextAppointmentCard from './NextAppointmentCard';
import ScheduleAppointmentButton from './ScheduleAppointmentButton';
import DegreeProgressCard from './DegreeProgressCard';

const StudentDashboardContent = () => {
  return (
    <div>
         <div>
        <NextAppointmentCard/>
        <ScheduleAppointmentButton/>
      </div>
      <DegreeProgressCard/>
    </div>
  )
}

export default StudentDashboardContent
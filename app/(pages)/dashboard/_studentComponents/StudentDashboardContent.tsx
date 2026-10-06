import NextAppointmentCard from './NextAppointmentCard';
import ScheduleAppointmentButton from './ScheduleAppointmentButton';
import DegreeProgressCard from './DegreeProgressCard';
import SectionHeader from '@/customUI/SectionHeader';
import { getDayPeriod } from '@/lib/utilityFunctions';

const StudentDashboardContent = () => {
  return (
    <div className="w-full">
      <SectionHeader headerText={`Good ${getDayPeriod()}, ${"Alex"}`} additionalClass="mb-5"/>
        <div className="flex gap-x-5">
            <div className="w-[60%]">
              <div className="w-full flex flex-col justify-center gap-y-5">
                <NextAppointmentCard/>
            <ScheduleAppointmentButton/>
              </div>
            
                  </div>
                  <div className="w-[40%]">
                    <DegreeProgressCard/>
                  </div>
        </div>
    </div>
  )
}

export default StudentDashboardContent
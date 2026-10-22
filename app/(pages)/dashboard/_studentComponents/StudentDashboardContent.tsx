import NextAppointmentCard from './NextAppointmentCard';
import ScheduleAppointmentCard from './ScheduleAppointmentCard';
import DegreeProgressCard from './DegreeProgressCard';
import SectionHeader from '@/customUI/SectionHeader';
import { getDayPeriod } from '@/lib/utilityDateFunctions';
import AdvisorNotesCard from './AdvisorNotesCard';
import MeetingHistoryCard from './MeetingHistoryCard';
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
const StudentDashboardContent = () => {
  const user = useAppSelector((state: RootState) => state.user);
  return (
    <div className="w-full">
      <SectionHeader headerText={`Good ${getDayPeriod()}, ${user.firstName}`} additionalClass=""/>

        <div className="flex flex-col gap-y-4">
            <div className="w-full flex gap-x-5">
    <ScheduleAppointmentCard/>
                <NextAppointmentCard/>
            </div>
            <div className="w-full flex gap-x-5 gap-y-4 flex-wrap md:flex-nowrap">
               <DegreeProgressCard/>
               <AdvisorNotesCard/>
               <MeetingHistoryCard/>
            </div>
           
    </div>
    </div>
  )
}

export default StudentDashboardContent
import { getDayPeriod } from '@/lib/utilityDateFunctions';
import SectionHeader from '@/customUI/SectionHeader';
import TodaysAppointments from './TodaysAppointments';
import AvailableSlotsCard from './AvailableSlotsCard';
import UpcomingMeetingsCard from './UpcomingMeetingsCard';
import SearchStudentsCard from './SearchStudentsCard';

const AdvisorDashboardContent = () => {
  return (
    <div className="w-full">
      <SectionHeader headerText={`Good ${getDayPeriod()}, ${"Jordan"}`} additionalClass=""/>
      <div>
        <div className="flex gap-x-5">
          <AvailableSlotsCard/>
          <UpcomingMeetingsCard/>
          <SearchStudentsCard/>
        </div>
        <TodaysAppointments/>
      </div>
    </div>
  )
}

export default AdvisorDashboardContent
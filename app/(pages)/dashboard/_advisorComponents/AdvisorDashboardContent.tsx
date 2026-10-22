"use client"
import { getDayPeriod } from '@/lib/utilityDateFunctions';
import SectionHeader from '@/customUI/SectionHeader';
import AvailableSlotsCard from './AvailableSlotsCard';
import UpcomingMeetingsCard from './UpcomingMeetingsCard';
import SearchStudentsCard from './SearchStudentsCard';
import AppointmentCard from './AppointmentCard';
import { dummyAdvisorAppointments } from '@/dummyData/dummyData';
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";

const AdvisorDashboardContent = () => {
  //fetch dashboard data
  const user = useAppSelector((state: RootState) => state.user);
  return (
    <div className="w-full">
      <SectionHeader headerText={`Good ${getDayPeriod()}, ${user.firstName}`} additionalClass="mb-10"/>
      <div>
        <div className="flex gap-x-5 mb-6">
          <AvailableSlotsCard slots={6}/>
          <UpcomingMeetingsCard upcomingMeetings={3}/>
          <SearchStudentsCard/>
        </div>
        <div className="">
        <SectionHeader headerText="Today's Appointments"/>
        <div className="md:h-80 overflow-y-scroll">
            <div className="w-full flex flex-col gap-y-6">
              {dummyAdvisorAppointments.map((appointment, index)=> <AppointmentCard appointment={appointment} key={index}/>)}
                
            </div>
        </div>
    </div>
      </div>
    </div>
  )
}

export default AdvisorDashboardContent
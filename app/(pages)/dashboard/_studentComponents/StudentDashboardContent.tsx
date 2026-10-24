import NextAppointmentCard from './NextAppointmentCard';
import ScheduleAppointmentCard from './ScheduleAppointmentCard';
import DegreeProgressCard from './DegreeProgressCard';
import SectionHeader from '@/customUI/SectionHeader';
import { getDayPeriod } from '@/lib/utilityDateFunctions';
import AdvisorNotesCard from './AdvisorNotesCard';
import MeetingHistoryCard from './MeetingHistoryCard';
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
import {useGetStudentDashboardDataQuery} from "@/redux/features/main/dashboardApiSlice"

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const StudentDashboardContent = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const {data, isLoading, isError} = useGetStudentDashboardDataQuery(timeZone)
  return (
    <div className="w-full">
      <SectionHeader headerText={`Good ${getDayPeriod()}, ${user.firstName}`} additionalClass=""/>

        <div className="flex flex-col gap-y-4">
            <div className="w-full flex gap-x-5">
    <ScheduleAppointmentCard/>
                <NextAppointmentCard isLoading={isLoading} isError={isError} data={data?.closestAppointment}/>
            </div>
            <div className="w-full flex gap-x-5 gap-y-4 flex-wrap md:flex-nowrap">
               <DegreeProgressCard data={data?.degreeInfo} isLoading={isLoading} isError={isError}/>
               <AdvisorNotesCard data={data?.todaysNotesCount} isLoading={isLoading} isError={isError}/>
               <MeetingHistoryCard data={data?.pastAppointmentsCount} isLoading={isLoading} isError={isError}/>
            </div>
           
    </div>
    </div>
  )
}

export default StudentDashboardContent
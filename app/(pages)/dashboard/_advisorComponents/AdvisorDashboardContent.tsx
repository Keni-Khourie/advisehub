"use client";
import { getDayPeriod } from "@/lib/utilityDateFunctions";
import SectionHeader from "@/customUI/SectionHeader";
import AvailableSlotsCard from "./AvailableSlotsCard";
import UpcomingMeetingsCard from "./UpcomingMeetingsCard";
import SearchStudentsCard from "./SearchStudentsCard";
import AppointmentCard from "./AppointmentCard";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
import { useGetAdvisorAppointmentsQuery } from "@/redux/features/main/appointmentApiSlice";
import {useGetAdvisorDashboardDataQuery} from "@/redux/features/main/dashboardApiSlice"
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/utilityFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const AdvisorDashboardContent = () => {
  //fetch dashboard data
  const user = useAppSelector((state: RootState) => state.user);

  const {
    data: todaysAppointments,
    isLoading,
    isError,
  } = useGetAdvisorAppointmentsQuery({
    period: "today",
    timeZone: timeZone,
  });

  const {data:dashboardData, isLoading:dashboardLoading, isError:dashboardError} =useGetAdvisorDashboardDataQuery(timeZone)
  return (
    <div className="w-full">
      <SectionHeader
        headerText={`Good ${getDayPeriod()}, ${user.firstName}`}
        additionalClass="mb-10"
      />
      <div>
        <div className="flex gap-x-5 mb-6">
          <AvailableSlotsCard slots={dashboardData?.availableSlotsTodayCount} isLoading={dashboardLoading} isError={dashboardError} />
          <UpcomingMeetingsCard upcomingMeetings={dashboardData?.appointmentsTodayCount} isLoading={dashboardLoading} isError={dashboardError} />
          <SearchStudentsCard />
        </div>
        <div className="">
          <SectionHeader headerText="Today's Appointments" />
          <div className="md:h-80 overflow-y-scroll">
            <div className="w-full flex flex-col gap-y-6 overflow-y-scroll h-40">
              {isLoading &&
                generateArray(3).map((item) => (
                  <Skeleton key={item} className="w-full h-10" />
                ))}
              {isError && !todaysAppointments && <FetchErrorMessage />}
              {todaysAppointments && todaysAppointments.length == 0 && (
                <p className="font-thin text-sm text-ahTextGrey w-full text-center">
                  No appointments scheduled today
                </p>
              )}
              {todaysAppointments &&
                todaysAppointments.map((appointment, index) => (
                  <AppointmentCard appointment={appointment} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboardContent;

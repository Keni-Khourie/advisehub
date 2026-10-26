"use client";
import { useContext } from "react";
import { StudentAppointmentContext } from "./StudentAppointments";
import PageHeader from "@/customUI/PageHeader";
import { appointmentSections } from "@/constants";
import AppointmentSectionBadge from "./AppointmentSectionBadge";
import AppointmentListItem from "./AppointmentListItem";
import Link from "next/link";
import BlueButton from "@/customUI/BlueButton";
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/utilityFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";
import { useGetStudentAppointmentsQuery } from "@/redux/features/main/appointmentApiSlice";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const StudentAppointmentsContent = () => {
  const contextData = useContext(StudentAppointmentContext);
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetStudentAppointmentsQuery({
    timeZone: timeZone,
    period:
      contextData.componentDetails.view === "UpcomingAppointments"
        ? "upcoming"
        : contextData.componentDetails.view === "PastMeetings"
          ? "previous"
          : "today",
  });

  return (
    <div>
      <PageHeader
        headerText={contextData.componentDetails.header}
        subtitle={contextData.componentDetails.subtitle}
        additionalClass="mb-10"
      />

      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-x-3">
          {appointmentSections.map((section, index) => (
            <AppointmentSectionBadge key={index} text={section} />
          ))}
        </div>
        <Link href="/appointments/schedule-appointment">
          <BlueButton
            text="Schedule Appointment"
            additionalStyle="py-1 text-sm"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-y-6 overflow-y-scroll md:h-[65vh]">
        {isLoading &&
          generateArray(5).map((item) => (
            <Skeleton key={item} className="h-28 w-full" />
          ))}
        {isError && !appointments && <FetchErrorMessage />}
        {appointments &&
          appointments.map((meeting, index) => (
            <AppointmentListItem
              type={contextData.componentDetails.section}
              data={meeting}
              key={index}
              isLoading={isLoading}
            />
          ))}
        {appointments && appointments.length == 0 && (
          <p className="font-thin w-full text-center text-ahTextGrey">{`No ${contextData.componentDetails.view === "UpcomingAppointments" ? "upcoming" : contextData.componentDetails.view === "PastMeetings" ? "past" : ""} appointments`}</p>
        )}
      </div>
    </div>
  );
};

export default StudentAppointmentsContent;

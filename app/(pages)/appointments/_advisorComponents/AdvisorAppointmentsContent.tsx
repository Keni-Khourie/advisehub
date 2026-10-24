"use client";
import { useContext } from "react";
import { AdvisorAppointmentContext } from "./AdvisorAppointments";
import { appointmentSections } from "@/constants";
import PageHeader from "@/customUI/PageHeader";
import AdvisorAppointmentSectionBadge from "./AdvisorAppointmentSectionBadge";
import AdvisorAppointmentListItem from "./AdvisorAppointmentListItem";
import BlueButton from "@/customUI/BlueButton";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/utilityFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";
import { useGetAdvisorAppointmentsQuery } from "@/redux/features/main/appointmentApiSlice";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const AdvisorAppointmentsContent = () => {
  const contextData = useContext(AdvisorAppointmentContext);
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAdvisorAppointmentsQuery({
    timeZone: timeZone,
    period:
      contextData.componentDetails.view === "UpcomingAppointments"
        ? "upcoming"
        : contextData.componentDetails.view === "PastMeetings"
          ? "past"
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
            <AdvisorAppointmentSectionBadge key={index} text={section} />
          ))}
        </div>
        <Link href="/availability">
          <BlueButton
            text="Manage Availability"
            additionalStyle="py-1 text-sm"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-y-6 overflow-y-scroll md:h-[65vh]">
        {isLoading &&
          generateArray(5).map((item) => (
            <Skeleton key={item} className="h-28 w-full" />
          ))}
        {isError && <FetchErrorMessage />}
        {appointments &&
          appointments.map((meeting, index) => (
            <AdvisorAppointmentListItem
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

export default AdvisorAppointmentsContent;

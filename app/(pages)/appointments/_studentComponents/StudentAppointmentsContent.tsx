"use client";
import { useContext } from "react";
import { StudentAppointmentContext } from "./StudentAppointments";
import PageHeader from "@/customUI/PageHeader";
import { appointmentSections } from "@/constants";
import AppointmentSectionBadge from "./AppointmentSectionBadge";
import AppointmentListItem from "./AppointmentListItem";
import { ExistingMeetingData } from "@/dummyData/dummyTypes";
import { getPastMeetings, getUpcomingMeetings } from "@/dummyData/dummyUtils";
import Link from "next/link";
import BlueButton from "@/customUI/BlueButton";
//import { Skeleton } from '@/components/ui/skeleton';

const StudentAppointmentsContent = () => {
  const contextData = useContext(StudentAppointmentContext);
  const appointments: ExistingMeetingData[] =
    contextData.componentDetails.section === "Upcoming"
      ? getUpcomingMeetings()
      : contextData.componentDetails.section === "Past Meetings"
        ? getPastMeetings()
        : [];
  //this will come from the RTK query
  const isLoading: boolean = false;
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

      <div className="flex flex-col gap-y-6 overflow-y-scroll md:h-[40vw]">
        {appointments &&
          appointments.map((meeting, index) => (
            <AppointmentListItem
              type={contextData.componentDetails.section}
              data={meeting}
              key={index}
              isLoading={isLoading}
            />
          ))}
      </div>
    </div>
  );
};

export default StudentAppointmentsContent;

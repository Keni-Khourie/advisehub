"use client"
import { cn } from "@/lib/utils";
import StudentDetailsCard from "./StudentDetailsCard";
import AppointmentTimePlaceCard from "./AppointmentTimePlaceCard";
import PrepareForMeetingCard from "./PrepareForMeetingCard";

const AdvisorAppointmentContent = () => {
    //fetch user data
    //extract content later
  return (
    <div className="w-full">
        <div className="w-full flex gap-x-7 mb-7">
            <StudentDetailsCard/>
            <AppointmentTimePlaceCard/>
        </div>
        <div className="w-full">
            <PrepareForMeetingCard/>
        </div>
    </div>
  )
}

export default AdvisorAppointmentContent
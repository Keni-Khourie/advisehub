"use client"

import AdvisorDetailsCard from "./AdvisorDetailsCard"
import AppointmentTimeNotesCard from "./AppointmentTimeNotesCard"
import PrepareForMeetingCard from "./PrepareForMeetingCard";
import {useGetAppointmentByIdQuery} from "@/redux/features/main/appointmentApiSlice"
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
interface Props{
    appointmentId:number
}
const StudentAppointmentContent = ({appointmentId}:Props) => {
    const {data:appointment, isLoading, isError } = useGetAppointmentByIdQuery({
        appointmentId, timeZone
    })
  return (
    <div className="w-full">
        <div className="w-full flex gap-x-7 gap-y-7 mb-7 md:flex-nowrap flex-wrap">
            <AdvisorDetailsCard isLoading={isLoading} isError={isError} cardData={appointment?{advisorName:appointment.advisorFullName, advisorTitle:appointment.advisorTitle, advisorEmail:appointment.advisorEmail, advisorProfileImage:appointment.advisorProfileImage, advisorSpecialization:appointment.advisorSpecialization}:undefined}/>
            <AppointmentTimeNotesCard isLoading={isLoading} isError={isError} cardData={appointment?{date:appointment.date, office:appointment.advisorOffice, status:appointment.appointmentStatus, note:appointment.note}:undefined}/>
        </div>
        <div className="w-full">
            <PrepareForMeetingCard isLoading={isLoading} isError={isError} cardData={appointment?{appointmentId:appointment.id, advisorId:appointment.advisorId, appointmentStatus:appointment.appointmentStatus}:undefined}/>
        </div>
    </div>
  )
}

export default StudentAppointmentContent
"use client"
//import { cn } from "@/lib/utils";
import StudentDetailsCard from "./StudentDetailsCard";
import AppointmentTimePlaceCard from "./AppointmentTimePlaceCard";
import PrepareForMeetingCard from "./PrepareForMeetingCard";
import {useGetAppointmentByIdQuery} from "@/redux/features/main/appointmentApiSlice"
import {useState} from "react"
import CancellationDialog from "../_components/CancellationDialog"
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface Props{
    appointmentId:number
}
const AdvisorAppointmentContent = ({appointmentId}:Props) => {
    const {data:appointment, isLoading, isError } = useGetAppointmentByIdQuery({
        appointmentId, timeZone
    })
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  return (
    <div className="w-full">
        <div className="w-full flex gap-x-7 gap-y-7 mb-7 md:flex-nowrap flex-wrap">
            <StudentDetailsCard isLoading={isLoading} isError={isError} cardData={appointment?{studentName:appointment.studentFullName, studentDegree:appointment.studentDegree, studentId:appointment.studentId, studentEmail:appointment.studentEmail, studentProfileImage:appointment.studentProfileImage, advisorSpecialization:appointment.advisorSpecialization}:undefined}/>
            <AppointmentTimePlaceCard isLoading={isLoading} isError={isError} cardData={appointment?{date:appointment.date, office:appointment.advisorOffice, status:appointment.appointmentStatus, note:appointment.note}:undefined}/>
        </div>
        <div className="w-full">
            <PrepareForMeetingCard isLoading={isLoading} isError={isError} cardData={appointment?{appointmentId:appointment.id, studentId:appointment.studentId, appointmentStatus:appointment.appointmentStatus}:undefined} setDialogOpen={setDialogOpen}/>
        </div>
        {appointment && <CancellationDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} appointmentId={appointment.id} studentName={appointment.studentFullName} advisorName={appointment.advisorFullName} appointmentDate={appointment.date} type="advisorCancel"/>}
    </div>
  )
}

export default AdvisorAppointmentContent
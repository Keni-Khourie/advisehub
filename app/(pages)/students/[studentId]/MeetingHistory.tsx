import {format} from "date-fns"
import {useGetAdvisorPastAppointmentWithStudentQuery} from "@/redux/features/main/appointmentApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
import {generateArray} from "@/lib/utilityFunctions"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
import Link from "next/link"
import WhiteButton from "@/customUI/WhiteButton"
import {Badge} from "@/components/ui/badge"
// import {cn} from "@/lib/utils"
interface Props{
    studentId:number
}
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const MeetingHistory = ({studentId}:Props) => {
   
    const {data:appointments, isLoading, isError}=useGetAdvisorPastAppointmentWithStudentQuery({
        studentId:studentId,
        timeZone:timeZone
    })

   
  return (
    <div className="flex flex-col gap-y-4 w-full">
        {isError && <FetchErrorMessage/>}
        {isLoading && generateArray(6).map((item)=><Skeleton key={item} className="h-10 w-full"/>)}
        {appointments && appointments.length==0 && <p className="font-thin text-sm text-ahTextGrey">No previous appointment with student</p>}
        {appointments && appointments.map((appointment, index)=>(
            <div key={index} className="rounded-lg bg-white border pt-3 py-6 px-3  flex flex-col gap-y-2">
                <p className="font-semibold text-sm">{`${index===0?"Latest meeting":"Meeting"} • ${format(new Date(appointment.date), "MMM d, yyyy")}`}</p>
                <div className="flex justify-between items-center md:flex-nowrap flex-wrap gap-y-3">
                    
                    <div className="flex flex-col gap-y-3">
                        <p className="font-thin text-sm text-ahTextGrey">{appointment.advisorSpecialization}</p>
                        {appointment.status=="CANCELLED" && <Badge className="px-3 py-1 opacity-60 font-semibold">Cancelled</Badge>}
                    </div>
                    <Link href={`/appointments/${appointment.id}`} className="">
                    <WhiteButton text="View Details" additionalStyle="border border-stone-200"/>
                    </Link>
                </div>

            </div>
        ))}

    </div>
  )
}

export default MeetingHistory
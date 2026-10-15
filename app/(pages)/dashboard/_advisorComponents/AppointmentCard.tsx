import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {format} from "date-fns"
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utilityFunctions";
import { DummyAdvisorAppointments } from "@/dummyData/dummyTypes";

//import { Skeleton } from '@/components/ui/skeleton';

interface Props{
    appointment:DummyAdvisorAppointments
}
const AppointmentCard = ({appointment}:Props) => {
  return (
    <div className={cn("bg-white rounded-lg px-4 py-4 border flex justify-between items-center")}>
      <div className="flex items-center gap-x-5">
        <p className="font-semibold">{format(appointment.appointmentDateTime, "h:mm a")}</p>
        <div className="flex items-center gap-x-5">
            <Avatar className="w-12 h-12 ">
                <AvatarImage src={undefined}/>
                <AvatarFallback className="bg-ahGreen font-bold text-white">
                    {getInitials(appointment.studentName)}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{appointment.studentName}</p>
                <p className="font-thin text-sm text-ahTextGrey">{appointment.meetingReason}</p>
            </div>

        </div>
      </div>
      <div className="">
        <Link href={`/appointments/${1}`}>
        <Button className="bg-ahBgBlue hover:bg-ahCardBlue rounded-xl px-6 text-ahTextBlack font-semibold">Open</Button></Link>
        
      </div>
    </div>
  )
}

export default AppointmentCard
import {format} from "date-fns"
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DummyAdvisorAppointments } from "@/dummyData/dummyTypes";
import CardAvatar from "@/customUI/CardAvatar";

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
          <CardAvatar fullName={appointment.studentName} additionalFallbackStyle="font-bold text-base" />
            
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
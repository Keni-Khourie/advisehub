import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {format} from "date-fns"
import {Badge} from "@/components/ui/badge"
import {AppointmentStatus} from "@/types/types"

interface Props{
  nextAppointmentDate:string|undefined
  nextAppointmentStatus:AppointmentStatus|undefined

}

const NextAppointmentCard = ({nextAppointmentDate, nextAppointmentStatus}:Props) => {
  return (
    <Card className={cn("w-full md:w-1/2 rounded-lg bg-white px-3 pt-3 pb-8")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-base">Next Appointment</CardTitle>
      </CardHeader>
      <CardContent className="">
       {nextAppointmentDate && (<div className="flex flex-col gap-y-3">
        <p className="font-bold text-xl">{format(nextAppointmentDate, "MMM dd • h:mm a")}</p>
        {nextAppointmentStatus && <div>
          <Badge className={cn("px-4 py-2 font-semibold", nextAppointmentStatus=="SCHEDULED"?"bg-blue-200 text-blue-500":nextAppointmentStatus=="CANCELLED"?"bg-red-200 text-red-500":nextAppointmentStatus=="COMPLETED"?"bg-green-100, text-green-500":"")}>{nextAppointmentStatus}</Badge>
        </div>}
       </div>) }
       {!nextAppointmentDate && <p className="font-thin text-sm text-ahTextGrey">No upcoming Appointments</p>}
       
        {/* <p className="font-thin text-sm text-ahTextGrey">{`Graduation Review`}</p> */}
      </CardContent>
      
    </Card>
  )
}

export default NextAppointmentCard
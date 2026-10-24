import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {format} from "date-fns"

interface Props{
  nextAppointmentDate:string|undefined

}

const NextAppointmentCard = ({nextAppointmentDate}:Props) => {
  return (
    <Card className={cn("w-full md:w-1/2 rounded-lg bg-white px-3 pt-3 pb-8")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-base">Next Appointment</CardTitle>
      </CardHeader>
      <CardContent className="">
       {nextAppointmentDate && <p className="font-bold text-xl">{format(nextAppointmentDate, "MMM dd • h:mm a")}</p>}
       {!nextAppointmentDate && <p className="font-thin text-sm text-ahTextGrey">No upcoming Appointments</p>}
        {/* <p className="font-thin text-sm text-ahTextGrey">{`Graduation Review`}</p> */}
      </CardContent>
      
    </Card>
  )
}

export default NextAppointmentCard
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {ClosestAppointmentData} from "@/redux/features/main/dashboardApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
import {format} from "date-fns"
interface Props{
  data:ClosestAppointmentData|null|undefined
  isLoading:boolean;
  isError:boolean
}

const NextAppointmentCard = ({data, isLoading, isError}:Props) => {
  return (
    <Card className={cn("w-full md:w-1/2 bg-ahBgBlue border rounded-sm p-4")}>
      <p className="font-semibold text-base">Next Appointment</p>
      <CardContent className="flex space-between items-start p-0">
        {isLoading && <Skeleton className="w-[90%] h-7"/>}
        {isError && !data && <FetchErrorMessage/>}
        {data &&(<div className="flex flex-col gap-y-5  justify-center">
          <div>
             <p className="flex items-center text-xl font-bold text-ahTextBlack">{format(data.date, "iii, MMM dd • h:mm a")}</p>
          </div>
         
            <p className="font-thin text-ahTextGrey text-sm">{`${data.advisorTitle} ${data.advisorFullName} • ${data.advisorSpecialization}`}</p>
          <Badge className={cn("font-semibold py-2 opacity-60", data.appointmentStatus==="SCHEDULED"?"bg-green-100 px-3 text-green-600 ":data.appointmentStatus==="CANCELLED"?"bg-red-100 text-red-500":"bg-stone-200 text-stone-500")}>{data.appointmentStatus.toLocaleLowerCase()}</Badge>
        </div>)}
        {data==null && <p>No upcoming meetings</p>}
        <div className="w-[40%]">
          <Image src="/nextAppointmentCardImage.png" alt="next appointment card image" width={500} height={500} className=""/>
        </div>
      </CardContent>
    </Card>
  )
}

export default NextAppointmentCard
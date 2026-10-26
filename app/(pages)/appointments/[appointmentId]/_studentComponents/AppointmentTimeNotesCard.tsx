"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Badge} from "@/components/ui/badge"
import { AppointmentStatus} from "@/types/types";
import {format, startOfDay, isSameDay} from "date-fns"
import {Skeleton} from "@/components/ui/skeleton"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
interface Props{
  isLoading:boolean;
  isError:boolean
  cardData:{
    date:string;
    office:string;
    note:string|undefined;
    status:AppointmentStatus
  }|undefined
}

const AppointmentTimeNotesCard = ({isLoading, isError, cardData}:Props) => {
    const today = startOfDay(new Date())
  return (
    <Card className={cn("bg-ahCardBlue rounded-lg w-full md:w-1/3 border border-ahBorderBlue pb-10")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">Appointment</CardTitle>
        <CardDescription className="">
          {isLoading && <Skeleton className=" h-10 w-full"/>}
            {cardData && <p className="flex items-center">{`${isSameDay(today, cardData.date)?"Today":format(cardData.date, "dd MMM yyyy" )}•${format(cardData.date, "h:mm")}`}</p>}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {isError && !cardData && <FetchErrorMessage/>}
        {isLoading && <div className="flex flex-col justify-center gap-y-5">
          <Skeleton className="h-10 w-full"/></div>}
       {cardData && <div className="flex flex-col justify-center gap-y-5">
          <p className="text-ahTextGrey">{cardData.office}</p>
          <p className="font-semibold mt-4">Student Note</p>
          <p className="text-ahTextGrey text-sm">{cardData.note?cardData.note:"No note from student"}</p>
          <Badge className={cn("py-2 px-5 font-semibold",cardData.status==="SCHEDULED"?"bg-green-200 text-green-500":cardData.status==="CANCELLED"?"bg-red-100 text-red-500":"bg-stone-100 text-stone-500" )}>{cardData.status} </Badge>
        </div>}
      </CardContent>
    </Card>
  )
}

export default AppointmentTimeNotesCard
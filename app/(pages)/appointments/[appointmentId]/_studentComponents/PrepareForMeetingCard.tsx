"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GreenCheckOption from "@/customUI/GreenCheckOption";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button"
import {Skeleton} from "@/components/ui/skeleton"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
import {generateArray} from "@/lib/utilityFunctions"
import { useMediaQuery } from "react-responsive"
import {AppointmentStatus} from "@/types/types"
import { Dispatch, SetStateAction } from "react"
interface Props{
  isLoading:boolean;
  isError:boolean;
  setDialogOpen:Dispatch<SetStateAction<boolean>>;
  cardData:{
    appointmentId:number;
    advisorId:string;
    appointmentStatus:AppointmentStatus
  }|undefined
}

const PrepareForMeetingCard = ({isLoading, isError, cardData, setDialogOpen}:Props) => {
    const isPortrait = useMediaQuery({
    query: "(orientation: portrait)",
  });
  return (
   <Card className={cn("bg-white rounded-lg")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">Prepare for the Meeting</CardTitle>
        <CardDescription className="">Review student details before meeting</CardDescription>
      </CardHeader>
      <CardContent className=" flex items-start w-full justify-between md:flex-nowrap flex-wrap gap-y-3">
        <div className="flex flex-col gap-y-3 w-full md:w-1/3">
            <GreenCheckOption text="View your profile"/>
            <GreenCheckOption text="Review previous advising notes"/>
        </div>
        {isError && !cardData && (<div className="md:w-1/3 w-full flex md:flex-col justify-center items-center">
        <FetchErrorMessage/></div>)}
        {isLoading && (
          <div className="w-full md:w-1/3 flex md:flex-col md:gap-y-6 items-center flex-wrap md:flex-nowrap  md:items-end">
            {generateArray(2).map((item)=><Skeleton key={item} className="w-2/3 h-10"/>)}
          </div>
        )}
       {cardData && <div className={cn("w-full md:w-1/3 flex md:flex-col gap-y-3 md:gap-y-6 md:items-end items-center gap-x-4 md:flex-nowrap flex-wrap", isPortrait &&"sm:gap-y-3 sm:gap-x-0 ")}>
       
            <Link href={`/advising-notes`} className={cn("md:w-2/3 w-full", isPortrait &&"sm:w-1/3 md:w-full")}>
              <Button className="w-full h-10 cursor-pointer rounded-lg text-center font-semibold text-white bg-ahDeepBlue hover:bg-ahHoverDeepBlue">View Notes</Button>
            </Link>
            <div className={cn("md:w-2/3 w-full", isPortrait &&"sm:w-1/3 md:w-full", cardData.appointmentStatus=="CANCELLED"&&"hidden", cardData.appointmentStatus=="COMPLETED" &&"hidden")}>
              <Button className="hidden w-full h-10 cursor-pointer rounded-lg text-center font-semibold text-white bg-red-400 hover:bg-red-500" onClick={()=>setDialogOpen(true)}>Cancel Appointment</Button>
            </div>
        </div>}
      </CardContent>
    </Card>
  )
}

export default PrepareForMeetingCard
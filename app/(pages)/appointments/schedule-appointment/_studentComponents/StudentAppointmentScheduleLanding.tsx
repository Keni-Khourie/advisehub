"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import SectionHeader from '@/customUI/SectionHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import GreenButton from '@/customUI/GreenButton';
import { getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import GreenCheckOption from '@/customUI/GreenCheckOption';
const StudentAppointmentScheduleLanding = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    const landingCardOptions:string[] = ["Choose advising reason", "Select an available time", "Choose an advisor", "Review and confirm"]

    const startAppointmentScheduling = ()=>{
     contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AdvisorSelection"))
    }
  return (
    <div className="w-full">
      <SectionHeader headerText="Let's set up your advising session" subtitle="You'll choose what you need help with, select an available time, then review before booking." additionalClass=""/>
      <Card className={cn("pb-20 bg-ahGrey border rounded-sm")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-lg">Before You Start</CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-y-6 ps-5">
        {landingCardOptions.map((option, index)=><GreenCheckOption key={index} text={option}/>)}
      </CardContent>
    </Card>
    <div className="mt-5 flex justify-end">
      <GreenButton text="Start" additionalStyle="w-2/12 rounded-sm" onClick={startAppointmentScheduling}/>
    </div>
    </div>
  )
}

export default StudentAppointmentScheduleLanding
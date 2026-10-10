"use client"
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { StudentScheduleAppointmentStep } from "@/types";
import { cn } from "@/lib/utils";
import { getStudentScheduleStepCompletion } from "@/lib/utilityFunctions";

interface Props{
    text:StudentScheduleAppointmentStep,
    step:number
}
const StepNumber = ({text, step}:Props) => {
    const contextData = useContext(StudentScheduleAppointmentContext);
    const isActive:boolean = contextData.componentDetails.step===text
    const isCompleted:boolean =getStudentScheduleStepCompletion(step, contextData.componentDetails.step)
  return (
    <>
    {text!=="none" && (
        <div className="flex flex-col gap-y-1 justify-center">
        <div className="flex items-center">
            <p className={cn("border h-7 w-7 flex justify-center items-center text-center rounded-full text-ahTextGrey border-ahTextGrey", isActive &&"text-ahGreen border-ahGreen")}>{step}</p>
            {text!=="Review"&& <div className={cn("h-1 w-20 bg-ahGrey rounded-sm", isCompleted && "bg-ahGreen")}></div>}
        </div>
        <p className={cn("font-thin text-ahTextGrey", isActive && "font-semibold text-ahTextBlack")}>{text}</p>
    </div>
    )}
    </>
  )
}

export default StepNumber
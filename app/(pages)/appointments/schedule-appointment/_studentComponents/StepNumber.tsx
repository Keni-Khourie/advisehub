"use client"
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { StudentScheduleAppointmentStep } from "@/types";
import { cn } from "@/lib/utils";
import { getStudentScheduleStepCompletion } from "@/lib/utilityFunctions";
//import GreenCheck from "@/customUI/GreenCheck";
import BlueCheck from "@/customUI/BlueCheck";

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
    {(text!=="none" && text!=="Success") && (
        <div className="flex flex-col gap-y-1 justify-center w-full">
        <div className="flex items-center gap-x-0.5 w-full">
            {!isCompleted && <p className={cn("border bg-white h-7 w-7 flex justify-center text-center rounded-full text-ahTextGrey border-ahTextGrey font-semibold", isActive &&"text-white bg-ahDeepBlue border-ahDeepBlue")}>{step}</p>}
            {isCompleted &&<BlueCheck/>}
            {text!=="Review"&& <div className={cn("h-0.5 w-[90%]  md:w-full bg-stone-400 rounded-sm", isCompleted && "bg-ahGreen")}></div>}
        </div>
        <p className={cn("font-thin text-ahTextGrey text-xs md:text-base", isActive && "font-semibold text-ahTextBlack")}>{text}</p>
        
    </div>
    )}
    </>
  )
}

export default StepNumber
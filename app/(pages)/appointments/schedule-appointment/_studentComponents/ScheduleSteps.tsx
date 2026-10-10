"use client"
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { cn } from "@/lib/utils";
import StepNumber from './StepNumber';
import { studentScheduleAppointmentSteps } from "@/constants";

const ScheduleSteps = () => {
    const contextData = useContext(StudentScheduleAppointmentContext);
  return (
    <>{
        contextData.componentDetails.step !=="none" && (
            <div className="flex gap-x-2">
        {studentScheduleAppointmentSteps.map((step, index)=><StepNumber key={index} text={step} step={index+1}/>)}
    </div>
        )
    }
    </>
  )
}

export default ScheduleSteps
"use client";
import { useContext, useState } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props {
  time: string;
}
const AvailableTimeItem = ({ time }: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
  const contextData = useContext(StudentScheduleAppointmentContext);

  const onClick = ()=>{
    contextData.setAppointmentDetails({...contextData.appointmentDetails, availableTime:time})
    setIsSelected(!isSelected)
  }

  return (
    <div className={cn("w-full text-center font-semibold py-3 border bg-white rounded-lg cursor-pointer hover:bg-ahGreen hover:text-white", contextData.appointmentDetails.availableTime===time && "bg-ahGreen text-white")} onClick={onClick}>
      {time}
    </div>
  );
};

export default AvailableTimeItem;
//contextData.appointmentDetails.availableTime===time
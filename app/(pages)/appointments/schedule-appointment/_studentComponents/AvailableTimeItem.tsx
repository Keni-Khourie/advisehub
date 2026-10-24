"use client";
import { useContext, useState } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AdvisorAvailabilityStudentListData } from "@/redux/features/main/availabilityApiSlice";
interface Props {
  data: AdvisorAvailabilityStudentListData
}
const AvailableTimeItem = ({ data }: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
  const contextData = useContext(StudentScheduleAppointmentContext);
  const formattedTime = format(data.dateTime, "h:mm a")
  const setData = ()=>{
    contextData.setAppointmentDetails({...contextData.appointmentDetails, availableTime:formattedTime, availabilityId:data.id, availability:data})
    setIsSelected(!isSelected)
  }

  return (
    <div className={cn("w-full text-center font-semibold py-3 border bg-white rounded-lg cursor-pointer hover:bg-ahGreen hover:text-white", contextData.appointmentDetails.availabilityId ===data.id && "bg-ahGreen text-white")} onClick={setData}>
    {formattedTime}
    </div>
  );
};

export default AvailableTimeItem;
//contextData.appointmentDetails.availableTime===time
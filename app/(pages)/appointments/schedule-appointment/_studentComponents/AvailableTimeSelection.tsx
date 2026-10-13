"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import {format} from "date-fns"
import { cn } from "@/lib/utils";
import AvailableTimeItem from './AvailableTimeItem';
//import { Skeleton } from '@/components/ui/skeleton';

const AvailableTimeSelection = () => {
    //fetch available times based advisorId  and available date in the context. The data will come sorted by earliest
    //use skeletons for the loading state
    const contextData = useContext(StudentScheduleAppointmentContext)
     
    const availableTimes = ["9:00 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "1:00 PM", "1:30 PM", "2:30 AM"]
  return (
    <div className="bg-white w-full md:w-1/3 border rounded-lg p-3 h-full ">
        <div className="w-full mb-4">
            {contextData.appointmentDetails.date && <p className="font-semibold text-lg">{format(contextData.appointmentDetails.date, "iii, MMM d")}</p>}
            <p className="text-ahTextGrey text-sm">Available times</p>
           
        </div>
         <div className="w-full h-[14vh] md:h-[80%] flex flex-col gap-y-3 overflow-y-scroll ">
                {availableTimes.map((time, index)=>(
                    <AvailableTimeItem key={index} time={time}/>
                ))}
            </div>
    </div>
  )
}

export default AvailableTimeSelection
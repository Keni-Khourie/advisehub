"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import {format} from "date-fns"
import AvailableTimeItem from './AvailableTimeItem';
import { Skeleton } from '@/components/ui/skeleton';
import { generateArray } from "@/lib/utilityFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";
import { useGetAvailabilitiesByDateForStudentQuery} from "@/redux/features/main/availabilityApiSlice";

const AvailableTimeSelection = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const contextData = useContext(StudentScheduleAppointmentContext)

    const {data:availableTimes, isLoading, isError} =useGetAvailabilitiesByDateForStudentQuery({
        date:format(contextData.appointmentDetails.date!,"yyyy-MM-dd"),
        timeZone:timeZone,
        advisorId: contextData.appointmentDetails.advisorId
    })

    
  return (
    <div className="bg-white w-full md:w-1/3 border rounded-lg p-3 h-full ">
        <div className="w-full mb-4">
            {contextData.appointmentDetails.date && <p className="font-semibold text-lg">{format(contextData.appointmentDetails.date, "iii, MMM d")}</p>}
            <p className="text-ahTextGrey text-sm">Available times</p>
           
        </div>
         <div className="w-full h-[14vh] md:h-[80%] flex flex-col gap-y-3 overflow-y-scroll ">
            {isLoading &&
        generateArray(6).map((item) => (
          <Skeleton key={item} className="h-12 w-full" />
        ))}
        {isError && !availableTimes && <FetchErrorMessage />}
                {availableTimes && availableTimes.map((time, index)=>(
                    <AvailableTimeItem key={index} data={time}/>
                ))}
                {availableTimes && availableTimes.length==0 && <p className="font-thin text-xs text-ahTextGrey w-full text-center mt-5">No available slots for selected date</p>}
            </div>
            
    </div>
  )
}

export default AvailableTimeSelection
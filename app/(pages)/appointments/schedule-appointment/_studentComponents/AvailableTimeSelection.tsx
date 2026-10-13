"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';

import { cn } from "@/lib/utils";
//import { Skeleton } from '@/components/ui/skeleton';

const AvailableTimeSelection = () => {
    //fetch available times based advisorId  and available date in the context
    //use skeletons for the loading state
    const contextData = useContext(StudentScheduleAppointmentContext)
  return (
    <div className="bg-white w-full md:w-1/3 border rounded-lg">AvailableTimeSelection </div>
  )
}

export default AvailableTimeSelection
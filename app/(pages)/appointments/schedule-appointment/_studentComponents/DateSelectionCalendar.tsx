"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";


const DateSelectionCalendar = () => {
   const contextData = useContext(StudentScheduleAppointmentContext)
   const updateAppointmentDate = (e:Date|undefined)=>{
    console.log("APPOINTMENT DATE:");
    console.log(e);
    contextData.setAppointmentDetails({...contextData.appointmentDetails, date:e})
   }
  return (
    <div className="bg-white w-full md:w-2/3 border rounded-lg h-full flex justify-center py-3">
      <Calendar
      mode="single"
      selected={contextData.appointmentDetails.date}
      onSelect={updateAppointmentDate}
      className="rounded-lg"
      captionLayout="label"
      showOutsideDays={false}
    />
   
    </div>
  )
}

export default DateSelectionCalendar
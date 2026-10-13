"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import WhiteButton from '@/customUI/WhiteButton';
import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import DateSelectionCalendar from './DateSelectionCalendar';
import AvailableTimeSelection from './AvailableTimeSelection';

const DateSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
     const backToAdvisorSelection = ()=>{
      contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AdvisorSelection"))
    }
    const continueToAppointmentReview = ()=>{
      contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AppointmentReview"))
    }
  return (
    <div>
      <div className="flex gap-x-5 flex-wrap md:flex-nowrap md:h-[53vh] ">
        <DateSelectionCalendar/> 
         <AvailableTimeSelection/> 
      </div>
      <div className="flex justify-between items-center mt-8">
        <WhiteButton text="Back" onClick={backToAdvisorSelection} additionalStyle="shadow-md"/>
        <BlueButton text="Review Appointment" onClick={continueToAppointmentReview} additionalStyle="w-full md:w-1/4"/>
      </div>
      
    </div>
  )
}

export default DateSelection
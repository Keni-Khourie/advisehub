"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import WhiteButton from '@/customUI/WhiteButton';
import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import { combineDateAndTime } from '@/lib/utilityDateFunctions';
import DateSelectionCalendar from './DateSelectionCalendar';
import AvailableTimeSelection from './AvailableTimeSelection';

const DateSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
     const backToAdvisorSelection = ()=>{
      contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AdvisorSelection"))
    }
    const continueToAppointmentReview = ()=>{
      if(!contextData.appointmentDetails.date || !contextData.appointmentDetails.availableTime){
        return
      }
      contextData.setAppointmentDetails({...contextData.appointmentDetails, meetingDateTime:combineDateAndTime(contextData.appointmentDetails.date, contextData.appointmentDetails.availableTime)})
      contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AppointmentReview"))
    }
  return (
    <div>
      <div className="flex gap-x-5 flex-wrap md:flex-nowrap md:h-[53vh] ">
        <DateSelectionCalendar/> 
         <AvailableTimeSelection/> 
      </div>
      <div className="flex justify-between items-center mt-8 md:flex-nowrap flex-wrap gap-y-4 ">
        <WhiteButton text="Back" onClick={backToAdvisorSelection} additionalStyle="shadow-md"/>
        <BlueButton text="Review Appointment" onClick={continueToAppointmentReview} additionalStyle="w-full md:w-1/4 disabled:not-allowed" disabled={contextData.appointmentDetails.date===undefined||contextData.appointmentDetails.availableTime==undefined}/>
      </div>
      
    </div>
  )
}

export default DateSelection
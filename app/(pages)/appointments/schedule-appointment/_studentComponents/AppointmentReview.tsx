"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import GreenButton from '@/customUI/GreenButton';
import WhiteButton from '@/customUI/WhiteButton';
import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';

const AppointmentReview = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
   const backToDateTimeSelection = ()=>{
    contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("DateSelection"))
   }

   //this will be moved to the onSuccess of RTK query
   const continueToAppointmentSuccess = ()=>{
    contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AppointmentConfirmationSuccess"))
   }
  return (
    <div>
      <div>Content</div>
      <div className="flex justify-between items-center">
        <WhiteButton text="Back" onClick={backToDateTimeSelection}/>
        <GreenButton text="Confirm Appointment" onClick={continueToAppointmentSuccess} additionalStyle="w-full md:w-1/4"/>
      </div>
    </div>
  )
}

export default AppointmentReview
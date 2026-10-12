"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import GreenButton from '@/customUI/GreenButton';
import WhiteButton from '@/customUI/WhiteButton';
//import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import Image from 'next/image';

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
      <div className="flex justify-between items-end flex-wrap gap-y-5">
        <WhiteButton text="Back" onClick={backToDateTimeSelection}/>
        <div className="w-full md:w-1/4 flex flex-col gap-y-0.5">
          <Image src="/appointment-review.png" width={500} height={500} alt="appointment review image" className="w-full hidden md:inline scale-75 mb-[-40]"/> 
          <GreenButton text="Confirm Appointment" onClick={continueToAppointmentSuccess} additionalStyle="w-full"/>
        </div>
      </div>
    </div>
  )
}

export default AppointmentReview
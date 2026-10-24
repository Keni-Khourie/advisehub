"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import GreenButton from '@/customUI/GreenButton';
import WhiteButton from '@/customUI/WhiteButton';
//import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import Image from 'next/image';
import BeforeYouConfirmCard from './BeforeYouConfirmCard';
import AppointmentReviewCard from './AppointmentReviewCard';
import { combineDateAndTime } from '@/lib/utilityDateFunctions';
import {format} from "date-fns"


const AppointmentReview = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
   
    const combinedDateTime = combineDateAndTime(contextData.appointmentDetails.date!, contextData.appointmentDetails.availableTime!)
   const backToDateTimeSelection = ()=>{
    contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("DateSelection"))
   }

   //this will be moved to the onSuccess of RTK query
   const continueToAppointmentSuccess = ()=>{
    const combinedDateTime = combineDateAndTime(contextData.appointmentDetails.date!, contextData.appointmentDetails.availableTime!)
     console.log("can you see this");
    console.log(contextData.appointmentDetails);
    console.log(combinedDateTime);
    // contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AppointmentConfirmationSuccess"))
   }
  return (
    <div>
      <p>{format(combinedDateTime, "iii dd MM yyyy, h:mm a")}</p>
      <p>{format(contextData.appointmentDetails.availability!.dateTime ,"iii dd MM yyyy, h:mm a")}</p>
      <p>{contextData.appointmentDetails.availability!.id}</p>
      <div className="flex items-start flex-wrap md:flex-nowrap gap-x-5 gap-y-5 mb-4 md:mb-0">
        <AppointmentReviewCard/>
        <BeforeYouConfirmCard/>
      </div>
      <div className="flex justify-between items-end flex-wrap md:flex-nowrap gap-y-5">
        <WhiteButton text="Back" onClick={backToDateTimeSelection} additionalStyle="shadow-md"/>
        <div className="w-full md:w-1/4 flex flex-col gap-y-0.5">
          <Image src="/appointment-review.png" width={500} height={500} alt="appointment review image" className="w-full hidden md:inline scale-75 mb-[-40]"/> 
          <GreenButton text="Confirm Appointment" onClick={continueToAppointmentSuccess} additionalStyle="w-full"/>
        </div>
      </div>
    </div>
  )
}

export default AppointmentReview


/*
advisorId:string//advisor 8-digitId
availabilityId: number //the ID for the availability slot created by the advisor and selected by the student,
note?string; //will either send an empty string or undefined if not chosen


 */
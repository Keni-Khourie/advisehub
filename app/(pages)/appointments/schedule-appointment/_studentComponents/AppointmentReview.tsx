"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import GreenButton from '@/customUI/GreenButton';
import WhiteButton from '@/customUI/WhiteButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import Image from 'next/image';
import BeforeYouConfirmCard from './BeforeYouConfirmCard';
import AppointmentReviewCard from './AppointmentReviewCard';
import {useCreateAppointmentMutation} from "@/redux/features/main/appointmentApiSlice"
import { toast } from "sonner";
import { queryErrorResponse } from "@/lib/utilityComponents";
import LoadingSheet from "@/customUI/LoadingSheet"
import {  customToast } from "@/lib/utilityComponents";
const AppointmentReview = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    const [createAppointment, {isLoading}] =useCreateAppointmentMutation()
   
   const backToDateTimeSelection = ()=>{
    contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("DateSelection"))
   }

   //this will be moved to the onSuccess of RTK query
   const continueToAppointmentSuccess = ()=>{
    if(!contextData.appointmentDetails||!contextData.appointmentDetails.advisorId || !contextData.appointmentDetails.availabilityId)return
    toast.promise(
      createAppointment({
        advisorId:contextData.appointmentDetails.advisorId,
        availabilityId:contextData.appointmentDetails.availabilityId,
        note:contextData.appointmentDetails.appointmentReason==="General Advising"? contextData.appointmentDetails.generalAdvisingQuestion:undefined
      }).unwrap().then((resp)=>{
        if(resp.id)
        contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AppointmentConfirmationSuccess"))
      }).catch((resp)=>{
          customToast(resp.data.message, "error")
        }), {
        loading:"Creating new appointment",
        success:"Appointment scheduled",
        error:queryErrorResponse
      }
    )
   
   }
  return (
    <div>
      <div className="flex items-start flex-wrap md:flex-nowrap gap-x-5 gap-y-5 mb-4 md:mb-0">
        <AppointmentReviewCard/>
        <BeforeYouConfirmCard/>
      </div>
      <div className="flex justify-between items-end flex-wrap md:flex-nowrap gap-y-5">
        <WhiteButton text="Back" onClick={backToDateTimeSelection} additionalStyle="shadow-md" disabled={isLoading}/>
        <div className="w-full md:w-1/4 flex flex-col gap-y-0.5">
          <Image src="/appointment-review.png" width={500} height={500} alt="appointment review image" className="w-full hidden md:inline scale-75 mb-[-40]"/> 
          <GreenButton text="Confirm Appointment" onClick={continueToAppointmentSuccess} additionalStyle="w-full" disabled={isLoading}/>
        </div>
      </div>
      {isLoading && <LoadingSheet/>}
    </div>
  )
}

export default AppointmentReview


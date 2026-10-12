"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import WhiteButton from '@/customUI/WhiteButton';
import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';

const AdvisorSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
   
    const backToReasonSelection = ()=>{
      contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("ReasonSelection"))
    }
    const continueToDateTime = ()=>{
      contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("DateSelection"))
    }
  return (
    <div>
      <div>Content</div>
      <div className="flex justify-between items-center">
        <WhiteButton text="Back" onClick={backToReasonSelection}/>
        <BlueButton text="Choose Date & Time" onClick={continueToDateTime} additionalStyle="w-full md:w-1/4"/>
      </div>
    </div>
  )
}

export default AdvisorSelection
"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import WhiteButton from '@/customUI/WhiteButton';
import BlueButton from '@/customUI/BlueButton';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import AdvisorSelectionGroup from './AdvisorSelectionGroup';

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
      <div className="overflow-y-scroll h-[80vw] md:h-[30vw]  mb-10">
        <AdvisorSelectionGroup/>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-y-5 md:flex-nowrap">
        <WhiteButton text="Back" onClick={backToReasonSelection} additionalStyle="shadow-md"/>
        <BlueButton text="Choose Date & Time" onClick={continueToDateTime} additionalStyle="w-full md:w-1/4 shadow-md"/>
      </div>
    </div>
  )
}

export default AdvisorSelection
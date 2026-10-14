"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
//import GreenButton from '@/customUI/GreenButton';

import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import BlueButton from '@/customUI/BlueButton';
import ReasonSelectionGroup from './ReasonSelectionGroup';
import GeneralAdvisingQuestion from './GeneralAdvisingQuestion';

const ReasonSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
    const continueToAdvisor = ()=>{
        contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AdvisorSelection"))
    }
  return (
    <div className="h-full w-full">
        <div className="w-full h-max flex gap-x-3 gap-y-6 flex-wrap md:flex-nowrap">
            <ReasonSelectionGroup/>
            {
                contextData.appointmentDetails.appointmentReason==="General Advising" && (
                    <GeneralAdvisingQuestion/>
                )
            }
        </div>
        <div className="flex justify-center md:justify-end mt-20">
            <BlueButton text="Continue to Advisor" onClick={continueToAdvisor} additionalStyle="w-full md:w-1/4 disabled:cursor-not-allowed" disabled={contextData.appointmentDetails.appointmentReason===undefined}/>
        </div>
       
    </div>
  )
}

export default ReasonSelection
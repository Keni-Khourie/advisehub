"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
//import GreenButton from '@/customUI/GreenButton';

import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import BlueButton from '@/customUI/BlueButton';

const ReasonSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
    const continueToAdvisor = ()=>{
        contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AdvisorSelection"))
    }
  return (
    <div>
        <div className="flex justify-center md:justify-end">
            
            <BlueButton text="Continue to Advisor" onClick={continueToAdvisor} additionalStyle="w-full md:w-1/4"/>
        </div>
       
    </div>
  )
}

export default ReasonSelection
"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import GreenButton from '@/customUI/GreenButton';
import { Button } from '@/components/ui/button';
import {getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';

const ReasonSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
    const continueToAdvisor = ()=>{
        contextData.setComponentDetails(getStudentAppointmentScheduleComponentDetailsByView("AdvisorSelection"))
    }
  return (
    <div>
        <div>
            <Button>Back</Button>
            <GreenButton text="Continue to Advisor" onClick={continueToAdvisor}/>
        </div>
    </div>
  )
}

export default ReasonSelection
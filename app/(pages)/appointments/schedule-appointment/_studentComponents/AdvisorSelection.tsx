"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
const AdvisorSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
  return (
    <div>AdvisorSelection</div>
  )
}

export default AdvisorSelection
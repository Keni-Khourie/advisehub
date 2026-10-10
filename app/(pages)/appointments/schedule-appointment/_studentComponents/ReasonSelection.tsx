"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';

const ReasonSelection = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
  return (
    <div>ReasonSelection</div>
  )
}

export default ReasonSelection
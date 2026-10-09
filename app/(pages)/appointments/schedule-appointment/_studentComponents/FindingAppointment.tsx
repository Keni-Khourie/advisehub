"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
const FindingAppointment = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
  return (
    <div>FindingAppointment</div>
  )
}

export default FindingAppointment
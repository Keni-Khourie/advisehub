"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
const AppointmentConfirmationSuccess = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
  return (
    <div>AppointmentConfirmationSuccess</div>
  )
}

export default AppointmentConfirmationSuccess
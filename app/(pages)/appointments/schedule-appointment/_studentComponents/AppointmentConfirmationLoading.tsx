"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
const AppointmentConfirmationLoading = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
  return (
    <div>AppointmentConfirmationLoading</div>
  )
}

export default AppointmentConfirmationLoading
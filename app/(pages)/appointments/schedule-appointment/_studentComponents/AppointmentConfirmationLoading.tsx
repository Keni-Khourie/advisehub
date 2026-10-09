"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointmentSchedule';
const AppointmentConfirmationLoading = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>AppointmentConfirmationLoading</div>
  )
}

export default AppointmentConfirmationLoading
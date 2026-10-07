"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const AppointmentConfirmationSuccess = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>AppointmentConfirmationSuccess</div>
  )
}

export default AppointmentConfirmationSuccess
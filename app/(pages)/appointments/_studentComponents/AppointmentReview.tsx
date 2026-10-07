"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const AppointmentReview = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>AppointmentReview</div>
  )
}

export default AppointmentReview
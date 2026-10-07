"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const StudentAppointmentLanding = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>StudentAppointmentLanding</div>
  )
}

export default StudentAppointmentLanding
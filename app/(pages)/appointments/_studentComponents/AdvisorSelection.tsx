"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const AdvisorSelection = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>AdvisorSelection</div>
  )
}

export default AdvisorSelection
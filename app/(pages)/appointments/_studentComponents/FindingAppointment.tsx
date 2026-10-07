"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const FindingAppointment = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>FindingAppointment</div>
  )
}

export default FindingAppointment
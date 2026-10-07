"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const CreatingAppointment = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>CreatingAppointment</div>
  )
}

export default CreatingAppointment
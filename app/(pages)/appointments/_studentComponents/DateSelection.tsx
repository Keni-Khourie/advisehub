"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
const DateSelection = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>DateSelection</div>
  )
}

export default DateSelection
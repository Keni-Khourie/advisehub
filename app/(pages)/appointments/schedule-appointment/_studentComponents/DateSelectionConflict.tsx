"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointmentSchedule';
const DateSelectionConflict = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>DateSelectionConflict</div>
  )
}

export default DateSelectionConflict
"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';

const UpcomingAppointments = () => {
    const contextData = useContext(StudentAppointmentContext)
  return (
    <div>UpcomingAppointments</div>
  )
}

export default UpcomingAppointments
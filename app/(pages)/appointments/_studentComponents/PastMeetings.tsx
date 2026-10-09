"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';

const PastMeetings = () => {
    const contextData = useContext(StudentAppointmentContext)
  return (
    <div>PastMeetings</div>
  )
}

export default PastMeetings
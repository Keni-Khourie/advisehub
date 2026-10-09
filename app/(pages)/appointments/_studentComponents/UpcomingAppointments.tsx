"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
//import AppointmentListItem from './AppointmentListItem';


const UpcomingAppointments = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
   <>
   {/* <AppointmentListItem/> */}
   </>
  )
}

export default UpcomingAppointments
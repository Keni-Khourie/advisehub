"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import {AppointmentComponentDetail  } from "@/types/types";
import StudentAppointmentsContent from "./StudentAppointmentsContent";


interface StudentAppointmentContextData{
  componentDetails:AppointmentComponentDetail;
  setComponentDetails:Dispatch<SetStateAction<AppointmentComponentDetail>>;
}

export const StudentAppointmentContext = createContext<StudentAppointmentContextData>({
  componentDetails:{
    view:"UpcomingAppointments",
    section:"Upcoming",
    header:"My Appointments",
    subtitle:"View upcoming sessions and previous meetings",
        
  },
  setComponentDetails:()=>{},
})

const StudentAppointments = () => {
  const [componentDetails, setComponentDetails] = useState<AppointmentComponentDetail>({
      view:"UpcomingAppointments",
        section:"Upcoming",
       header:"My Appointments",
       subtitle:"View upcoming sessions and previous meetings",

    })
  return (
   <StudentAppointmentContext.Provider value={{componentDetails, setComponentDetails}}>
    <StudentAppointmentsContent/>
   </StudentAppointmentContext.Provider>
  )
}

export default StudentAppointments